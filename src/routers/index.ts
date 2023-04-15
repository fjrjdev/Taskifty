import {Router } from 'express'
import userRouter from './generics.router'
import authRouter from './auth.router'

const routes = Router()

routes.use("/auth", authRouter)
routes.use("/user",userRouter)

export default routes