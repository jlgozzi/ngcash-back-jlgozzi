import { Response, Request, NextFunction } from "express";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/appError";
import { AppDataSource } from "../data-source";
import tokenDecoder from "../utils/tokenDecoder.utility";

const verifyAuthTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    throw new AppError("missing authorization token.");
  }

  const database = AppDataSource.getRepository(User);

  const users = await database.find();

  const payload: any = tokenDecoder(authorization);

  const exists = users.find((user) => user.username === payload.username);

  if (!exists) {
    return res.status(404).json({ message: "User not found." });
  }

  return next();
};

export default verifyAuthTokenMiddleware;
