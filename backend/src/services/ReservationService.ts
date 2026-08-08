import { v4 as uuidv4 } from "uuid";
import redis from "../redis/redis";
import { ProductRepository } from "../repositories/ProductRepository";

export class ReservationService {
  static async reserveStock(userId: string, productId: string) {
    // Find Product
    const product = await ProductRepository.findOne({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    // Check Available Stock
    const availableStock = product.stock - product.reservedStock;

    if (availableStock <= 0) {
      throw new Error("Product out of stock");
    }

    // Create Reservation
    const reservationId = uuidv4();

    const reservation = {
      reservationId,
      userId,
      productId,
      quantity: 1,
      createdAt: new Date().toISOString(),
    };

    await redis.set(
      `reservation:${reservationId}`,
      JSON.stringify(reservation),
      "EX",
      900
    );

    // Increase Reserved Stock
    product.reservedStock += 1;

    await ProductRepository.save(product);

    return {
      success: true,
      message: "Stock reserved successfully",
      reservationId,
      productId,
      expiresIn: 900,
    };
  }

  static async getReservation(reservationId: string) {
    const data = await redis.get(`reservation:${reservationId}`);

    if (!data) {
      throw new Error("Reservation expired");
    }

    return JSON.parse(data);
  }

  static async removeReservation(reservationId: string) {
    await redis.del(`reservation:${reservationId}`);
  }
}
