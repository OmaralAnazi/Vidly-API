const express = require("express");
const {Customer, joiCustomerSchema: schema} = require("../models/customer");
const {validateObjectId, validateSchema, authenticate, authorize} = require("../middlewares/validations");
const router = express.Router();

router.get("/", async (req, res) => {
    res.send(await Customer.find());
});

router.get("/:id", validateObjectId, async (req, res) => {
    const id = req.params.id;
    const customer = await Customer.findOne({_id: id});
    if (!customer) return res.status(404).send(`There's no customer with id=${id}.`);
    res.send(customer);
});

router.post("/", authenticate, validateSchema(schema), async (req, res) => {
    const newCustomer = new Customer(req.body);
    await newCustomer.save();
    res.status(201).send(newCustomer);
});

router.put("/:id", authenticate, validateObjectId, validateSchema(schema), async (req, res) => {
    const id = req.params.id;
    const updatedCustomer = await Customer.findOneAndUpdate({ _id: id }, req.body, { new: true });
    if (!updatedCustomer) return res.status(404).send(`There's no customer with the ID=${id}.`);
    res.send(updatedCustomer);
});

router.delete("/:id", authenticate, authorize, validateObjectId, async (req, res) => {
    const id = req.params.id;
    const deletedCustomer = await Customer.findOneAndDelete({ _id: id });
    if (!deletedCustomer) return res.status(404).send(`There's no customer with the ID=${id}.`);
    res.send(deletedCustomer);
});

module.exports = router;