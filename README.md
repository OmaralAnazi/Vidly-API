# Vidly API Project

## Overview
The Vidly API is a Node.js project developed for managing a film rental store's operations. This project serves as an educational exercise to deepen understanding of server-side development with Node.js and Express. It was built as part of the learning curriculum from the [Complete Node.js Course](https://codewithmosh.com/p/the-complete-node-js-course) by Code with Mosh.

## Learning Outcomes
Through the development of the Vidly API, the following topics were explored and applied:

- Fundamentals of Node.js and its role in server-side JavaScript development
- Mastery of Node.js core modules and APIs
- Usage of NPM (Node Package Manager) to manage third-party libraries
- Building RESTful APIs with Node.js and Express.js
- Data storage and retrieval with MongoDB through Mongoose
- Data validation implementation
- Authentication and authorization handling
- Effective error handling and logging
- Managing configuration settings and environment-specific variables
- Deployment of Node.js applications

## Project Description
Vidly is a film tape rental and transaction system that supports various operations necessary for managing a video rental store. The backend is structured around a MongoDB database and consists of several collections that encapsulate different domains of the business:

- `genres`: Categorizes movies into genres.
- `users`: Represents employees who utilize the API.
- `customers`: Customers who purchase and return movie tapes.
- `movies`: Holds information about the film tapes available for rent.
- `rentals`: Tracks the rental transactions of customers.

The API provides endpoints for CRUD operations on these collections and implements business logic for the rental process, including stock management and transactional operations.

## Setup and Usage
Get the Vidly API up and running with these simple steps:

1. **Initial Setup**:
   Make sure you have Node.js and MongoDB installed on your system.
2. **Clone the Repository**:
   Clone the project to your local machine and install the required npm packages.
3. **Environment Variables**:
Create a `.env` file based on the `.env.example` provided, filling in your specific details for database connection, port, and JWT secret key.
4. **Start the Application**:
Launch the application by running `node index.js`. The API will be available on the port specified in your `.env` file.

## Acknowledgements
This project was built as part of an educational exercise under the guidance of Mosh Hamedani's course. The knowledge acquired from the course has been instrumental in the successful implementation of the Vidly API.