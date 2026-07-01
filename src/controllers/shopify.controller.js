import { getShippingRatesService } from "../services/shopify.service.js";

export const getShippingRates = async (req, res, next) => {

    try {

        const postalCode =
            req.body.rate.destination.postal_code;

        const response =
            await getShippingRatesService(postalCode);

        res.status(200).json(response);

    } catch (err) {
        next(err);
    }

};