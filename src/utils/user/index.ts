import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { validateData, isUserExistsRules, loginRules, userSignUpRules } from '../validationRules';
import { sequelize } from '../../database/database.config';
import { User } from '../../models/index';
import { createRefreshToken, createToken } from '../token';
import axios from 'axios';
import { CreateUserType, LoginUserType } from 'src/schema/user';

/**
 * Проверка пароля на соответствие с записанным в базе
 */
export const checkPassword = async (password: string, user: User) => {
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw { errorMessage: `Пароли не совпадают` };
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
export const signUpUser = async ({ phone, password, name, lastName }: CreateUserType['request']) => {
  validateData({ phone, password, name, lastName }, userSignUpRules);
  password = await bcrypt.hash(password, 8);
  const createdUser = await User.create({ phone, password, name, lastName });

  return createdUser;
}

/**
 * Авторизация
 */
export const loginUser = async ({ phone, password }: LoginUserType['request']) => {
  validateData({ phone, password }, loginRules);
  const user = await User.findOne({ where: { phone } });
  if (!user) throw { errorMessage: `Пользователь не найден` };

  await checkPassword(password, user);
  return user;
}