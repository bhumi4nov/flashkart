import api from "../api/axios";
import type { ProductResponse } from "../types/product.types";

export const getProducts = async (
  page = 1,
  limit = 10,
  search = "",
  sort = ""
): Promise<ProductResponse> => {
  const response = await api.get("/products", {
    params: {
      page,
      limit,
      search,
      sort,
    },
  });

  return response.data;
};
