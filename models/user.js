const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true,
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"]
    },
    password: {
        type: String,
        minlength: 3,
        maxlength: 1024, // longer because it will store a hash value
        required: true,
        trim: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.JWT_KEY);
};

const User = mongoose.model("User", userSchema);

const joiUserSchema = Joi.object({
    name: Joi.string().min(3).max(50).trim().required(),
    email: Joi.string().email().trim().required(),
    password: passwordComplexity({
        min: 6,
        max: 50,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 2,
      }).required().required()
});

const joiAuthschema = Joi.object({
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(6).max(50).trim().required()
});

module.exports.User = User;
module.exports.joiUserSchema = joiUserSchema;
module.exports.joiAuthschema = joiAuthschema;