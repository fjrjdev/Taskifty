import AppError from "../errors/appError";
import { ITask } from "../models/task.model";
import { ITaskList } from "../models/taskList.model";
import TaskRepository from "../repositories/task.repository";
import TaskListRepository from "../repositories/taskList.repository";

class TasksListService {
  getAll(userId: string) {
    return TaskListRepository.getAllByUser(userId);
  }
  getAllShared(userId: string) {
    /* Obtém todas as listas de tarefas compartilhadas com um determinado usuário. */
    return TaskListRepository.getAllSharedWith(userId);
  }

  async getById(taskListId: string, userId: string) {
    /* Obtém uma lista de tarefas específica pelo seu ID e pelo ID do usuário que a está solicitando. Verifica se o usuário tem permissão para acessar essa lista de tarefas */
    const taskListExists = await TaskListRepository.verifyIfIdExists(
      taskListId
    );
    if (!taskListExists) {
      throw new AppError(404, "Task List not Found");
    }
    const currentTaskList = await TaskListRepository.getByIdDetail(taskListId);
    if (!currentTaskList) {
      throw new AppError(404, "Task List not Found");
    }
    const strCreatedBy = currentTaskList.createdBy.toString();
    if (strCreatedBy !== userId && currentTaskList.sharedWith) {
      const sharedWith = currentTaskList.sharedWith.map((user) =>
        user.toString()
      );
      if (!sharedWith.includes(userId)) {
        throw new AppError(
          401,
          "You don't have permission to access this task list"
        );
      }
    }

    return currentTaskList;
  }
  create(createdBy: string, taskList: ITaskList) {
    /* Cria uma nova lista de tarefas com o usuário que a criou e a retorna.*/
    taskList.createdBy = createdBy;
    return TaskListRepository.create(taskList);
  }
  async update(id: string, taskList: Partial<ITaskList>, userId: string) {
    /* Atualiza uma lista de tarefas específica com o ID fornecido e a retorna. Verifica se o usuário tem permissão para atualizar essa lista de tarefas. */
    const taskListExists = await TaskListRepository.verifyIfIdExists(id);
    if (!taskListExists) {
      throw new AppError(404, "Task not Found");
    }
    const currentTaskList = await TaskListRepository.getById(id);
    if (!currentTaskList) {
      throw new AppError(404, "Task List not Found");
    }
    const strCreatedBy = currentTaskList.createdBy.toString();
    if (strCreatedBy !== userId && currentTaskList.sharedWith) {
      const sharedWith = currentTaskList.sharedWith.map((user) =>
        user.toString()
      );
      if (!sharedWith.includes(userId)) {
        throw new AppError(
          401,
          "You don't have permission to access this task list"
        );
      }
    }
    taskList.updatedBy = userId;
    return TaskListRepository.update(id, taskList);
  }
  async remove(taskListId: string, userId: string) {
    /* Remove uma lista de tarefas específica pelo seu ID. Verifica se o usuário tem permissão para remover essa lista de tarefas.*/
    const taskListExists = await TaskListRepository.verifyIfIdExists(
      taskListId
    );
    if (!taskListExists) {
      throw new AppError(404, "Task List not Found");
    }
    const currentTaskList = await TaskListRepository.getById(taskListId);
    if (!currentTaskList) {
      throw new AppError(404, "Task List not Found");
    }
    const strCreatedBy = currentTaskList.createdBy.toString();
    if (strCreatedBy !== userId && currentTaskList.sharedWith) {
      const sharedWith = currentTaskList.sharedWith.map((user) =>
        user.toString()
      );
      if (!sharedWith.includes(userId)) {
        throw new AppError(
          401,
          "You don't have permission to access this task list"
        );
      }
    }
    return TaskListRepository.remove(taskListId);
  }
  async addTaskToList(tasklistId: string, task: ITask, createdBy: string) {
    /* Adiciona uma nova tarefa a uma lista de tarefas específica pelo seu ID e retorna a lista de tarefas atualizada.*/
    task.createdBy = createdBy;
    const newTask = await TaskRepository.create(task);
    const taskListExists = await TaskListRepository.verifyIfIdExists(
      tasklistId
    );
    if (!taskListExists) {
      throw new AppError(404, "Task List not Found");
    }
    const taskList = await TaskListRepository.getById(tasklistId);
    return TaskListRepository.createTaskOnList(taskList!, newTask._id);
  }
}

export default new TasksListService();
