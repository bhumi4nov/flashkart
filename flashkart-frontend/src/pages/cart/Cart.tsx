import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Divider,
  Box,
  Paper,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import CartItem from "../../components/cart/CartItem";
import { useCart } from "../../hooks/useCart";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number | string;
  stock: number;
}

interface CartItemData {
  id: string;
  quantity: number;
  price: number | string;
  product: Product;
}

const Cart = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useCart();

  if (isLoading) {
    return (
      <Container sx={{ mt: 5, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container sx={{ mt: 5 }}>
        <Alert severity="error">Failed to load cart</Alert>
      </Container>
    );
  }

  const cart = data?.data?.cart ?? data?.cart;

  const total = data?.data?.totalAmount ?? data?.totalAmount ?? 0;

  if (!cart || cart.items.length === 0) {
    return (
      <Container sx={{ mt: 5 }}>
        <Alert severity="info">Your cart is empty.</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Shopping Cart
      </Typography>

      {cart.items.map((item: CartItemData) => (
        <CartItem key={item.id} item={item} />
      ))}

      <Paper
        elevation={3}
        sx={{
          mt: 4,
          p: 3,
        }}
      >
        <Divider sx={{ mb: 2 }} />

        <Typography variant="h5" fontWeight="bold">
          Total : ₹ {Number(total).toLocaleString()}
        </Typography>

        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/checkout")}
          >
            Proceed To Checkout
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Cart;
