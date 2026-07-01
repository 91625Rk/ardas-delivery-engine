import { findPincode } from "../repositories/pincode.repository.js";
import { findRule } from "../repositories/deliveryRule.repository.js";

export const getShippingRatesService = async (postalCode) => {

    const location = await findPincode(postalCode);

    if (!location) {
        return {
            rates: []
        };
    }

    const rule = await findRule(location.city);

    if (!rule) {
        return {
            rates: []
        };
    }

    return {
        rates: [
            {
                service_name: "Ardas Standard Delivery",
                service_code: "ARDAS_STANDARD",
                total_price: rule.charge * 100,
                currency: "INR",
                description: `${rule.days} Day Delivery`
            }
        ]
    };
};