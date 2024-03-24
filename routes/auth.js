const express = require("express");
const bcrypt = require("bcrypt");
const {User, joiAuthschema: schema} = require("../models/user");
const {validateSchema} = require("../middlewares/validations");
const router = express.Router();

router.post("/", validateSchema(schema), async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    const isValidPassword = user && await bcrypt.compare(req.body.password, user.password);
    if (!user || !isValidPassword) return res.status(400).send("Invalid email or password.");

    const token = user.generateAuthToken();
    res.status(200).send(token);
});

module.exports = router;