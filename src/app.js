import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import deliveryRoutes from "./routes/delivery.routes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/api", deliveryRoutes);

// Health Route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Ardas Delivery Engine Running",
    version: "1.0.0",
    timestamp: new Date()
  });
});

export default app;