import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserRequest } from "../interfaces";

export const userRegisterScheama: SchemaOf<IUserRequest> = yup.object().shape({
  username: yup
    .string()
    .required()
    .matches(/.{3,}/, "Username must contain at least 3 digits"),
  password: yup
    .string()
    .required()
    .matches(/[A-Z]/, "Password must have at least 1 capital letter")
    .matches(/(\d)/, "Password must contain at least 1 number")
    .matches(/.{8,}/, "Password must contain at least 8 digits"),
});
