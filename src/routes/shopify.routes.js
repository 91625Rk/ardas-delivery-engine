import express from "express";
import { getShippingRates } from "../controllers/shopify.controller.js";

const router = express.Router();

router.post(
    "/shipping/rates",
    getShippingRates
);

export default router;