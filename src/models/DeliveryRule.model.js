import mongoose from "mongoose";

const deliveryRuleSchema = new mongoose.Schema({

    city: {
        type: String,
        required: true,
        unique: true
    },

    charge: {
        type: Number,
        required: true
    },

    days: {
        type: Number,
        required: true
    },

    installation: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
});

export default mongoose.model("DeliveryRule", deliveryRuleSchema);