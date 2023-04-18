import mongoose, { Document } from "mongoose";

export interface ITaskList extends Document {
  name: string;
  tasks: string[];
  sharedWith: string[];
  createdBy: string;
  updatedBy: string;
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
