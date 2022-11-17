import { User } from "../entities/user.entity";
import { IUserRequest } from "../interfaces/index";
import { hash } from "bcrypt";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors/appError";
import { Account } from "../entities/account.entity";

const userRegisterService = async ({
  username,
  password,
}: IUserRequest): Promise<User> => {
  const database = AppDataSource.getRepository(User);
  const account = AppDataSource.getRepository(Account);

  const userAlreadyExist = await database.findOneBy({ username: username });
  if (userAlreadyExist) {
    throw new AppError("Username already exists.");
  }

  //verificar a senha
  const newAccount = account.create({ balance: 100.0 });
  account.save(newAccount);

  const hashedPassword = await hash(password, 10);

  const newUser = database.create({
    username,
    password: hashedPassword,
    account: newAccount,
  });

  await database.save(newUser);

  return newUser;
};

export default userRegisterService;
