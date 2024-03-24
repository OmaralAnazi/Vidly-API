const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");
const winston = require("winston");
const {createRental, returnRental, deleteRental} = require("../services/rentalService");
const {Rental, joiRentalSchema: schema} = require("../models/rental");
const {validateObjectId, validateSchema, authenticate, authorize} = require("../middlewares/validations");
const {prepareRentalData} = require("../middlewares/dataPreparation");
const router = express.Router();

router.get("/", async (req, res) => {
    res.send(await Rental.find());
});

router.get("/:id", validateObjectId, async (req, res) => {
    const id = req.params.id;
    const rental = await Rental.findOne({_id: id});
    if (!rental) return res.status(404).send(`There's no rental with id=${id}.`);
    res.send(rental);
});

router.post("/", authenticate, validateSchema(schema), prepareRentalData, async (req, res) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const newRental = await createRental(req.preparedData, req.movieDocument, session);
        await session.commitTransaction();
        res.status(201).send(newRental);
    } catch (ex) {
        await session.abortTransaction();
        winston.error(ex.message, ex);
        res.status(500).send(ex.message);
    } finally {
        session.endSession();
    }
});

router.patch("/:id/return", authenticate, async (req, res) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const rental = await returnRental(req.params.id, session);
        await session.commitTransaction();
        res.send(rental);
    } catch (ex) {
        await session.abortTransaction();
        winston.error(ex.message, ex)
        res.status(500).send(ex.message);
    } finally {
        session.endSession();
    }
});

router.delete("/:id", authenticate, authorize, validateObjectId, async (req, res) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const deletedRental = await deleteRental(req.params.id, session);
        await session.commitTransaction();
        res.send(_.pick(deletedRental, ["_id", "customer", "movie", "dateOut", "dateReturned", "rentalFee"]));
    } catch (ex) {
        await session.abortTransaction();
        winston.error(ex.message, ex);
        res.status(500).send(`An error occurred: ${ex.message}`);
    } finally {
        session.endSession();
    }
});

module.exports = router;