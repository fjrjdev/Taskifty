import { Router } from "express";
import AuthService from "../services/auth.service";
import { IUser } from "../models/user.model";

const router = Router();

router.post("/signup", async (req, res) => {
  const data = await AuthService.create(req.body);
  return res.status(201).send({ results: data });
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
