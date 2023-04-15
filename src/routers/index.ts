import { Router } from "express";
import userRouter from "./user.router";
import authRouter from "./auth.router";
import AppError from "../errors/appError";

const routes = Router();

routes.use("/auth", authRouter);
routes.use("/user", userRouter);
routes.get("/error", (req, res) => {
  throw new AppError(400, "Error is working");
});

export default routes;
