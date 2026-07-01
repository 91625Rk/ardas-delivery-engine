export const validatePincode = (req, res, next) => {

    const { pincode, city, state } = req.body;

    if (!/^\d{6}$/.test(pincode)) {
        return res.status(400).json({
            success: false,
            message: "Invalid Pincode"
        });
    }

    if (!city) {
        return res.status(400).json({
            success: false,
            message: "City is required"
        });
    }

    if (!state) {
        return res.status(400).json({
            success: false,
            message: "State is required"
        });
    }

    next();
};