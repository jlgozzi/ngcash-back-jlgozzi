import { Transaction } from "../entities/transation.entity";

export interface IUserRequest {
  username: string;
  password: string;
}

export interface ITransaction {
  value: number;
  cashInUsername: string;
  token: string;
}
export interface ITokenDecoded {
  username: string;
}

export interface ITransactionReturn extends Transaction {
  type: string;
}
