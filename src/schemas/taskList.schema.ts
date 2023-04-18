import * as yup from "yup";
import { Schema } from "yup";

export const taskListSchema: Schema = yup.object().shape({
  name: yup.string().required(),
  tasks: yup.array().of(yup.string()).optional(),
  sharedWith: yup.array().of(yup.string()).optional(),
});

export const taskListUpdateSchema: Schema = yup.object().shape({
  name: yup.string().optional(),
  tasks: yup.array().of(yup.string()).optional(),
  sharedWith: yup.array().of(yup.string()).optional(),
});
