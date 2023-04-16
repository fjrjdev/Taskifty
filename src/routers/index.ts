import { Router } from "express";
import AppError from "../errors/appError";

import authRouter from "./auth.router";
import usersRouter from "./users.router";
import tasksRouter from "./tasks.router"

const routes = Router();

routes.get("/error", (req, res) => {
  throw new AppError(400, "Error is working");
});
routes.use("/user", usersRouter);
routes.use("/auth", authRouter);
routes.use('/task',tasksRouter)

export default routes;
