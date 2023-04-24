import { Request, Response } from 'express'
import { MakeCallType } from '../schema/phone';
import { CreateUserType, LoginUserType } from '../schema/user';
import { createRefreshToken, createToken } from '../utils/token';
import { checkPhone, isUserExists, loginUser, makeCall, signUpUser } from '../utils/user';
import { JwtPayload } from '../middlewares/authJwt';

export async function makeCallRequest(req: Request, res: Response) {
  try {
    const userIP = req.headers['x-real-ip'];
    const requestData = { ...req.body, userIP } as MakeCallType['request'];
    const result = await makeCall(requestData);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function useRefreshRequest(req: Request & { jwt: JwtPayload } & { tokens: { accessToken: string, refreshToken: string } }, res: Response) {
  try {
    const result = req.tokens;

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function loginRequest(req: Request, res: Response) {
  try {
    const requestData = req.body as LoginUserType['request'];
    console.log(requestData);
    const user = await loginUser(requestData);
    const accessToken = createToken(user);
    const refreshToken = await createRefreshToken(user);

    res.status(200).send({
      accessToken,
      refreshToken
    });
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function signUpRequest(req: Request, res: Response) {
  try {
    const requestData = req.body as CreateUserType['request'];
    // Проверка кода подтверждения
    await checkPhone(requestData.phone, requestData.code);
    // Проверка номера телефона
    await isUserExists(requestData.phone);

    const createdUser = await signUpUser(requestData);
    const accessToken = createToken(createdUser);
    const refreshToken = await createRefreshToken(createdUser);

    res.status(200).send({
      userId: createdUser.id,
      tokens: {
        accessToken,
        refreshToken,
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
}