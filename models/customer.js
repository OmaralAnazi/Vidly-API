const Joi = require("joi");
const mongoose = require("mongoose");

const Customer = mongoose.model("Customer", mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true,
        lowercase: true,
        trim: true,
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true,
        trim: true, 
    }
}));

const joiCustomerSchema = Joi.object({
    name: Joi.string().min(3).max(50).trim().required(),
    isGold: Joi.boolean(),
    phone: Joi.string().min(3).max(50).trim().required()
});

module.exports.Customer = Customer;
module.exports.joiCustomerSchema = joiCustomerSchema;