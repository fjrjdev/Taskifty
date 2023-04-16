import { Router } from "express";
import AuthService from "../services/auth.service";


const router = Router();

router.post("/signup", async (req, res) => {
  await AuthService.create(req.body);
  return res.status(201).send({ status: "success", message: "User created with success", code: 201 });
});

router.post("/signin", async (req, res) => {
  const tokens = await AuthService.login(req.body);
  return res.status(200).send({ ...tokens });
});
router.post("/refresh", async (req, res) => {
  const accessToken = await AuthService.refresh(req.body);
  return res.status(200).send({ ...accessToken });
});

export default router;
