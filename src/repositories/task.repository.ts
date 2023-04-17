import { Task, ITask } from "../models/task.model";

class TaskRepository {
  getAll() {
    return Task.find();
  }
  getAllByUser(createdBy: string) {
    return Task.find({createdBy: createdBy});
  }
  getById(id: string) {
    return Task.findOne({ _id: id });
  }
  create(task: ITask) {
    return Task.create(task);
  }
  update(id: string, task: Partial<ITask>) {
    return Task.findOneAndUpdate({ _id: id }, task, { new: true });
  }
  remove(id: string) {
    return Task.deleteOne({ _id: id });
  }
  verifyIfIdExists(id: string) {
    return Task.exists({ _id: id });
  }
}
export default new TaskRepository();
