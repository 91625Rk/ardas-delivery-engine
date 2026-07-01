export const validatePincode = (req, res, next) => {

    const { pincode } = req.body;

    if (!pincode) {

        return res.status(400).json({

            success:false,

            message:"Pincode is required"

        });

    }

    if (!/^\d{6}$/.test(pincode)) {

        return res.status(400).json({

            success:false,

            message:"Invalid Pincode Format"

        });

    }

    next();

}