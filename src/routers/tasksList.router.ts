import { Router, Request, Response } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";

import TasksListService from "../services/tasksList.service";

const router = Router();
router.get("/", async (req: Request, res: Response) => {
  const tasklists = await TasksListService.getAll();
  res.status(200).send({ results: [...tasklists] });
});
router.get("/detail/:id",authMiddleware, async (req: Request, res: Response) => {
  const tasklist = await TasksListService.getById(req.params.id, req.user.id);
  res.status(200).send({ results: tasklist });
});
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  await TasksListService.create(req.user.id, req.body);
  return res.status(201).send({
    status: "success",
    code: 201,
    message: "Task List created with success",
  });
});
router.put(
  "/update/:id",
  authMiddleware,
  async (req: Request, res: Response) => {
    const results = await TasksListService.update(
      req.params.id,
      req.body,
      req.user.id
    );
    return res.status(200).send({ results });
  }
);
router.delete(
  "/delete/:id",
  authMiddleware,
  async (req: Request, res: Response) => {
    await TasksListService.remove(req.params.id, req.user.id);
    return res.status(204).send();
  }
);
router.post(
  "/addtask/:id",
  authMiddleware,
  async (req: Request, res: Response) => {
    await TasksListService.addTaskToList(req.params.id, req.body, req.user.id);
    return res.status(201).send({
      status: "success",
      code: 201,
      message: "Task created on TaskList with success",
    });
  }
);

export default router;
