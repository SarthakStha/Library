// importing all the necessay folders
import express from "express";
import { PORT } from "./config.js";

// creating an instance of an expression applicaiton
const app = express();

// used to request data form the server
app.get();

/*
Here the second parameter after the port is a callback funciton
callback function is a function which is passed as a parameter which
executes after the main function, it allows the user to handle asynchronous
operations 
*/
app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`);
});
