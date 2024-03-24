const express = require("express");
const {Genre, joiGenreSchema: schema} = require("../models/genre");
const {validateObjectId, validateSchema, authenticate, authorize} = require("../middlewares/validations");
const router = express.Router();

router.get("/", async (req, res) => {
    res.send(await Genre.find());
});

router.get("/:id", validateObjectId, async (req, res) => {
    const id = req.params.id;
    const genre = await Genre.findOne({_id: id});
    if (!genre) return res.status(404).send(`There's no genre with id=${id}.`);
    res.send(genre);
});

router.post("/", authenticate, validateSchema(schema), async (req, res) => {
    const newGenre = new Genre(req.body);
    await newGenre.save();
    res.status(201).send(newGenre);
});

router.put("/:id", authenticate, validateObjectId, validateSchema(schema), async (req, res) => {
    const id = req.params.id;
    const updatedGenre = await Genre.findOneAndUpdate({ _id: id }, req.body, { new: true });
    if (!updatedGenre) return res.status(404).send(`There's no genre with the ID=${id}.`);
    res.send(updatedGenre);
});

router.delete("/:id", authenticate, authorize, validateObjectId, async (req, res) => {
    const id = req.params.id;
    const deletedGenre = await Genre.findOneAndDelete({ _id: id });
    if (!deletedGenre) return res.status(404).send(`There's no genre with the ID=${id}.`);
    res.send(deletedGenre);
});

module.exports = router;