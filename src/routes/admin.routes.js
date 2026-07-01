import express from "express";

import {
    getRules,
    createRule,
    updateRule,
    deleteRule,
    getPincodes,
    createPincode,
    updatePincode,
    deletePincode
} from "../controllers/admin.controller.js";

import { validateDeliveryRule } from "../validators/deliveryRule.validator.js";
import { validatePincode } from "../validators/pincode.validator.js";

const router = express.Router();

router.get("/delivery-rules", getRules);

router.post("/delivery-rules", validateDeliveryRule, createRule);

router.put("/delivery-rules/:id", validateDeliveryRule, updateRule);

router.delete("/delivery-rules/:id", deleteRule);

router.get("/pincodes", getPincodes);

router.post("/pincodes", validatePincode, createPincode);

router.put("/pincodes/:id", validatePincode, updatePincode);

router.delete("/pincodes/:id", deletePincode);

export default router;