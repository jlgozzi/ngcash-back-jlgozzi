import { Response, Request } from "express";
import userLoginService from "../services/userLogin.service";

const userLoginController = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const login = await userLoginService({ username, password });

  return res.status(200).json(login);
};

export default userLoginController;
