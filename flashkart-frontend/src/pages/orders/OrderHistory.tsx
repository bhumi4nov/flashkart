import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Chip,
  Stack,
} from "@mui/material";

import { useOrders } from "../../hooks/useOrders";

interface Order {
  id: string;
  totalAmount: number | string;
  status: string;
  createdAt: string;
  updatedAt?: string;
}

const OrderHistory = () => {
  const { data, isLoading, isError } = useOrders();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Alert severity="error">Failed to load orders</Alert>;
  }

  const orders = data?.orders ?? [];

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        My Orders
      </Typography>

      {orders.length === 0 ? (
        <Alert severity="info">No orders found.</Alert>
      ) : (
        orders.map((order: Order) => (
          <Card key={order.id} sx={{ mb: 2 }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h6">
                  Order #{order.id.slice(0, 8)}
                </Typography>

                <Chip
                  label={order.status}
                  color={order.status === "SUCCESS" ? "success" : "warning"}
                />
              </Stack>

              <Typography sx={{ mt: 2 }}>
                Total : ₹{order.totalAmount}
              </Typography>

              <Typography>
                {new Date(order.createdAt).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
};

export default OrderHistory;
