import { JwtPayload } from "jsonwebtoken";
import { Request } from 'express'


export type CreateUserType = {
  request: {
    phone: string;
    password: string;
    name: string;
    lastName: string;
  }
}

export type LoginUserType = {
  request: {
    phone: string;
    password: string;
  }
}

export type RequestWithJWT = Request & { jwt: JwtPayload };
