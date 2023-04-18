import { ITask } from "../models/task.model";
import { TaskList, ITaskList } from "../models/taskList.model";

class TaskListRepository {
  getAll() {
    return TaskList.find();
  }
  getAllSharedWith(id: string) {
    return TaskList.find({sharedWith : id});
  }
  getAllByUser(createdBy: string) {
    return TaskList.find({ createdBy: createdBy });
  }
  getById(id: string) {
    return TaskList.findOne({ _id: id });
  }
  getByIdDetail(id: string) {
    return TaskList.findOne({ _id: id }).populate('tasks');
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
  createTaskOnList(taskList: ITaskList, task: ITask): void {
    taskList.tasks.push(task._id);
    taskList.save();
  }
}
export default new TaskListRepository();
