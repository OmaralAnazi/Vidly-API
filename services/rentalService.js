const { Rental } = require("../models/rental");
const {decrementMovieStock, incrementMovieStock} = require("../services/movieService");

async function createRental(preparedData, movie, session) {
    await decrementMovieStock(movie._id, session);
    const newRental = new Rental(preparedData);
    await newRental.save({ session });
    return newRental;
}

async function returnRental(rentalId, session) {
    const rental = await Rental.findOne({ _id: rentalId }).session(session);
    if (!rental) throw new Error("Rental not found.");
    if (rental.dateReturned) throw new Error("Rental already returned.");

    rental.returnMovie();
    await incrementMovieStock(rental.movie._id, session);
    await rental.save({ session });
    return rental;
}

async function deleteRental(rentalId, session) {
    const rentalToDelete = await Rental.findById(rentalId).session(session);
    if (!rentalToDelete) throw new Error(`Rental with ID=${rentalId} not found.`);

    if (!rentalToDelete.dateReturned) 
        await incrementMovieStock(rentalToDelete.movie._id, session);

    await Rental.deleteOne({ _id: rentalToDelete._id }).session(session);
    return rentalToDelete;
}

module.exports = { createRental, returnRental, deleteRental};