import { TaskList, ITaskList } from "../models/taskList.model";

class TaskRepository {
  getAll() {
    return TaskList.find();
  }
  getAllByUser(createdBy: string) {
    return TaskList.find({ createdBy: createdBy });
  }
  getById(id: string) {
    return TaskList.findOne({ _id: id });
  }
  create(tasklist: ITaskList) {
    return TaskList.create(tasklist);
  }
  update(id: string, tasklist: Partial<ITaskList>) {
    return TaskList.findOneAndUpdate({ _id: id }, tasklist, { new: true });
  }
  remove(id: string) {
    return TaskList.deleteOne({ _id: id });
  }
  verifyIfIdExists(id: string) {
    return TaskList.exists({ _id: id });
  }
}
export default new TaskRepository();
