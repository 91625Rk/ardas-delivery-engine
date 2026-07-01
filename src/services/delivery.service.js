import { findPincode } from "../repositories/pincode.repository.js";
import { findRule } from "../repositories/deliveryRule.repository.js";
import {
    successResponse,
    errorResponse
} from "../engines/response.engine.js";

export const checkDeliveryService = async (pincode) => {

    const location = await findPincode(pincode);

    if (!location) {
        return errorResponse("Invalid Pincode");
    }

    const rule = await findRule(location.city);

    if (!rule) {
        return errorResponse("Delivery not available");
    }

    return successResponse({
        pincode: location.pincode,
        city: location.city,
        state: location.state,
        charge: rule.charge,
        days: rule.days,
        installation: rule.installation
    });

};