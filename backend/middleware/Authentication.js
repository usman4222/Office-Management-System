const util = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { JWT_SECRET } = require('../config.js');
const ErrorHandler = require('../utils/errorHanlder');
const catchAsyncError = require('./catchAsyncError');

// exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {


//     try {
//         const token = req.cookies.jwtToken
//         const verifyToken = jwt.verify(token, JWT_SECRET)
//         const rootUser = await User.findById({ _id: verifyToken._id, "tokens.token": token })
//         if (!rootUser) {
//             throw new ErrorHandler("User Not Found")
//         }
//         req.token = token
//         req.rootUser = rootUser
//         req.userID = rootUser._id
//         next()
//     } catch (error) {
//         res.status(401).json({
//             message: "401, Unauthorized: no token"
//         })
//         console.log(error);
//     }


// }); 
exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {

    // const { token } = req.cookies
    // console.log("This is token", token)

    // if (!token) {
    //     return next(new ErrorHandler("Please Login to access this resourse."))
    // }
    // const isDecoded = jwt.verify(token, JWT_SECRET)

    // console.log("this is decoded", isDecoded)

    // req.user = await User.findById(isDecoded._id)

    // console.log("this is user", req.user)
    // next();

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return next(new ErrorHandler("Token is required.", 401));
    }

    const token = authHeader.split(' ')[1];

    try {
        const { _id } = jwt.verify(token, JWT_SECRET);
        req.user = await User.findById(_id);

        if (!req.user) {
            return next(new ErrorHandler("Invalid user.", 401));
        }

        next();
    } catch (error) {
        console.error(error);
        return next(new ErrorHandler("Please Login to access this resource.", 401));
    }


})




exports.authorizeRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new ErrorHandler("User not found.", 401));
        }

        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role: ${req.user.role} not allowed to access this Resource.`, 403));
        }

        next();
    };
};
// const { token } = req.cookies
// console.log("This is token", token)

// if (!token) {
//     return next(new ErrorHandler("Please Login to access this resourse."))
// }
// const isDecoded = jwt.verify(token,JWT_SECRET)

// console.log("this is decoded", isDecoded)

// req.user = await User.findById(isDecoded.id)

// console.log("this is user", req.user)
// next();