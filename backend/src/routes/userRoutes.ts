import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authenticate } from "../middleware/authMiddleware";

import {
  registerValidation,
  loginValidation,
} from "../middleware/userValidation";
import { validate } from "../middleware/validationMiddleware";

const router = Router();

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Abhishek Kumar
 *               email:
 *                 type: string
 *                 example: abhishek@gmail.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */

router.post("/register", registerValidation, validate, UserController.register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: abhishek@gmail.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */

router.post("/login", loginValidation, validate, UserController.login);

router.get("/profile", authenticate, (req, res) => {
  res.json({
    message: "Protected Route",
    userId: (req as any).userId,
  });
});

export default router;
