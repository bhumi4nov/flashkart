import api from "../api/axios";

export interface ReservationResponse {
  success: boolean;
  message: string;
  reservationId: string;
  productId: string;
  expiresIn: number;
}

export const reserveProduct = async (
  productId: string
): Promise<ReservationResponse> => {
  const { data } = await api.post(`/reservation/reserve/${productId}`);

  return data;
};
