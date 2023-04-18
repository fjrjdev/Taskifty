import { Router, Request, Response } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";

import TasksListService from "../services/tasksList.service";

const router = Router();
router.get("/", async (req: Request, res: Response) => {
  const tasklists = await TasksListService.getAll();
  res.status(200).send({ results: [ ...tasklists ] });
});
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  await TasksListService.create(req.user.id, req.body)
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
    const results = await TasksListService.update(req.params.id, req.body, req.user.id);
    return res.status(200).send({ results });
  }
)
export default router;
