import { AppDataSource } from "../data-source";
import { Transaction } from "../entities/transation.entity";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/appError";
import tokenDecoder from "../utils/tokenDecoder.utility";

const getUserTransactionsService = async (token: string) => {
  const tokenPayload: any = tokenDecoder(token);

  const databaseUser = AppDataSource.getRepository(User);

  const user = await databaseUser.findOneBy({
    username: tokenPayload.username,
  });

  const databaseTransaction = AppDataSource.getRepository(Transaction);

  const transactions = await databaseTransaction.find();

  if (transactions.length === 0) {
    throw new AppError("Transactions not found.", 404);
  }

  console.log(transactions);

  const userTransactionsCashIn = transactions.filter(
    (transaction) => transaction.creditedAccount.id === user!.account.id
  );
  const userTransactionsCashOut = transactions.filter(
    (transaction) => transaction.debitedAccount.id === user!.account.id
  );

  return {
    user,
    userTransactions: {
      cashIn: userTransactionsCashIn,
      cashOut: userTransactionsCashOut,
    },
  };
};

export default getUserTransactionsService;
