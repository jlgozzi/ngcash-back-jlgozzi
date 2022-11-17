import { User } from "../entities/user.entity";
import { IUserRequest } from "../interfaces/index";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../errors/appError";
import { AppDataSource } from "../data-source";

const userLoginService = async ({ username, password }: IUserRequest) => {
  const database = AppDataSource.getRepository(User);

  const user = await database.findOneBy({ username: username });

  if (!user) {
    throw new AppError("Email or password invalid.", 401);
  }

  if (!bcrypt.compareSync(password, user.password)) {
    throw new AppError("Email or password invalid.", 401);
  }

  const token = jwt.sign({ username }, String(process.env.SECRET_KEY), {
    expiresIn: "1d",
  });

  return { message: "Logged in.", token: token };
};

export default userLoginService;
