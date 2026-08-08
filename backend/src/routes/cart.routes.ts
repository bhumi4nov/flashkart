import { Router } from "express";
import { CartController } from "../controllers/CartController";
import { authenticate } from "../middleware/authMiddleware";

import {
  addToCartValidation,
  updateCartValidation,
  removeCartValidation,
} from "../middleware/cartValidation";

import { validate } from "../middleware/validationMiddleware";

const router = Router();

/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: Add product to cart
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Product added to cart
 */

router.post(
  "/add",
  authenticate,
  addToCartValidation,
  validate,
  CartController.addToCart
);

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get logged in user's cart
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
 */

router.get("/", authenticate, CartController.getCart);

/**
 * @swagger
 * /api/cart/item/{itemId}:
 *   put:
 *     summary: Update cart item quantity
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Cart updated successfully
 */

router.put(
  "/item/:itemId",
  authenticate,
  updateCartValidation,
  validate,
  CartController.updateQuantity
);

/**
 * @swagger
 * /api/cart/item/{itemId}:
 *   delete:
 *     summary: Remove item from cart
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item removed successfully
 */

router.delete(
  "/item/:itemId",
  authenticate,
  removeCartValidation,
  validate,
  CartController.removeItem
);

/**
 * @swagger
 * /api/cart/clear:
 *   delete:
 *     summary: Clear user's cart
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 */

router.delete("/clear", authenticate, CartController.clearCart);

export default router;
