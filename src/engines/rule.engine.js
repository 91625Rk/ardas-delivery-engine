import deliveryRules from "../data/deliveryRules.js";

export const getRule = (city) => {
    return deliveryRules[city] || null;
}