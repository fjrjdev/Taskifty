import {Router } from 'express'
import router from './generics.router'

const routes = Router()
routes.use("/",router)

export default routes