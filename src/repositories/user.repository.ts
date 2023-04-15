import { IUser, User } from "../models/user.model";

class UserRepository {
  getAll() {
    return User.find();
  }
  getById(id: string) {
    return User.findOne({ _id: id });
  }
  getByEmail(email: string) {
    return User.findOne({ email: email });
  }
  create(user: IUser) {
    return User.create(user);
  }
  update(id: string, user: Partial<IUser>) {
    return User.findOneAndUpdate({ _id: id }, user, { new: true });
  }
  remove(id: string) {
    return User.deleteOne({ _id: id });
  }
  verifyIfIdExists(id: string) {
    return User.exists({ _id: id });
  }
  verifyIfEmailExists(email: string) {
    const emailExists = User.exists({ email: email });
    if (emailExists === null) {
      return false;
    }
    return emailExists;
  }
}
export default new UserRepository();
