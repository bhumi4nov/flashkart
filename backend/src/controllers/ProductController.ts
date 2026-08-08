import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";
import { validationResult } from "express-validator";

export class ProductController {
  static async create(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    try {
      const product = await ProductService.create(req.body);

      return res.status(201).json({
        message: "Product Created",
        data: product,
      });
    } catch (error) {
      return res.status(500).json({
        message: (error as Error).message,
      });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const search = req.query.search as string;

      const sort = (req.query.sort as string) || "createdAt";

      const order = (req.query.order as "ASC" | "DESC") || "DESC";

      const products = await ProductService.getAll(
        page,
        limit,
        search,
        sort,
        order
      );

      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({
        message: (error as Error).message,
      });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const product = await ProductService.getById(req.params.id as string);

      return res.status(200).json({
        data: product,
      });
    } catch (error) {
      return res.status(404).json({
        message: (error as Error).message,
      });
    }
  }

  static async update(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    try {
      const product = await ProductService.update(
        req.params.id as string,
        req.body
      );

      return res.status(200).json({
        message: "Product Updated Successfully",
        data: product,
      });
    } catch (error) {
      return res.status(404).json({
        message: (error as Error).message,
      });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await ProductService.delete(req.params.id as string);

      return res.status(200).json({
        message: "Product Deleted Successfully",
      });
    } catch (error) {
      return res.status(404).json({
        message: (error as Error).message,
      });
    }
  }
}
