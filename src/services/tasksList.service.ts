import AppError from "../errors/appError";
import { ITaskList } from "../models/taskList.model";
import TaskListRepository from "../repositories/taskList.repository";

class TasksListService {
  getAll() {
    return TaskListRepository.getAll();
  }
  create(createdBy: string, taskList: ITaskList) {
    taskList.createdBy = createdBy
    return TaskListRepository.create(taskList)
  }
  async update(id: string, taskList: Partial<ITaskList>, userId: string,){
    const taskListExists = await TaskListRepository.verifyIfIdExists(id);
    if (!taskListExists) {
      throw new AppError(404, "Task not Found");
    }
    const currentTaskList = await TaskListRepository.getById(id)
    if (!currentTaskList) {
      throw new AppError(404, "Task List not Found");
    }
    const strCreatedBy = currentTaskList.createdBy.toString();
    if (strCreatedBy !== userId) {
      throw new AppError(401, "You don't have permission to update this task list");
    }
    const sharedWith = currentTaskList.sharedWidth.map((user) => user.toString());
    if (!sharedWith.includes(userId)) {
      throw new AppError(401, "You don't have permission to access this task list");
    }
    taskList.updatedBy = userId
    return TaskListRepository.update(id, taskList)
  }
}

export default new TasksListService();
