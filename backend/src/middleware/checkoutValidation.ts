import { body, header } from "express-validator";

export const checkoutValidation = [
  body("reservationId").notEmpty().withMessage("Reservation ID is required"),

  header("Idempotency-Key")
    .notEmpty()
    .withMessage("Idempotency-Key header is required"),
];
