import { AppDataSource } from "../data-source";
import { Account } from "../entities/account.entity";
import { Transaction } from "../entities/transation.entity";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/appError";
import { ITransaction } from "../interfaces";
import tokenDecoder from "../utils/tokenDecoder.utility";

const transactionService = async ({
  value,
  cashInUsername,
  token,
}: ITransaction) => {
  const tokenPayload: any = tokenDecoder(token);
  const cashOutUsername = tokenPayload.username;

  if (cashOutUsername.toLowerCase() === cashInUsername.toLowerCase()) {
    throw new AppError("User invalid.");
  }

  const transactionDatabase = AppDataSource.getRepository(Transaction);
  const accountDatabase = AppDataSource.getRepository(Account);
  const userDatabase = AppDataSource.getRepository(User);

  const cashInUser = await userDatabase.findOneBy({ username: cashInUsername });
  const cashOutUser = await userDatabase.findOneBy({
    username: cashOutUsername,
  });

  if (!cashInUser || !cashOutUser) {
    throw new AppError("User not found.");
  }

  if (value > cashOutUser.account.balance) {
    throw new AppError("insufficient funds.", 401);
  }

  await accountDatabase.update(cashOutUser.account.id, {
    balance: cashOutUser.account.balance - value,
  });
  await accountDatabase.update(cashInUser.account.id, {
    balance: cashInUser.account.balance + value,
  });

  const newTransaction = transactionDatabase.create({
    value: value,
    debitedAccount: cashOutUser.account,
    creditedAccount: cashInUser.account,
  });
  await transactionDatabase.save(newTransaction);

  return {
    message: "Successful transaction.",
    transaction: newTransaction,
  };
};

export default transactionService;
