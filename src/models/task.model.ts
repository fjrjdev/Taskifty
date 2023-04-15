import mongoose from "mongoose";
import { IUser } from "./user.model";
import { ICategory } from "./category.model";

export interface ITask {
  name: string;
  description: string;
  status: "to do" | "in progress" | "done";
  category: ICategory;
  assignedTo: IUser;
  dueDate: string | Date;
  createdAt: string | Date;
  updatedAt: string | Date;
  createdBy: IUser;
  updatedBy: IUser;
}
const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ["to do", "in progress", "done"],
    default: "to do",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  dueDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Task = mongoose.model<ITask>("Task", taskSchema);
