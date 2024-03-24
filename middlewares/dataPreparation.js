const {Genre} = require("../models/genre");
const {Customer} = require("../models/customer");
const {Movie} = require("../models/movie");

async function prepareMovieData(req, res, next) {
    const genre = await Genre.findOne({_id: req.body.genreId});
    if (!genre) return res.status(404).send("Genre not found.");

    req.preparedData = {
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
    };
    next();
}

async function prepareRentalData(req, res, next) {
    const customer = await Customer.findOne({_id: req.body.customerId});
    if (!customer) return res.status(404).send("Customer not found.");

    const movie = await Movie.findOne({_id: req.body.movieId});
    if (!movie) return res.status(404).send("Movie not found.");

    if (movie.numberInStock === 0) 
        return res.status(422).send("This movie is currently out of stock.");

    req.preparedData = {
        customer: {
            _id: customer._id,
            name: customer.name,
            isGold: customer.isGold,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    };
    req.movieDocument = movie;
    next();
}

module.exports.prepareMovieData = prepareMovieData;
module.exports.prepareRentalData = prepareRentalData;