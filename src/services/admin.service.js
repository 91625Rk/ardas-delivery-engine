import {
    getAllRules,
    createRule,
    updateRule,
    deleteRule
} from "../repositories/deliveryRule.repository.js";

import {
    getAllPincodes,
    createPincode,
    updatePincode,
    deletePincode
} from "../repositories/pincode.repository.js";


// ===============================
// DELIVERY RULE SERVICES
// ===============================

export const getRulesService = async () => {
    return await getAllRules();
};

export const createRuleService = async (data) => {
    return await createRule(data);
};

export const updateRuleService = async (id, data) => {
    return await updateRule(id, data);
};

export const deleteRuleService = async (id) => {
    return await deleteRule(id);
};


// ===============================
// PINCODE SERVICES
// ===============================

export const getPincodesService = async () => {
    return await getAllPincodes();
};

export const createPincodeService = async (data) => {
    return await createPincode(data);
};

export const updatePincodeService = async (id, data) => {
    return await updatePincode(id, data);
};

export const deletePincodeService = async (id) => {
    return await deletePincode(id);
};