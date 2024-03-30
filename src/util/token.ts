import { IUserAuth } from "../interface";
import config from "../config";
import jwt, { JwtPayload } from "jsonwebtoken";

export const generateToken = (payload: IUserAuth): string => {
  return jwt.sign(payload, config.TOKEN_SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token: string): string | JwtPayload => {
  return jwt.verify(token, config.TOKEN_SECRET);
};
