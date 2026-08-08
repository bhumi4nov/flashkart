import { AppDataSource } from "../config/database";
import { Product } from "../entities/Product";

export const ProductRepository = AppDataSource.getRepository(Product);
