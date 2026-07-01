import express from "express";

import { checkDelivery } from "../controllers/delivery.controller.js";

import { validateDeliveryRequest } from "../validators/delivery.validator.js";

const router = express.Router();    

router.post(
    "/check-delivery",
    validateDeliveryRequest,
    checkDelivery
);

export default router;