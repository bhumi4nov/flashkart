import { AppDataSource } from "../config/database";
import { Order } from "../entities/Orders";

export const OrderRepository = AppDataSource.getRepository(Order);
