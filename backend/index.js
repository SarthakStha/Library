// importing all the necessay folders
import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";

// creating an instance of an expression applicaiton
const app = express();

//method used to request data form the server
//
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to the MERN stack Tutorial');
});

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