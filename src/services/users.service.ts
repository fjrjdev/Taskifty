import { IUser } from "../models/user.model";
import UserRepository from "../repositories/user.repository";

class UsersService {
  getById(id: string) {
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
