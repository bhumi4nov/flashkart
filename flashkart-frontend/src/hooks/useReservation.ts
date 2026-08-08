import { useMutation } from "@tanstack/react-query";
import { reserveProduct } from "../services/reservation.service";

export const useReservation = () =>
  useMutation({
    mutationFn: reserveProduct,
  });
