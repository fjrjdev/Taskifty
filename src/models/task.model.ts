import mongoose, { Document } from "mongoose";
import { IUser } from "./user.model";

export interface ITask extends Document {
  name: string;
  description: string;
  status: "to do" | "in progress" | "done";
  category: string;
  assignedTo: IUser;
  dueDate: string | Date;
  createdAt: string | Date;
  updatedAt: string | Date;
  createdBy: string;
  updatedBy: string;
}
export const taskSchema = new mongoose.Schema({
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
    type: String,
    default: "Not defined",
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
  __v: {
    type: Number,
    select: false,
  },
});

export const Task = mongoose.model<ITask>("Task", taskSchema);
