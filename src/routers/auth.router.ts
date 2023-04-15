import { Router } from "express";
import authService from "../services/auth.service";


const router = Router()

router.post('/signup', async(req, res) => {
    const user = await authService.create(req.body)
    return res.status(201).send({user})
} 
)

router.post('/signin', (req, res) => {
    return res.status(200).send({message:'login'})
} 
)

export default router