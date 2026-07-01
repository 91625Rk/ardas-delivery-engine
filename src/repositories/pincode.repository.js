import Pincode from "../models/Pincode.model.js";

export const findPincode = async (pincode) => {
    return await Pincode.findOne({ pincode }).lean();
};

export const getAllPincodes = async () => {
    return await Pincode.find().sort({ pincode: 1 }).lean();
};

export const createPincode = async (data) => {
    return await Pincode.create(data);
};

export const updatePincode = async (id, data) => {
    return await Pincode.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true
        }
    );
};

export const deletePincode = async (id) => {
    return await Pincode.findByIdAndDelete(id);
};