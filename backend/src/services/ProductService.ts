import { Product } from "../entities/Product";
import { ProductRepository } from "../repositories/ProductRepository";

export class ProductService {
  static async create(data: Partial<Product>) {
    const product = ProductRepository.create(data);

    return await ProductRepository.save(product);
  }

  static async getAll(
    page: number,
    limit: number,
    search?: string,
    sort: string = "createdAt",
    order: "ASC" | "DESC" = "DESC"
  ) {
    const queryBuilder = ProductRepository.createQueryBuilder("product");

    if (search) {
      queryBuilder.where("LOWER(product.name) LIKE LOWER(:search)", {
        search: `%${search}%`,
      });
    }

    queryBuilder
      .orderBy(`product.${sort}`, order)
      .skip((page - 1) * limit)
      .take(limit);

    const [products, total] = await queryBuilder.getManyAndCount();

    return {
      products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  static async getById(id: string) {
    const product = await ProductRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  }

  static async update(id: string, data: Partial<Product>) {
    const product = await this.getById(id);

    ProductRepository.merge(product, data);

    return await ProductRepository.save(product);
  }

  static async delete(id: string) {
    return await ProductRepository.delete(id);
  }
}
