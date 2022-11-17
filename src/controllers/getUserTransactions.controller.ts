import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import getUserTransactionsService from "../services/getUserTransactions.service";
import tokenDecoder from "../utils/tokenDecoder.utility";

const getUserTransactionsController = async (req: Request, res: Response) => {
  const token = req.headers.authorization!;

  const transactions = await getUserTransactionsService(token);

  return res.status(200).json(instanceToPlain(transactions));
};

export default getUserTransactionsController;
