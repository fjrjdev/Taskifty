import { Router } from "express";
import usersRouter from "./users.router";
import authRouter from "./auth.router";
import AppError from "../errors/appError";

const routes = Router();

routes.get("/error", (req, res) => {
  throw new AppError(400, "Error is working");
});
routes.use("/user", usersRouter);
routes.use("/auth", authRouter);

export default routes;
