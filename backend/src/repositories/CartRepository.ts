import { AppDataSource } from "../config/database";
import { Cart } from "../entities/Cart";

export const CartRepository = AppDataSource.getRepository(Cart);
