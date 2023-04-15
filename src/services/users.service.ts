import { IUser, User } from "../models/user.model";
import UserRepository from "../repositories/user.repository";

class UsersService {
  getAll() {
    return UserRepository.getAll();
  }
  update(id: string, user: Partial<IUser>) {
    return UserRepository.update(id, user);
  }
  remove(id: string) {
    return UserRepository.remove(id);
  }

}

export default new UsersService()
