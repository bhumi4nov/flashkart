import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/product.service";

export const useProducts = (
  page: number,
  limit: number,
  search: string,
  sort: string
) => {
  return useQuery({
    queryKey: ["products", page, limit, search, sort],
    queryFn: () => getProducts(page, limit, search, sort),
    staleTime: 1000 * 60 * 5,
  });
};
