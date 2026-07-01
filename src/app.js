import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import deliveryRoutes from "./routes/delivery.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
import notFound from "./middleware/notFound.middleware.js";
import adminRoutes from "./routes/admin.routes.js";


const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
//routes

app.use("/api", deliveryRoutes);
app.use("/api/admin", adminRoutes);
// Health Route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Ardas Delivery Engine Running",
    version: "1.0.0",
    timestamp: new Date()
  });
});
// 404 Middleware
app.use(notFound);

// Error Middleware
app.use(errorMiddleware);

export default app;