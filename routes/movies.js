const express = require("express");
const {Movie,joiMovieSchema: schema} = require("../models/movie");
const {validateObjectId, validateSchema, authenticate, authorize} = require("../middlewares/validations");
const {prepareMovieData} = require("../middlewares/dataPreparation");
const router = express.Router();

router.get("/", async (req, res) => {
    res.send(await Movie.find());
});

router.get("/:id", validateObjectId, async (req, res) => {
    const id = req.params.id;
    const movie = await Movie.findOne({_id: id});
    if (!movie) return res.status(404).send(`There's no movie with id=${id}.`);
    res.send(movie);
});

router.post("/", authenticate, validateSchema(schema), prepareMovieData, async (req, res) => {
    const newMovie = new Movie(req.preparedData);
    await newMovie.save();
    res.status(201).send(newMovie);
});

router.put("/:id", authenticate, validateObjectId, validateSchema(schema), async (req, res) => {
    const id = req.params.id;
    const updatedMovie = await Movie.findOneAndUpdate({ _id: id }, req.body, { new: true });
    if (!updatedMovie) return res.status(404).send(`There's no movie with the ID=${id}.`);
    res.send(updatedMovie);
});

router.delete("/:id", authenticate, authorize, validateObjectId, async (req, res) => {
    const id = req.params.id;
    const deletedMovie = await Movie.findOneAndDelete({ _id: id });
    if (!deletedMovie) return res.status(404).send(`There's no movie with the ID=${id}.`);
    res.send(deletedMovie);
});

module.exports = router;