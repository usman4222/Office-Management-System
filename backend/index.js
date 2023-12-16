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


app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
});
