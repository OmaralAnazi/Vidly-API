const Joi = require("joi");
const mongoose = require("mongoose");
const {genreSchema, Genre} = require("./genre");

const Movie = mongoose.model("Movie", mongoose.Schema({
    title: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true,
        lowercase: true,
        trim: true,
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
}));

const joiMovieSchema = Joi.object({
    title: Joi.string().min(3).max(50).trim().required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).max(255).required(),
    dailyRentalRate: Joi.number().min(0).max(255).required(),
});

module.exports.Movie = Movie;
module.exports.joiMovieSchema = joiMovieSchema;