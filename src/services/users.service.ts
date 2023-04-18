import AppError from "../errors/appError";
import { IUser } from "../models/user.model";
import UserRepository from "../repositories/user.repository";

class UsersService {
  async getById(id: string) {
    const userExists = await UserRepository.verifyIfIdExists(id);
    if (!userExists) {
      throw new AppError(404, "User not Found");
    }
    return UserRepository.getById(id);
  }
  async update(id: string, user: Partial<IUser>) {
    if (user.email !== undefined) {
      const emailExists = await UserRepository.verifyIfEmailExists(user.email);
      if (emailExists) {
        throw new AppError(409, "Email already registered");
      }
    }
    if (user.password !== undefined) {
      throw new AppError(404, "Password cannot be changed on this route");
    }

    return UserRepository.update(id, user);
  }
  remove(id: string) {
    return UserRepository.remove(id);
  }
  getByEmail(email: string) {
    return UserRepository.getByEmail(email);
  }
}

export default new UsersService();
