import { Request, Response, NextFunction } from "express";
import AppError from "../errors/appError";

export const errorMiddleware = (
  /*Executado quando ocorre um erro*/
  err: any,
  request: Request,
  response: Response,
  _: NextFunction
) => {
  console.log(err);
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      code: err.statusCode,
      message: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    code: 500,
    message: "Internal server error",
  });
};
