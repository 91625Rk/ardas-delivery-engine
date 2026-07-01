import { getCity } from "../engines/pincode.engine.js";
import { getRule } from "../engines/rule.engine.js";

export const checkDeliveryService = (pincode) => {

    const city = getCity(pincode);

    if (!city) {
        return {
            success: false,
            message: "Invalid Pincode"
        };
    }

    const rule = getRule(city);

    if (!rule) {
        return {
            success: false,
            message: "Delivery not available"
        };
    }

    return {
        success: true,
        pincode,
        city,
        ...rule
    };
};