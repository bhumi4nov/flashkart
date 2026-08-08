import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { CartItem } from "./CartItem";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
  })
  price!: number;

  @Column()
  stock!: number;

  @Column({
    default: 0,
  })
  reservedStock!: number;

  @Column({
    default: true,
  })
  isActive!: boolean;

  // Relation with CartItem
  @OneToMany(() => CartItem, (item) => item.product)
  cartItems!: CartItem[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
