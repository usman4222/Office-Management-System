const express = require('express');
const { PORT, MONGO } = require('./config.js');
const app = require('./app.js');
const mongoose = require('mongoose');

let server; // Define the server variable

mongoose
  .connect(MONGO)
  .then(() => {
    console.log("MongoDB is connected...");
    // Start the server once the MongoDB connection is established
    server = app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error while connecting to MongoDB:", error);
  });

// Handling uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error(`Error: ${error.message}`);
  console.error("Server is closed due to an uncaught exception");
  process.exit(1);
});

// Handling unhandled promise rejections
process.on("unhandledRejection", (error) => {
  console.error(`Error: ${error.message}`);
  console.error("Shutting down the server due to an unhandled promise rejection");
  
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
