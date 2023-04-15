import { IUser, User } from "../models/user.model";


class UserRepository {
    getAll(){
        return User.find();
    }
    getById(id: string){
        return User.findOne({_id:id});
    }
    create(user: IUser){
        return User.create(user);
    }
    update(id: string, user: Partial<IUser>){
        return User.findOneAndUpdate({_id: id}, user, {new: true})
    }
    remove(id: string){
        return User.deleteOne({_id: id})
    }
    verifyIfUserExists(id: string){
        return User.exists({_id: id})
    }
}
export default new UserRepository();