import pincodes from "../data/pincodes.js";

export const getCity = (pincode) => {
    return pincodes[pincode] || null;
};