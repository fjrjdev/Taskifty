import AppError from "../errors/appError";
import { ITask } from "../models/task.model";
import TaskRepository from "../repositories/task.repository";

class TasksService {
  async getAll() {
    return TaskRepository.getAll();
  }
  async getAllByUser(createdBy:string) {
    return TaskRepository.getAllByUser(createdBy);
  }
  async create(createdBy: string, data: ITask) {
    data.createdBy = createdBy;
    return TaskRepository.create(data);
  }
  async getById(id: string) {
    const taskExists = await TaskRepository.verifyIfIdExists(id);
    if (!taskExists) {
      throw new AppError(404, "Task not Found");
    }
    return TaskRepository.getById(id);
  }
  async update(id: string, task: Partial<ITask>, user: string) {
    const taskExists = await TaskRepository.verifyIfIdExists(id);
    if (!taskExists) {
      throw new AppError(404, "Task not Found");
    }
    const currentTask = await TaskRepository.getById(id);
    if (!currentTask) {
      throw new AppError(404, "Task not Found");
    }
    const strCreatedBy = currentTask.createdBy.toString();
    if (strCreatedBy !== user) {
      throw new AppError(401, "You don't have permission to update this task");
    }
    task.updatedBy = user
    return TaskRepository.update(id, task);
  }
  async remove(id: string, createdBy:string) {
    const taskExists = await TaskRepository.verifyIfIdExists(id);
    if (!taskExists) {
      throw new AppError(404, "Task not Found");
    }
    const currentTask = await TaskRepository.getById(id);
    if (!currentTask) {
      throw new AppError(404, "Task not Found");
    }
    const strCreatedBy = currentTask.createdBy.toString();
    if (strCreatedBy !== createdBy) {
      throw new AppError(401, "You don't have permission to update this task");
    }
    return TaskRepository.remove(id);
  }
}

export default new TasksService();
