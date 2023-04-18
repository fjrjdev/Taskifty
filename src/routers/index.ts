import { Router } from "express";
import AppError from "../errors/appError";

import authRouter from "./auth.router";
import usersRouter from "./users.router";
import tasksRouter from "./tasks.router";
import tasksLists from "./tasksList.router";

const routes = Router();
routes.get("/app", (req, res) => {
  return res
    .status(200)
    .send({
      status: "success",
      code: 200,
      message: "You app is running",
    });
});
routes.get("/error", (req, res) => {
  /*Rota para testar o error middleware*/
  throw new AppError(400, "Error is working");
});
routes.use("/user", usersRouter);
routes.use("/auth", authRouter);
routes.use("/task", tasksRouter);
routes.use("/tasklist", tasksLists);

export default routes;
