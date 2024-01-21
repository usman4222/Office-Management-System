const ErrorHandler = require('../utils/errorHanlder');
const catchAsyncError = require('./catchAsyncError');
const jwt = require("jsonwebtoken");
const User = require('../models/userModel');
const { JWT_SECRET } = require('../config.js');

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {

    const { token } = req.cookies
    console.log("This is token", token)

    if (!token) {
        return next(new ErrorHandler("Please Login to access this resourse."))
    }
    const isDecoded = jwt.verify(token, JWT_SECRET)

    console.log("this is decoded", isDecoded)

    req.user = await User.findById(isDecoded.id)

    console.log("this is user", req.user)
    next();

})



exports.authorizeRole = (...roles) => {

    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role: ${req.user.role} not allowed to access this Resourse.`, 403))
        }
        next();
    }
}