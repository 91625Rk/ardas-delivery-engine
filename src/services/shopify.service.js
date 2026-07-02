import { findPincode } from "../repositories/pincode.repository.js";
import { findRule } from "../repositories/deliveryRule.repository.js";

const rupeesToShopifyAmount = (rupees) => {
  return String(Math.round(Number(rupees || 0) * 100));
};

export const getShippingRatesService = async (postalCode) => {
  const pincode = String(postalCode || "").trim();

  console.log("Checking pincode:", pincode);

  const location = await findPincode(pincode);

  if (!location) {
    console.log("Pincode not found in DB:", pincode);

    return {
      rates: [
        {
          service_name: "Manual Furniture Delivery",
          service_code: "ARDAS_MANUAL_DELIVERY",
          total_price: "1000000",
          currency: "INR",
          description: "Delivery charge for unsupported pincode"
        }
      ]
    };
  }

  console.log("Location found:", location);

  const rule = await findRule(location.city);

  if (!rule) {
    console.log("Delivery rule not found for city:", location.city);

    return {
      rates: [
        {
          service_name: "Manual Furniture Delivery",
          service_code: "ARDAS_CITY_MANUAL",
          total_price: "1000000",
          currency: "INR",
          description: "Delivery charge will be confirmed by team"
        }
      ]
    };
  }

  console.log("Delivery rule found:", rule);

  const charge = Number(rule.charge || 0);

  return {
    rates: [
      {
        service_name: "Ardas Standard Delivery",
        service_code: "ARDAS_STANDARD",
        total_price: rupeesToShopifyAmount(charge),
        currency: "INR",
        description: `${rule.days} Day Delivery`
      }
    ]
  };
};