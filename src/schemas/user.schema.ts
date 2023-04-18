import * as yup from "yup";
import { Schema } from "yup";

export const userSchema: Schema = yup.object().shape({
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
export const userSignInSchema: Schema = yup.object().shape({
  email: yup.string().required(),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\.*])(?=.{8,})/,
      "the password must contain 8 characters, an uppercase, a lowercase, a number and a special character"
    )
    .required(),
});

export const userUpdateSchema: Schema = yup.object().shape({
  name: yup.string(),
  email: yup.string(),
});
