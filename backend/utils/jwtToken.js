// const jwt = require('jsonwebtoken');
// const { JWT_SECRET, JWT_EXPIRES_IN, COOKIE_EXPIRE } = require('../config.js');
// const User = require('../models/userModel.js');

// const sendToken = async (user, statusCode, res) => {

//     const payload = {
//         userId: user.id,
//         email: user.email,
//     };

//     const token = jwt.sign(payload, JWT_SECRET, {
//         expiresIn: JWT_EXPIRES_IN,
//     });

//     user.token = token;
//     await user.save();

//     const cookieExpires = new Date(Date.now() + COOKIE_EXPIRE * 24 * 60 * 60 * 1000);

//     const options = {
//         expires: cookieExpires,
//         httpOnly: true,
//     };

//     res
//         .status(statusCode)
//         .cookie('token', token, options)
//         .json({
//             success: true,
//             user,
//             token,
//         });
// };

// module.exports = sendToken;




const { COOKIE_EXPIRE } = require('../config.js');

const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();

    const options = {
        expires: new Date(Date.now() + COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true, // Set to true for HTTPS; set to false during development without HTTPS
        sameSite: 'None', // Set to 'None' for cross-domain requests
    };
    
    // Log information related to the cookie on the server side
    console.log('Stored Token:', token);

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token
    });
};

module.exports = sendToken;
