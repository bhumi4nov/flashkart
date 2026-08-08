import {
  Container,
  Typography,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";

import { useState } from "react";
import toast from "react-hot-toast";

import { useReservation } from "../../hooks/useReservation";
import { useCheckout } from "../../hooks/useCheckout";

const Checkout = () => {
  const [reservationId] = useState("");

  const reserveMutation = useReservation();
  const checkoutMutation = useCheckout();

  const handleReserve = () => {
    toast.error("Reservation integration pending");
  };

  const handleCheckout = () => {
    if (!reservationId) {
      toast.error("Reserve product first");
      return;
    }

    checkoutMutation.mutate(reservationId, {
      onSuccess: () => {
        toast.success("Order placed successfully");
      },

      onError: () => {
        toast.error("Checkout failed");
      },
    });
  };

  if (reserveMutation.isPending || checkoutMutation.isPending) {
    return <CircularProgress />;
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      <Alert severity="info">
        This page will complete the reservation and checkout flow.
      </Alert>

      <Button
        variant="contained"
        color="warning"
        sx={{ mt: 3, mr: 2 }}
        onClick={handleReserve}
      >
        Reserve Product
      </Button>

      <Button
        variant="contained"
        color="success"
        sx={{ mt: 3 }}
        onClick={handleCheckout}
      >
        Checkout
      </Button>
    </Container>
  );
};

export default Checkout;
