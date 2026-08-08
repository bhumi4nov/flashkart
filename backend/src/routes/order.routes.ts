import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware";
import { OrderController } from "../controllers/OrderController";

import { checkoutValidation } from "../middleware/checkoutValidation";
import { validate } from "../middleware/validationMiddleware";

const router = Router();

/**
 * @swagger
 * /api/orders/checkout:
 *   post:
 *     summary: Checkout reserved products
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Idempotency-Key
 *         required: true
 *         schema:
 *           type: string
 *         example: 550e8400-e29b-41d4-a716-446655440000
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reservationId
 *             properties:
 *               reservationId:
 *                 type: string
 *                 example: 550e8400-e29b-41d4-a716-446655440001
 *     responses:
 *       200:
 *         description: Order placed successfully
 *       400:
 *         description: Reservation expired
 */

// Checkout
router.post(
  "/checkout",
  authenticate,
  checkoutValidation,
  validate,
  OrderController.checkout
);
/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get user order history
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Order history
 */

// Get all orders
router.get("/", authenticate, OrderController.getOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details
 *       404:
 *         description: Order not found
 */

// Get order by id
router.get("/:id", authenticate, OrderController.getOrderById);

export default router;
