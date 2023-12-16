const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const errorMiddleware = require('./middleware/error');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser")

// Load environment variables
dotenv.config({ path: "backend/config/config.env" });

// Middleware setup
app.use(cors());
app.use(express.json()); // Use express.json() instead of bodyParser.json()
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload());


// Routes
const user = require('./routes/userRoute');

app.use('/api/v1', user);


// Error handling middleware
app.use(errorMiddleware);

module.exports = app;
