import Pincode from "../models/Pincode.model.js";

export const findPincode = async (pincode) => {
    return await Pincode.findOne({ pincode }).lean();
};