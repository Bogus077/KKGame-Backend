import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { validateData, makeCallRules, checkPhoneRules, isUserExistsRules, loginRules } from '../validationRules';
import { sequelize } from '../../database/database.config';
import { SmsCode, User } from '../../models/index';
import { createRefreshToken, createToken } from '../token';
import axios from 'axios';
import { SMSRU_APIID } from '../../config/config';
import { MakeCallType } from 'src/schema/phone';
import { CreateUserType, LoginUserType } from 'src/schema/user';

/**
 * Проверка пароля на соответствие с записанным в базе
 */
export const checkPassword = async (password: string, user: User) => {
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw { errorMessage: `Пароли не совпадают` };
}

/**
 * Отправить код на указанный номер
 */
export const makeCall = async ({ phone, userIP = '11.22.33.44' }: MakeCallType['request']) => {
  try {
    validateData({ phone, userIP }, makeCallRules);
    const sendSms = await axios.get(`https://sms.ru/code/call?phone=${phone}&ip=${userIP}&api_id=${SMSRU_APIID}`);
    const code = sendSms.data as MakeCallType['response'];

    // Выбросить ошибку в случае отсутствия ответа
    if (!code) {
      throw { errorMessage: `Не удалось совершить звонок` };
    }

    // Добавить новый код в БД
    const newSms = await SmsCode.create({
      phone,
      code: code.code,
    });

    return {
      status: 'sent',
      phone,
      id: newSms.id
    };
  } catch (error) {
    throw { errorMessage: `Не удалось совершить звонок`, error };
  }
}

/**
 * Подтверждение номера телефона
 * @param phone 
 * @param code 
 */
export const checkPhone = async (phone: string, code: string) => {
  validateData({ phone, code }, checkPhoneRules);
  const result = await SmsCode.findOne({ where: { phone }, order: [['id', 'DESC']] });

  if (!result) throw { errorMessage: `Номер не найден в базе отправленных кодов подтверждения` };
  if (result.code !== code) throw { errorMessage: `Неправильный код подтверждения` };
  if (result.used) throw { errorMessage: `Код подтверждения уже использован` };

  await result.update({ used: true });
}

/**
 * Проверка, зарегистрирован ли пользователь с таким номером телефона
 * @param phone 
 */
export const isUserExists = async (phone: string) => {
  validateData({ phone }, isUserExistsRules);
  const result = await User.findOne({ where: { phone } });

  if (result) throw { errorMessage: `Пользователь с таким номером уже зарегистрирован` };
}

/**
 * Регистрация нового пользователя
 */
export const signUpUser = async ({ phone, password }: CreateUserType['request']) => {
  validateData({ phone, password }, loginRules);
  password = await bcrypt.hash(password, 8);
  const createdUser = await User.create({ phone, password });

  return createdUser;
}

export const loginUser = async ({ phone, password }: LoginUserType['request']) => {
  validateData({ phone, password }, loginRules);
  const user = await User.findOne({ where: { phone } });
  if (!user) throw { errorMessage: `Пользователь не найден` };

  await checkPassword(password, user);
  return user;
}