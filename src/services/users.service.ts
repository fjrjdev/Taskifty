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
  update(id: string, user: Partial<IUser>) {
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
