import { checkDeliveryService } from "../services/delivery.service.js";

export const checkDelivery = async (req, res, next) => {
    try {
        const { pincode } = req.body;

        const result = await checkDeliveryService(pincode);

        res.status(200).json(result);

    } catch (error) {
        next(error);
    }
};