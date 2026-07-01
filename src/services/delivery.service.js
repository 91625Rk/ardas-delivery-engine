import { getCity } from "../engines/pincode.engine.js";
import { getRule } from "../engines/rule.engine.js";
import { calculatePricing } from "../engines/pricing.engine.js";
import {
    successResponse,
    errorResponse
} from "../engines/response.engine.js";

export const checkDeliveryService = (pincode) => {

    const location = getCity(pincode);

    if (!location) {
        return errorResponse("Invalid Pincode");
    }

    const rule = getRule(location.city);

    if (!rule) {
        return errorResponse("Delivery not available");
    }

    const pricing = calculatePricing(rule);

    return successResponse({
        pincode,
        city: location.city,
        state: location.state,
        ...pricing
    });
};