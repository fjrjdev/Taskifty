import { IUser } from "../models/user.model";
import UserRepository from "../repositories/user.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import AppError from "../errors/appError";

dotenv.config();
const secretJWT = process.env.JWT_SECRET_KEY || "";

class AuthService {
  async create(user: IUser) {
    if (user.password!) {
      user.password = await bcrypt.hash(user.password, 10);
    }
    return UserRepository.create(user);
  }
  async login(email: string, password: string) {
    const emailExists = UserRepository.verifyIfEmailExists(email);
    if (!emailExists) {
      throw new AppError(404, "User not found!");
    }
    const user = await UserRepository.getByEmail(email);

    if (!user) {
      throw new AppError(404, "User not found!");
    }

    const result = await bcrypt.compare(password, user.password);

    if (result) {
      return jwt.sign({ email: user.email, _id: user._id }, secretJWT, {
        expiresIn: "1d",
      });
    }

    throw new AppError(401, "Invalid credentials");
  }
}

export default new AuthService();
