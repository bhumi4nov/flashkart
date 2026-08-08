import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/AuthRequest";
import { OrderService } from "../services/OrderService";
import { asyncHandler } from "../utils/asyncHandler";

export class OrderController {
  static checkout = asyncHandler(
    async (req: AuthRequest, res: Response, next: NextFunction) => {
      const { reservationId } = req.body;

      const idempotencyKey = req.headers["idempotency-key"] as string;

      if (!idempotencyKey) {
        throw new Error("Idempotency-Key is required");
      }

      const result = await OrderService.checkout(
        req.userId!,
        reservationId,
        idempotencyKey
      );

      return res.status(200).json(result);
    }
  );

  static getOrders = asyncHandler(async (req: AuthRequest, res: Response) => {
    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const result = await OrderService.getOrders(req.userId!, page, limit);

    return res.status(200).json(result);
  });

  static getOrderById = asyncHandler(
    async (req: AuthRequest, res: Response) => {
      const orderId = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;

      const result = await OrderService.getOrderById(req.userId!, orderId);

      return res.status(200).json(result);
    }
  );
}
