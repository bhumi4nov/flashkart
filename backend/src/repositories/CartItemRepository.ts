import { AppDataSource } from "../config/database";
import { CartItem } from "../entities/CartItem";

export const CartItemRepository = AppDataSource.getRepository(CartItem);
