import {
  Card,
  CardContent,
  Typography,
  Stack,
  IconButton,
  Button,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { removeCartItem, updateCartItem } from "../../services/cart.service";

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

interface Props {
  item: CartItemData;
}

const CartItem = ({ item }: Props) => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: ({ id, quantity }: { id: string; quantity: number }) =>
      updateCartItem(id, quantity),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

      toast.success("Cart updated");
    },

    onError: () => {
      toast.error("Unable to update quantity");
    },
  });

  const removeMutation = useMutation({
    mutationFn: removeCartItem,

    onSuccess: () => {
      toast.success("Item removed");

      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },

    onError: () => {
      toast.error("Unable to remove item");
    },
  });

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{item.product.name}</Typography>

        <Typography color="text.secondary">
          {item.product.description}
        </Typography>

        <Typography sx={{ mt: 1 }}>Price : ₹ {item.price}</Typography>

        <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
          <IconButton
            color="primary"
            disabled={item.quantity <= 1 || updateMutation.isPending}
            onClick={() =>
              updateMutation.mutate({
                id: item.id,
                quantity: item.quantity - 1,
              })
            }
          >
            <RemoveIcon />
          </IconButton>

          <Typography>{item.quantity}</Typography>

          <IconButton
            color="primary"
            disabled={updateMutation.isPending}
            onClick={() =>
              updateMutation.mutate({
                id: item.id,
                quantity: item.quantity + 1,
              })
            }
          >
            <AddIcon />
          </IconButton>
        </Stack>

        <Typography sx={{ mt: 2 }}>
          Subtotal : ₹ {Number(item.price) * item.quantity}
        </Typography>

        <Button
          sx={{ mt: 2 }}
          color="error"
          variant="outlined"
          disabled={removeMutation.isPending}
          onClick={() => removeMutation.mutate(item.id)}
        >
          Remove
        </Button>
      </CardContent>
    </Card>
  );
};

export default CartItem;
