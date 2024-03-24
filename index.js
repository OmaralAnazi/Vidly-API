require("dotenv").config();
const winston = require("winston");
const app = require("express")();

require("./startup/logging")();
require("./startup/joiSetup")();
require("./startup/config")();
require("./startup/db")();
require("./startup/prod")(app);
require("./startup/routes")(app);

app.listen(process.env.PORT, () => {winston.info(`Server is running on port ${process.env.PORT}...`)});