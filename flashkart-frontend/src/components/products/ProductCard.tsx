import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";

import type { Product } from "../../types/product.types";

interface Props {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: Props) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>

        <Typography variant="body2">{product.description}</Typography>

        <Typography color="primary">₹ {product.price}</Typography>

        <Typography>Stock : {product.stock}</Typography>
      </CardContent>

      <CardActions>
        <Button
          variant="contained"
          fullWidth
          onClick={() => onAddToCart(product)}
        >
          Add To Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
