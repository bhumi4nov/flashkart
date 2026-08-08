import { AppDataSource } from "../config/database";
import redis from "../redis/redis";
import { UserRepository } from "../repositories/UserRepository";
import { OrderRepository } from "../repositories/OrderRepository";
import { Order } from "../entities/Orders";
import { ReservationService } from "./ReservationService";
import { Product } from "../entities/Product";
import { CartRepository } from "../repositories/CartRepository";
import { CartItemRepository } from "../repositories/CartItemRepository";

export class OrderService {
  static async checkout(
    userId: string,
    reservationId: string,
    idempotencyKey: string
  ) {
    // 1. Check Idempotency
    const existing = await redis.get(`idempotency:${idempotencyKey}`);

    if (existing) {
      return JSON.parse(existing);
    }

    // 2. Check Reservation
    const reservationData =
      await ReservationService.getReservation(reservationId);

    // 3. Validate Reservation Owner
    if (reservationData.userId !== userId) {
      throw new Error("Invalid reservation");
    }

    // 4. Find User
    const user = await UserRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 5. Find Product With Row Lock
      const product = await queryRunner.manager.findOne(Product, {
        where: {
          id: reservationData.productId,
        },
        lock: {
          mode: "pessimistic_write",
        },
      });

      if (!product) {
        throw new Error("Product not found");
      }

      // 6. Validate Stock
      if (product.stock <= 0) {
        throw new Error("Product out of stock");
      }

      if (product.reservedStock <= 0) {
        throw new Error("Reserved stock not available");
      }

      // 7. Create Order
      const order = new Order();

      order.user = user;
      order.totalAmount = Number(product.price);
      order.status = "SUCCESS";

      const savedOrder = await queryRunner.manager.save(order);

      // 8. Update Inventory
      product.stock--;
      product.reservedStock--;

      await queryRunner.manager.save(product);

      // 9. Commit Transaction
      await queryRunner.commitTransaction();

      // Clear Active Cart
      const cart = await CartRepository.findOne({
        where: {
          user: {
            id: userId,
          },
          isActive: true,
        },
        relations: {
          items: true,
        },
      });

      if (cart && cart.items.length > 0) {
        await CartItemRepository.remove(cart.items);
      }

      // 10. Remove Reservation
      await ReservationService.removeReservation(reservationId);

      // 11. Save Response for Idempotency
      const response = {
        success: true,
        message: "Order placed successfully",
        data: {
          order: savedOrder,
        },
      };
      await redis.set(
        `idempotency:${idempotencyKey}`,
        JSON.stringify(response),
        "EX",
        3600
      );

      return response;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error("Checkout Error:", error);

      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  static async getOrders(userId: string, page: number = 1, limit: number = 10) {
    const [orders, total] = await OrderRepository.findAndCount({
      where: {
        user: {
          id: userId,
        },
      },

      order: {
        createdAt: "DESC",
      },

      skip: (page - 1) * limit,

      take: limit,
    });

    return {
      total,

      page,

      totalPages: Math.ceil(total / limit),

      orders,
    };
  }

  static async getOrderById(userId: string, orderId: string) {
    const order = await OrderRepository.findOne({
      where: {
        id: orderId,

        user: {
          id: userId,
        },
      },
    });

    if (!order) {
      throw new Error("Order not found");
    }

    return order;
  }
}
