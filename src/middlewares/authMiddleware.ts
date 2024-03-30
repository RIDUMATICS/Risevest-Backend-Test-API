import { Request, Response, NextFunction } from "express";
import { UnauthorizedException, log, verifyToken } from "../util";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.header("Authorization");

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    throw new UnauthorizedException("Invalid authorization header");
  }

  const token = authorizationHeader.replace("Bearer ", "");

  if (!token) {
    throw new UnauthorizedException("Authorization token not found");
  }

  try {
    const decoded = verifyToken(token);
    (req as any).user = decoded;
    next();
  } catch (err) {
    log.error(err);
    throw new UnauthorizedException("Invalid token");
  }
};
