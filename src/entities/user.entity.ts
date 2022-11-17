import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Account } from "./account.entity";
import { v4 as uuid } from "uuid";
import { Exclude } from "class-transformer";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @OneToOne((type) => Account, (account) => account.id, { eager: true })
  @JoinColumn()
  account: Account;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
