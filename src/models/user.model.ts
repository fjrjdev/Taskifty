import mongoose from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

export const User = mongoose.model<IUser>("User", userSchema);
