import { Request, Response } from 'express'
import bcrypt from 'bcrypt';
import { validateData, userSignUpRules } from '../utils/validationRules';
import { sequelize } from '../database/database.config';
import { Kid } from '../models/index';
import { RequestWithJWT } from '../schema/user';
import { CreateKidType, DeleteKidType, EditKidType, GetKidType } from '../schema/kid';
import { createKid, deleteKid, editKid, getKid } from '../utils/kid/kid';

export async function getKidsRequest(req: RequestWithJWT, res: Response) {
  try {
    const kids = await Kid.findAll({
      where: { UserId: req.jwt.id },
    })
    res.status(200).send(kids);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getKidRequest(req: RequestWithJWT, res: Response) {
  try {
    const requestData = req.query as unknown as GetKidType['request'];

    const kid = await getKid(requestData, req.jwt.id)
    res.status(200).send(kid);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function createKidRequest(req: RequestWithJWT, res: Response) {
  try {
    const requestData = req.body as CreateKidType['request'];

    const teams = await createKid(requestData, req.jwt.id);
    res.status(200).send(teams);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function editKidRequest(req: RequestWithJWT, res: Response) {
  try {
    const requestData = req.body as EditKidType['request'];

    const kid = await editKid(requestData, req.jwt.id);
    res.status(200).send(kid);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function deleteKidRequest(req: RequestWithJWT, res: Response) {
  try {
    const requestData = req.query as unknown as DeleteKidType['request'];

    const result = await deleteKid(requestData, req.jwt.id)
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}