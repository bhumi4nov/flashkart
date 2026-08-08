import express from "express";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/product.routes";
import cartRoutes from "./routes/cart.routes";
import reservationRoutes from "./routes/reservation.routes";
import orderRoutes from "./routes/order.routes";
import { errorHandler } from "./middleware/errorMiddleware";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/reservation", reservationRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);
export default app;
