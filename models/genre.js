const Joi = require("joi");
const mongoose = require("mongoose");

const genreSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
    }
});

const Genre = mongoose.model("Genre", genreSchema);

const joiGenreSchema = Joi.object({
    name: Joi.string().min(3).max(50).trim().required()
});

module.exports.genreSchema = genreSchema;
module.exports.Genre = Genre;
module.exports.joiGenreSchema = joiGenreSchema;