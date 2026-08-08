import { useMutation } from "@tanstack/react-query";
import { checkout } from "../services/order.service";

export const useCheckout = () =>
  useMutation({
    mutationFn: checkout,
  });
