import express from "express";
import { getShippingRates } from "../controllers/shopify.controller.js";

const router = express.Router();

router.post("/shipping/rates", getShippingRates);

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Shopify Route Working"
  });
});

export default router;