import { getShippingRatesService } from "../services/shopify.service.js";

export const getShippingRates = async (req, res) => {
  try {
    console.log("SHOPIFY RATE REQUEST:");
    console.log(JSON.stringify(req.body, null, 2));

    const postalCode = req.body?.rate?.destination?.postal_code;

    if (!postalCode) {
      return res.status(200).json({
        rates: [
          {
            service_name: "Fallback Furniture Delivery",
            service_code: "ARDAS_FALLBACK",
            total_price: "1000000",
            currency: "INR",
            description: "Pincode missing. Delivery charge will be confirmed by our team."
          }
        ]
      });
    }

    const response = await getShippingRatesService(postalCode);

    console.log("SHOPIFY RATE RESPONSE:");
    console.log(JSON.stringify(response, null, 2));

    return res.status(200).json(response);
  } catch (err) {
    console.error("SHOPIFY SHIPPING ERROR:", err);

    return res.status(200).json({
      rates: [
        {
          service_name: "Fallback Furniture Delivery",
          service_code: "ARDAS_ERROR_FALLBACK",
          total_price: "1000000",
          currency: "INR",
          description: "Delivery charge will be confirmed by our team."
        }
      ]
    });
  }
};