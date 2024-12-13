// importing all the necessay folders
import express, { request, response } from "express";

//port and the cloud database url
import { PORT, mongoDBURL } from "./config.js";

//mongoose is a popular data modelling library for mongodb
//allows us to interact with mongodb using js
import mongoose from "mongoose";

// improting the book schema 
import { Book } from "./models/bookModel.js";

// importin the routes 
import bookRoute from "./routes/booksRoute.js"

import cors from "cors"

// creating an instance of an expression applicaiton
const app = express();

//is a middleware in express.js that
//parses JSON data
app.use(express.json());

//Middleware for handling CORS POLICY
// Allow web application running in one domain to access the resources
// from a different domain
//  * allows request from any origin and allows the used of HTTP safe methods like
// GET POST DELETE PUT
// Option 1: Allows all origin with default cors(*)
//app.use(cors())

// Option 2: 
app.use(
    cors({
        origin: 'http://localhost:3000',
        method: ['GET', 'POST', 'DELETE', 'PUT'],
        allowedHeader: ['Content-Type'],
    })
);

//method used to request data form the server
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to the MERN stack Tutorial');
});

app.use('/books', bookRoute)

/*
Here the second parameter after the port is a callback funciton
callback function is a function which is passed as a parameter which
executes after the main function, it allows the user to handle asynchronous
operations 
*/
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to the database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
        
    });