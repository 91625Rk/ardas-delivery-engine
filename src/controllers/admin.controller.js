import {
    getRulesService,
    createRuleService,
    updateRuleService,
    deleteRuleService,
    getPincodesService,
    createPincodeService,
    updatePincodeService,
    deletePincodeService
} from "../services/admin.service.js";


// ===============================
// DELIVERY RULES
// ===============================

export const getRules = async (req, res, next) => {
    try {
        const rules = await getRulesService();

        res.json({
            success: true,
            data: rules
        });

    } catch (err) {
        next(err);
    }
};

export const createRule = async (req, res, next) => {
    try {

        const rule = await createRuleService(req.body);

        res.status(201).json({
            success: true,
            data: rule
        });

    } catch (err) {
        next(err);
    }
};

export const updateRule = async (req, res, next) => {
    try {

        console.log("ID:", req.params.id);
        console.log("BODY:", req.body);

        const rule = await updateRuleService(
            req.params.id,
            req.body
        );

        console.log("UPDATED:", rule);

        res.json({
            success: true,
            data: rule
        });

    } catch (err) {
        next(err);
    }
};

export const deleteRule = async (req, res, next) => {
    try {

        await deleteRuleService(req.params.id);

        res.json({
            success: true,
            message: "Rule deleted successfully"
        });

    } catch (err) {
        next(err);
    }
};


// ===============================
// PINCODES
// ===============================

export const getPincodes = async (req, res, next) => {
    try {

        const pincodes = await getPincodesService();

        res.json({
            success: true,
            data: pincodes
        });

    } catch (err) {
        next(err);
    }
};

export const createPincode = async (req, res, next) => {
    try {

        const pincode = await createPincodeService(req.body);

        res.status(201).json({
            success: true,
            data: pincode
        });

    } catch (err) {
        next(err);
    }
};

export const updatePincode = async (req, res, next) => {
    try {

        const pincode = await updatePincodeService(
            req.params.id,
            req.body
        );

        res.json({
            success: true,
            data: pincode
        });

    } catch (err) {
        next(err);
    }
};

export const deletePincode = async (req, res, next) => {
    try {

        await deletePincodeService(req.params.id);

        res.json({
            success: true,
            message: "Pincode deleted successfully"
        });

    } catch (err) {
        next(err);
    }
};