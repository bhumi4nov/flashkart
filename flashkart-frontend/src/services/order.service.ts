import api from "../api/axios";

export const checkout = async (reservationId: string) => {
  const { data } = await api.post(
    "/orders/checkout",
    {
      reservationId,
    },
    {
      headers: {
        "Idempotency-Key": crypto.randomUUID(),
      },
    }
  );

  return data;
};

export const getOrders = async () => {
  const { data } = await api.get("/orders");

  return data;
};

export const getOrderById = async (id: string) => {
  const { data } = await api.get(`/orders/${id}`);

  return data;
};
