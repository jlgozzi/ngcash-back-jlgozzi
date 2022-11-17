import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Transaction } from "./transation.entity";

@Entity("accounts")
export class Account {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  balance: number;

  @OneToMany((type) => Transaction, (transaction) => transaction.id)
  transactions: Transaction[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
    if (!this.balance) {
      this.balance = 100.0;
    }
  }
}
