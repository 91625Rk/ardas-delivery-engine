import DeliveryRule from "../models/DeliveryRule.model.js";

export const findRule = async (city) => {
    return await DeliveryRule.findOne({ city }).lean();
};

export const getAllRules = async () => {
    return await DeliveryRule.find().sort({ city: 1 }).lean();
};

export const createRule = async (data) => {
    return await DeliveryRule.create(data);
};

export const updateRule = async (id, data) => {
    return await DeliveryRule.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true
        }
    );
};

export const deleteRule = async (id) => {
    return await DeliveryRule.findByIdAndDelete(id);
};