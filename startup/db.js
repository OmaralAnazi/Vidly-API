const mongoose = require("mongoose");
const winston = require("winston");

module.exports = function() {
    mongoose.connect(process.env.DB_CONNECTION) 
        .then(() => winston.info("Connected to the database..."));
};