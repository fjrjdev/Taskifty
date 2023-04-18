import { Router, Request, Response } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import UsersService from "../services/users.service";
import { schemasMiddleware } from "../middlewares/schemas.middleware";
import { userUpdateSchema } from "../schemas/user.schema";

const router = Router();
router.get("/profile", authMiddleware, async (req: Request, res: Response) => {
  const results = await UsersService.getById(req.user.id);
  return res.status(200).send({ results });
});

router.put("/update", authMiddleware, schemasMiddleware(userUpdateSchema), async (req: Request, res: Response) => {
  const results = await UsersService.update(req.user.id, req.body);
  return res.status(200).send({ results });
});

router.delete(
  "/delete",
  authMiddleware,
  async (req: Request, res: Response) => {
    await UsersService.remove(req.user.id);
    return res.status(204).send();
  }
);

export default router;
