import { Response } from "express";
import { AuthRequest } from "../types/AuthRequest";
import { ReservationService } from "../services/ReservationService";

export class ReservationController {
  static async reserveStock(req: AuthRequest, res: Response) {
    try {
      const result = await ReservationService.reserveStock(
        req.userId!,
        req.params.productId as string
      );

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({
        message: (error as Error).message,
      });
    }
  }
}
