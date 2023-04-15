import mongoose from "mongoose";
import { ITask } from "./task.model";
import { IUser } from "./user.model";

export interface ITaskList {
  name: string;
  tasks: ITask[];
  sharedWidth: IUser[];
  createdBy: IUser;
  updatedBy: IUser;
  createdAt: string | Date;
  updatedAt: string | Date;
}
const taskListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  sharedWith: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
  __v: {
    type: Number,
    select: false,
  },
});

export const TaskList = mongoose.model<ITaskList>("TaskList", taskListSchema);
