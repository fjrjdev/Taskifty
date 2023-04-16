import { Router, Request, Response } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import UserRepository from "../repositories/user.repository";


const router = Router();
router.get("/profile", authMiddleware, async (req: Request, res: Response) => {
  const results = await UserRepository.getById(req.user.id);
  return res.status(200).send({ results });
});

export default router;
