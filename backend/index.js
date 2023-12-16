import express from 'express';
import { PORT, MONGO } from './config.js';
import mongoose from 'mongoose';
const app = express();


mongoose
    .connect(MONGO)
    .then(() => {
        console.log("Mongo is connected...");
    })
    .catch((error) => {
        console.log("Error while connecting MongoDB", error);
    });


//handling uncatch exception
// console.log(you) {this type of error}

process.on("uncaughtException", (error) => {
    console.log(`Error: ${error.message}`)
    console.log(`Server is close due to Uncatch Exception Error`)
    process.exit(1);

})


app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
});


//unhandle promise rejection
process.on("unhandledRejection", (error) => {
    console.log(`Error: ${error.message}`)
    console.log(`Shutting down the server dueto unhandled promise rejection`)

    server.close(() => {
        process.exit(1)
    })
})