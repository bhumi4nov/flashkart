import { Container, CircularProgress, Alert } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import ProductGrid from "../../components/products/ProductGrid";
import { useProducts } from "../../hooks/useProduct";
import { addToCart } from "../../services/cart.service";
import type { Product } from "../../types/product.types";

const ProductList = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useProducts(1, 10, "", "");

  const addCartMutation = useMutation({
    mutationFn: ({
      productId,
      quantity,
    }: {
      productId: string;
      quantity: number;
    }) => addToCart(productId, quantity),

    onSuccess: () => {
      toast.success("Product added to cart");

      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },

    onError: () => {
      toast.error("Unable to add product");
    },
  });

  const handleAddToCart = (product: Product) => {
    addCartMutation.mutate({
      productId: product.id,
      quantity: 1,
    });
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Alert severity="error">Failed to load products</Alert>;
  }

  return (
    <Container sx={{ mt: 4 }}>
      <ProductGrid
        products={data?.products ?? []}
        onAddToCart={handleAddToCart}
      />
    </Container>
  );
};

export default ProductList;
