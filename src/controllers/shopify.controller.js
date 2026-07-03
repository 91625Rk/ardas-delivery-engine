import { getShippingRatesService } from "../services/shopify.service.js";

export const getShippingRates = async (req, res) => {
  try {
    console.log("SHOPIFY BODY:", JSON.stringify(req.body, null, 2));

    const postalCode = req.body?.rate?.destination?.postal_code;

    console.log("POSTAL CODE:", postalCode);

    if (!postalCode) {
      return res.status(200).json({
        rates: [
          {
            service_name: "Ardas Fallback Delivery",
            service_code: "ARDAS_NO_PINCODE",
            total_price: "500000",
            currency: "INR",
            description: "Pincode missing fallback"
          }
        ]
      });
    }

    const response = await getShippingRatesService(postalCode);

    console.log("FINAL SHOPIFY RESPONSE:", JSON.stringify(response, null, 2));

    return res.status(200).json(response);
  } catch (error) {
    console.error("SHOPIFY SHIPPING ERROR:", error);

    return res.status(200).json({
      rates: [
        {
          service_name: "Ardas Fallback Delivery",
          service_code: "ARDAS_ERROR",
          total_price: "500000",
          currency: "INR",
          description: "Delivery fallback due to server error"
        }
      ]
    });
  }
};