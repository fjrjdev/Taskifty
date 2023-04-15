import { Router } from "express";
import GenericService from "../services/generics.service";

const router = Router()
router.get('/', (req, res) => {
    return res.status(201).send({message:'hello'})
} 
)

export default router