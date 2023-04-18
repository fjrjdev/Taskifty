import { NextFunction, Request, Response } from "express";
import AppError from "../errors/appError";
import { AnySchema } from "yup";

export const schemasMiddleware =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    try {
      await schema.validate(data, { abortEarly: false });
      next();
    } catch (err: any) {
      const invalidFields = err.inner.map((innerErr:any) => {
        const field = innerErr.path;
        const message = innerErr.message;
        return `${field}: ${message}`;
      });
      const message = `Invalid fields: ${invalidFields.join(", ")}`;
      throw new AppError(400, message);
    }
  };
