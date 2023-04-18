import * as yup from "yup";
import { Schema } from "yup";

export const taskSchema: Schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  status: yup.string().oneOf(["to do", "in progress", "done"]).default("to do"),
  category: yup.string().default("Not defined"),
  assignedTo: yup.array().of(yup.string()).optional(),
  dueDate: yup.date().required(),
});

export const taskEditSchema: Schema = yup.object().shape({
  name: yup.string().optional(),
  description: yup.string().optional(),
  status: yup.string().oneOf(["to do", "in progress", "done"]).optional(),
  category: yup.string().default("Not defined").optional(),
  assignedTo: yup.array().of(yup.string()).optional(),
  dueDate: yup.date().optional(),
});
