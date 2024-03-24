const { Movie } = require("../models/movie");

async function incrementMovieStock(movieId, session) {
    const movie = await Movie.findById(movieId).session(session);
    if (!movie) throw new Error("Movie not found.");

    movie.numberInStock += 1;
    await movie.save({ session });
}

async function decrementMovieStock(movieId, session) {
    const movie = await Movie.findById(movieId).session(session);
    if (!movie) throw new Error("Movie not found.");
    if (movie.numberInStock === 0) throw new Error("Movie is out of stock.");

    movie.numberInStock -= 1;
    await movie.save({ session });
}

module.exports = { incrementMovieStock, decrementMovieStock };
