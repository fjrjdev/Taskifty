import * as yup from "yup";
import { Schema } from "yup";

interface IUserSchema {
  name: string;
  email: string;
  password: string;
}
interface IUserUpdateSchema {
  name: string;
  email: string;
}
export const userSchema: Schema<IUserSchema> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\.*])(?=.{8,})/,
      "the password must contain 8 characters, an uppercase, a lowercase, a number and a special character"
    )
    .required(),
});

export const userUpdateSchema: Schema<IUserUpdateSchema> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
});
