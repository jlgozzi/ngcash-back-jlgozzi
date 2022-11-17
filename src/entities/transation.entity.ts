import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { Account } from "./account.entity";
import { v4 as uuid } from "uuid";
import { Exclude } from "class-transformer";

@Entity("transactions")
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  value: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Account, (account) => account.id, { eager: true })
  @JoinColumn()
  @Exclude()
  debitedAccount: Account;

  @ManyToOne(() => Account, (account) => account.id, { eager: true })
  @JoinColumn()
  @Exclude()
  creditedAccount: Account;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
  }
}
