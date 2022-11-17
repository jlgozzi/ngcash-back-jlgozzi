import { Response, Request } from "express";
import { instanceToPlain } from "class-transformer";
import userRegisterService from "../services/userRegister.service";

const userRegisterController = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const newUser = await userRegisterService({ username, password });

  return res
    .status(201)
    .json(instanceToPlain({ message: "User created.", user: newUser }));
};

export default userRegisterController;
