const Joi = require("joi");
const mongoose = require("mongoose");
const {Movie} = require("./movie");

const DISCOUNT_RATE = 0.10;

const simplifiedCustomerSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true,
        lowercase: true,
        trim: true,
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true,
        trim: true, 
    }
});

const simplifiedMovieSchema = mongoose.Schema({
    title: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true,
        lowercase: true,
        trim: true,
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
});

const rentalSchema = mongoose.Schema({
    customer: {
        type: simplifiedCustomerSchema,
        required: true
    },
    movie: {
        type: simplifiedMovieSchema,
        required: true
    },
    dateOut: {
        type: Date,
        default: Date.now
    },
    dateReturned: {
        type: Date,
    },
    rentalFee: {
        type: Number,
        min: 0,
    }
});

rentalSchema.methods.returnMovie = function() {
    this.dateReturned = new Date();
    const rentalDays = Math.max(1, Math.ceil((this.dateReturned - this.dateOut) / (1000 * 60 * 60 * 24)));
    this.rentalFee = rentalDays * this.movie.dailyRentalRate * (this.customer.isGold ? (1 - DISCOUNT_RATE) : 1);
};

const Rental = mongoose.model("Rental", rentalSchema);

const joiRentalSchema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
});

module.exports.Rental = Rental;
module.exports.joiRentalSchema = joiRentalSchema;