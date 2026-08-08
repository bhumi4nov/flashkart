import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { CartService } from "../services/CartService";

export class CartController {
  static async addToCart(req: AuthRequest, res: Response) {
    try {
      const { productId, quantity } = req.body;

      const cart = await CartService.addToCart(
        req.userId!,
        productId,
        quantity
      );

      return res.status(201).json({
        message: "Product added to cart successfully",
        data: cart,
      });
    } catch (error) {
      return res.status(400).json({
        message: (error as Error).message,
      });
    }
  }

  static async getCart(req: AuthRequest, res: Response) {
    try {
      const cart = await CartService.getCart(req.userId!);

      return res.status(200).json({
        data: cart,
      });
    } catch (error) {
      return res.status(404).json({
        message: (error as Error).message,
      });
    }
  }

  static async updateQuantity(req: AuthRequest, res: Response) {
    try {
      const { quantity } = req.body;

      const cartItem = await CartService.updateQuantity(
        req.params.itemId as string,
        quantity
      );

      return res.status(200).json({
        message: "Cart updated successfully",
        data: cartItem,
      });
    } catch (error) {
      return res.status(400).json({
        message: (error as Error).message,
      });
    }
  }

  static async removeItem(req: AuthRequest, res: Response) {
    try {
      const result = await CartService.removeItem(req.params.itemId as string);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).json({
        message: (error as Error).message,
      });
    }
  }

  static async clearCart(req: AuthRequest, res: Response) {
    try {
      const result = await CartService.clearCart(req.userId!);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).json({
        message: (error as Error).message,
      });
    }
  }
}
