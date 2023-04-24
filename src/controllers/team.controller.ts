import { Request, Response } from 'express'
import bcrypt from 'bcrypt';
import { validateData, userSignUpRules } from '../utils/validationRules';
import { sequelize } from '../database/database.config';
import { Kid, Team, User } from '../models/index';
import { createRefreshToken, createToken } from '../utils/token';
import { JwtPayload } from 'src/middlewares/authJwt';
import { checkPhone, isUserExists, loginUser, makeCall, signUpUser } from '../utils/user';
import { MakeCallType } from '../schema/phone';
import { CreateUserType, LoginUserType, RequestWithJWT } from '../schema/user';
import { createTeam } from '../utils/team/team';
import { CreateTeamType } from 'src/schema/team';

export async function getTeamsRequest(req: RequestWithJWT, res: Response) {
  try {
    const teams = await Team.findAll({
      where: { UserId: req.jwt.id },
      include: Kid,
    })
    res.status(200).send(teams);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function createTeamsRequest(req: RequestWithJWT, res: Response) {
  try {
    const requestData = req.body as unknown as CreateTeamType['request'];

    const teams = await createTeam(requestData, req.jwt.id);
    res.status(200).send(teams);
  } catch (error) {
    res.status(500).send(error);
  }
}