import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import config from "../config";
import AppError from "../errors/appError";

import UserRepository from "../repositories/user.repository";
import { IUser } from "../models/user.model";

export interface IRefresh {
  refresh: string;
}
class AuthService {
  async create(user: IUser) {
    const emailExists = await UserRepository.verifyIfEmailExists(user.email);
    if (emailExists) {
      throw new AppError(409, "Email already registered");
    }
    if (user.password!) {
      user.password = await bcrypt.hash(user.password, 10);
    }
    return UserRepository.create(user);
  }

  async login({ email, password }: IUser) {
    const emailExists = await UserRepository.verifyIfEmailExists(email);
    if (!emailExists) {
      throw new AppError(404, "User not found!");
    }
    const user = await UserRepository.getByEmail(email);

    if (!user) {
      throw new AppError(404, "User not found!");
    }
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      throw new AppError(401, "Invalid Email or Password");
    }

    const payload = { _id: user._id };
    const accessToken = jwt.sign(payload, config.jwtSecret, {
      expiresIn: config.jwtExpirationTime,
    });
    const refresh = jwt.sign(payload, config.refreshTokenSecret, {
      expiresIn: config.refreshTokenExpirationTime,
    });
    return { accessToken, refresh };
  }

  async refresh({ refresh }: IRefresh) {
    let userId;
    try {
      const decoded: any = jwt.verify(refresh, config.refreshTokenSecret);
      userId = decoded._id;
    } catch (e) {
      throw new AppError(403, "Invalid refresh token.");
    }
    const userExists = await UserRepository.verifyIfIdExists(userId);
    if (!userExists) {
      throw new AppError(404, "User not Found");
    }
    const payload = { _id: userId };
    const accessToken = jwt.sign(payload, config.jwtSecret, {
      expiresIn: config.jwtExpirationTime,
    });
    return { accessToken };
  }
}

export default new AuthService();
