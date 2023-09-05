import { Request, Response } from 'express'
import bcrypt from 'bcrypt';
import { validateData, userSignUpRules } from '../utils/validationRules';
import { sequelize } from '../database/database.config';
import { CheckList, User } from '../models/index';
import { createRefreshToken, createToken } from '../utils/token';
import { JwtPayload } from 'src/middlewares/authJwt';
import { CreateUserType, LoginUserType, RequestWithJWT } from '../schema/user';
import { CreateCheckListType } from '../schema/checklist';
import { createCheckList } from '../utils/checkList/checkList';

export async function createCheckListRequest(req: RequestWithJWT, res: Response) {
  try {
    const requestData = req.body as CreateCheckListType['request'];
    const createdCheckList = await createCheckList(requestData);

    res.status(200).send(createdCheckList);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getAllCheckListsRequest(req: RequestWithJWT, res: Response) {
  try {
    const checkLists = await CheckList.findAll();

    res.status(200).send(checkLists);
  } catch (error) {
    res.status(500).send(error);
  }
}