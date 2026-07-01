import { checkDeliveryService } from "../services/delivery.service.js";

export const checkDelivery = (req, res) => {
    console.log(req.body);
    const { pincode } = req.body;

    const result = checkDeliveryService(pincode);

    res.status(200).json(result);

};
