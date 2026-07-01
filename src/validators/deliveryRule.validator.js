export const validateDeliveryRule = (req, res, next) => {

    const { city, charge, days, installation } = req.body;

    if (!city) {
        return res.status(400).json({
            success: false,
            message: "City is required"
        });
    }

    if (typeof charge !== "number") {
        return res.status(400).json({
            success: false,
            message: "Charge must be a number"
        });
    }

    if (typeof days !== "number") {
        return res.status(400).json({
            success: false,
            message: "Days must be a number"
        });
    }

    if (typeof installation !== "boolean") {
        return res.status(400).json({
            success: false,
            message: "Installation must be true or false"
        });
    }

    next();
};