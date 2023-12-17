// const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // wrong mongodb cast error
    if (err.name === "CastError") {
        err.message = `Resource Not Found, Invalid ${err.path}`;
        err.statusCode = 400;
    }

    // mongo duplicate key error
    if (err.code === 11000) {
        err.message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err.statusCode = 400;
    }

    // wrong webToken Error 
    if (err.name === "JsonWebTokenError") {
        err.message = `Json Web Token is Invalid, Try again`;
        err.statusCode = 400;
    }

    // jwt expire error
    if (err.name === "TokenExpiredError") {
        err.message = `Json Web Token is Expired, Try again`;
        err.statusCode = 400;
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        error: err.stack  // Include stack trace if needed
    });
};
