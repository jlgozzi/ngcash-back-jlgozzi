import { instanceToPlain } from "class-transformer";
import { Response, Request } from "express";
import transactionService from "../services/transaction.service";

const transactionController = async (req: Request, res: Response) => {
  const { value } = req.body;
  const cashInUsername = req.params.username!;
  const token = req.headers.authorization!;

  const transaction = await instanceToPlain(
    transactionService({
      value,
      cashInUsername,
      token,
    })
  );

  return res.status(200).json(transaction);
};

export default transactionController;
