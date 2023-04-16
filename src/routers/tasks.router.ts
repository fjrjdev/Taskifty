import { Router, Request, Response } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import TasksService from "../services/tasks.service";

const router = Router();
router.get("/", async (req: Request, res: Response) => {
  const tasks = await TasksService.getAll();
  res.status(200).send({ results: tasks });
});
router.get("/:id", async (req: Request, res: Response) => {
  const task = await TasksService.getById(req.params.id);
  res.status(200).send({ results: task });
});
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  await TasksService.create(req.user.id, req.body);
  return res.status(201).send({
    status: "success",
    code: 201,
    message: "Task created with success",
  });
});
router.put(
  "/update/:id",
  authMiddleware,
  async (req: Request, res: Response) => {
    const results = await TasksService.update(req.params.id, req.body, req.user.id);
    return res.status(200).send({ results });
  }
)
router.delete(
  "/delete/:id",
  authMiddleware,
  async (req: Request, res: Response) => {
    await TasksService.remove(req.params.id, req.user.id);
    return res.status(204).send();
  }
);

export default router;
