const winston = require("winston");
require("express-async-errors");

module.exports = function() {
    const consoleFormat = winston.format.combine(
        winston.format.colorize(),
        winston.format.prettyPrint(),
        winston.format.simple(),
        winston.format.printf(({ level, message, timestamp, stack }) => {
            return `${timestamp} ${level}: ${stack || message}`;
        })
    );

    winston.configure({
        transports: [
            new winston.transports.File({ filename: "logFile.log" }),
            new winston.transports.Console({ format: consoleFormat })
        ],
        exceptionHandlers: [
            new winston.transports.File({ filename: "logFile.log" }),
            new winston.transports.Console({ format: consoleFormat })
        ]
    });

    process.on("unhandledRejection", (ex) => {
        throw ex; // This will be caught by the uncaughtException handler configured above
    });
};
