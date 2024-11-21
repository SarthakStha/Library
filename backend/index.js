// importing all the necessay folders
import express, { request, response } from "express";

//port and the cloud database url
import { PORT, mongoDBURL } from "./config.js";

//mongoose is a popular data modelling library for mongodb
//allows us to interact with mongodb using js
import mongoose from "mongoose";

// improting the book schema from the models folder
import { Book } from "./models/book.js";

// creating an instance of an expression applicaiton
const app = express();

//is a middleware in express.js that
//parses JSON data
app.use(express.json());

//method used to request data form the server
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to the MERN stack Tutorial');
});

//Route to save a new book
//'/books' is defining the route.
//asnc returns a promise and await waits for the promise
app.post('/books', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishedYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishedYear',
            });
        } 
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishedYear: request.body.publishedYear,
        };

        // await waits until the database operation
        // is resolved and the newBook is created
        const book = await Book.create(newBook);
        return response.status(201).send(book);
    } catch (error) {
        //prints the error message in the server's console
        console.log(error.message);
        //imforms the client about the error
        response.status(500).send({message: error.message});
        
    }

})

//handles the get request for the route '/books'
app.get('/books', async (request, response) => {
    try {
        //await waits until it finds all the books
        //{} in find represents no filter in find
        const books = await Book.find({});
        // returns the response as a json object
        return response.status(200).json({
            // no of books found
            count: books.length,
            // array of book object
            data: books, 
        });
    } catch (error) {
        console.log(error);
        //the method send is currently sending a JSON object to the client
        response.status(500).send({message: error.message});
        
    }
})

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