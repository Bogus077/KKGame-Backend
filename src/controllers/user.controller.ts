import { Request, Response } from 'express'
import bcrypt from 'bcrypt';
import { validateData, userSignUpRules } from '../utils/validationRules';
import { sequelize } from '../database/database.config';
import { User } from '../models/index';
import { createRefreshToken, createToken } from '../utils/token';
import { JwtPayload } from 'src/middlewares/authJwt';
import { CreateUserType, LoginUserType, RequestWithJWT } from '../schema/user';

export async function getUserRequest(req: RequestWithJWT, res: Response) {
  try {
    const user = await User.findOne({
      where: { id: req.jwt.id },
      attributes: { exclude: ['password'] },
      // include: Team,
    })
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
}