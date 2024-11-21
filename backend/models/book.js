//mongoose a data modelling library for mongoDB
import mongoose from "mongoose";

//defining a  mongoose schema
const bookSchema = mongoose.Schema(
    {
        //defining the fields
        title: {
            type: String,
            //required is a property 
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        publishedYear: {
            type: String,
            required: true,
        },
    },
    //the second set of {} deonotes option objects
    // this is an optional parameter
    {
        
        //timestamps is also a property which
        //adds the field createdAt and updatedAt to the table
        timestamps: true,
    }
);

//created and exports a model Book on the basis of the 
//schema defined
export const Book = mongoose.model('Book', bookSchema);