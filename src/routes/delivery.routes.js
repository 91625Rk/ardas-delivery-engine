import express from "express";

import { checkDelivery } from "../controllers/delivery.controller.js";

import { validatePincode } from "../validators/delivery.validator.js";

const router = express.Router();

router.post("/check-delivery",validatePincode, checkDelivery);

export default router;