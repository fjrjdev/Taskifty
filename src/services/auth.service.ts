import { IUser } from "../models/user.model";
import UserRepository from "../repositories/user.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretJWT = process.env.JWT_SECRET_KEY || "";

class AuthService {
  async create(user: IUser) {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
    return UserRepository.create(user);
  }
}

export default new AuthService

