import { NextFunction, Request, Response } from "express";
import { IResponse } from "../interface";
import { NotFoundException } from "../util";

export function notFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const exception = new NotFoundException(
    `🔍 - Endpoint Not Found - ${req.originalUrl}`
  );

  next(exception);
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response<IResponse>,
  next: NextFunction
) {
  let statusCode = (err as any).statusCode || res.statusCode;
  statusCode = statusCode || 500;

  res.status(statusCode);
  res.json({
    status: "error",
    statusCode,
    message: err.message,
  });
}
