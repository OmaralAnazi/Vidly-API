const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const {User, joiUserSchema: schema} = require("../models/user");
const {validateObjectId, validateSchema, authenticate, authorize} = require("../middlewares/validations");
const router = express.Router();

router.get("/me", authenticate, async (req, res) => {
    const id = req.decodedUser._id;
    const user = await User.findOne({_id: id});
    res.send(_.pick(user, ["_id", "name", "email"]));
});

router.post("/", validateSchema(schema), async (req, res) => {
    if(await User.findOne({email: req.body.email})) return res.status(400).send("User is already registered.");

    const newUser = new User(req.body);
    const salt = await bcrypt.genSalt(10); 
    newUser.password = await bcrypt.hash(newUser.password, salt);
    await newUser.save();

    const token = newUser.generateAuthToken();
    res.header("x-auth-token", token).status(201).send(_.pick(newUser, ["_id", "name", "email"]));
});

router.delete("/:id", authenticate, authorize, validateObjectId, async (req, res) => {
    const id = req.params.id;
    const deletedUser = await User.findOneAndDelete({ _id: id });
    if (!deletedUser) return res.status(404).send(`There's no user with the ID=${id}.`);
    res.send(_.pick(deletedUser, ["_id", "name", "email"]));
});

module.exports = router;