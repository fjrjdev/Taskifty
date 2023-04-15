import { Router } from "express";
import AuthService from "../services/auth.service";
import { IUser } from "../models/user.model";


const router = Router()

router.post('/signup', async(req, res) => {
    const data = await AuthService.create(req.body)
    return res.status(201).send({results: data})
} 
)

router.post('/signin', (req, res) => {
    return res.status(200).send({message:'login'})
} 
)

export default router