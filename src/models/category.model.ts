import mongoose from "mongoose";
import { ITask } from "./task.model";

export interface ICategory {
  name: string;
  description: string;
  tasks: ITask[];
  createdAt: string | Date;
  updatedAt: string | Date;
}

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default:new Date(),
  },
});

export const Category = mongoose.model<ICategory>("Category", categorySchema);
