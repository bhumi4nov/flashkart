import { CartRepository } from "../repositories/CartRepository";
import { CartItemRepository } from "../repositories/CartItemRepository";
import { ProductRepository } from "../repositories/ProductRepository";
import { UserRepository } from "../repositories/UserRepository";

export class CartService {
  static async addToCart(userId: string, productId: string, quantity: number) {
    // 1. Find User
    const user = await UserRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // 2. Find Product
    const product = await ProductRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    // 3. Check Stock
    if (product.stock < quantity) {
      throw new Error("Insufficient stock");
    }

    // 4. Find Active Cart
    let cart = await CartRepository.findOne({
      where: {
        user: { id: userId },
        isActive: true,
      },
      relations: {
        items: true,
      },
    });

    // 5. Create Cart if not exists
    if (!cart) {
      cart = CartRepository.create({
        user,
        isActive: true,
      });

      cart = await CartRepository.save(cart);
    }

    // 6. Check if product already exists in cart
    const existingItem = await CartItemRepository.findOne({
      where: {
        cart: { id: cart.id },
        product: { id: productId },
      },
    });

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;

      if (newQuantity > product.stock) {
        throw new Error("Insufficient stock");
      }

      existingItem.quantity = newQuantity;

      await CartItemRepository.save(existingItem);

      return existingItem;
    }

    // 7. Create New Cart Item
    const cartItem = CartItemRepository.create({
      cart,
      product,
      quantity,
      price: Number(product.price),
    });

    await CartItemRepository.save(cartItem);

    return cartItem;
  }

  static async getCart(userId: string) {
    const cart = await CartRepository.findOne({
      where: {
        user: {
          id: userId,
        },
        isActive: true,
      },
      relations: {
        items: {
          product: true,
        },
      },
    });

    if (!cart) {
      throw new Error("Cart not found");
    }

    const totalAmount = cart.items.reduce(
      (total, item) => total + Number(item.price) * item.quantity,
      0
    );

    return {
      cart,
      totalAmount,
    };
  }

  static async updateQuantity(itemId: string, quantity: number) {
    const cartItem = await CartItemRepository.findOne({
      where: {
        id: itemId,
      },
      relations: {
        product: true,
      },
    });

    if (!cartItem) {
      throw new Error("Cart item not found");
    }

    if (quantity > cartItem.product.stock) {
      throw new Error("Insufficient stock");
    }

    cartItem.quantity = quantity;

    await CartItemRepository.save(cartItem);

    return cartItem;
  }

  static async removeItem(itemId: string) {
    const cartItem = await CartItemRepository.findOne({
      where: {
        id: itemId,
      },
    });

    if (!cartItem) {
      throw new Error("Cart item not found");
    }

    await CartItemRepository.remove(cartItem);

    return {
      message: "Item removed successfully",
    };
  }

  static async clearCart(userId: string) {
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

    if (!cart) {
      throw new Error("Cart not found");
    }

    await CartItemRepository.remove(cart.items);

    return {
      message: "Cart cleared successfully",
    };
  }
}
