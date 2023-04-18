import { schemasMiddleware } from "../middlewares/schemas.middleware";
import { Router } from "express";
import AuthService from "../services/auth.service";
import { userSchema, userSignInSchema } from "../schemas/user.schema";

const router = Router();

router.post("/signup", schemasMiddleware(userSchema), async (req, res) => {
  await AuthService.create(req.body);
  return res.status(201).send({
    status: "success",
    code: 201,
    message: "User created with success",
  });
});

router.post("/signin", schemasMiddleware(userSignInSchema), async (req, res) => {
  const tokens = await AuthService.login(req.body);
  return res.status(200).send({ ...tokens });
});
router.post("/refresh", async (req, res) => {
  const accessToken = await AuthService.refresh(req.body);
  return res.status(200).send({ ...accessToken });
});

export default router;
