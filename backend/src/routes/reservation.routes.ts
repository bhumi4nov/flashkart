import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware";
import { ReservationController } from "../controllers/ReservationController";

const router = Router();

/**
 * @swagger
 * /api/reservation/reserve/{productId}:
 *   post:
 *     summary: Reserve product stock
 *     tags:
 *       - Reservation
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Stock reserved successfully
 *       400:
 *         description: Product out of stock
 */

router.post(
  "/reserve/:productId",
  authenticate,
  ReservationController.reserveStock
);

export default router;
