const mongoose = require("mongoose");
const winston = require("winston");
const jwt = require("jsonwebtoken");
const {User} = require("../models/user");

function validateObjectId(req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send("Invalid ID format.");
    next();
}

function validateSchema(schema) {
    return async (req, res, next) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (err) {
            winston.error("Validation error", err.message);
            res.status(400).send(`Invalid body format: ${err.message}`);
        }
    };
}

async function authenticate(req, res, next) {
    const token = req.header("x-auth-token");

    if (!token) return res.status(401).send("Access denied. No token provided.");

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findById(decoded._id);
        if (!user) return res.status(401).send("Access denied. User no longer exists.");
        req.decodedUser = user;
        next();
    } catch (err) {
        winston.error("Authentication error", err.message);
        res.status(400).send("Invalid token.");
    }
}

function authorize(req, res, next) {
    if(!req.decodedUser.isAdmin) return res.status(403).send("Access denied. You're not allowed to do this operation.");
    next();
}

module.exports.validateObjectId = validateObjectId;
module.exports.validateSchema = validateSchema;
module.exports.authenticate = authenticate;
module.exports.authorize = authorize;