import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { Cart } from "./Cart";
import { Product } from "./Product";

@Entity("cart_items")
export class CartItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Cart, (cart) => cart.items)
  cart!: Cart;

  @ManyToOne(() => Product, (product) => product.cartItems)
  product!: Product;

  @Column({
    default: 1,
  })
  quantity!: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
  })
  price!: number;

  @Column({
    nullable: true,
  })
  reservationId?: string;

  @Column({
    type: "timestamp",
    nullable: true,
  })
  reservationExpiry?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
