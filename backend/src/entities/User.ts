import { Cart } from "./Cart";

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    length: 100,
  })
  name!: string;

  @Index({ unique: true })
  @Column({
    length: 150,
  })
  email!: string;

  @Column({
    select: false,
  })
  password!: string;

  @OneToMany(() => Cart, (cart) => cart.user)
  carts!: Cart[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
