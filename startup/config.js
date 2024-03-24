const winston = require("winston");

module.exports = function() {
    if (!process.env.DB_CONNECTION) 
        throw new Error("FATAL ERROR: DB_CONNECTION is not defined. Please ensure you have defined DB_CONNECTION in your environment variables.");

    if (!process.env.PORT) {
        process.env.PORT = 3000; 
        winston.warn("WARNING: PORT is not defined in environment variables. Falling back to default port 3000.");
    }

    if (!process.env.JWT_KEY) 
        throw new Error("FATAL ERROR: JWT_KEY is not defined. Please ensure you have defined JWT_KEY in your environment variables for JWT authentication.");
};