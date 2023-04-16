import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import AppError from "../errors/appError";
import config from "../config";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (!token) {
    throw new AppError(400, "Token Required");
  }
  token = token.split(" ")[1];
  jwt.verify(token, config.jwtSecret, (error: any, decoded: any) => {
    if (error) {
      throw new AppError(401, "Invalid token");
    }

    req.user = {
      id: decoded._id,
    };
  });
  next();
};
