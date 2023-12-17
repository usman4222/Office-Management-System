const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRES_IN, COOKIE_EXPIRE } = require('../config.js');

const sendToken = (user, statusCode, res) => {

    const payload = {
        userId: user.id,
        email: user.email,
    };

    // Sign the token using the secret key from config
    const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    });

    // Calculate expiration time for the cookie
    const cookieExpires = new Date(Date.now() + COOKIE_EXPIRE * 24 * 60 * 60 * 1000);

    // Options for the cookie
    const options = {
        expires: cookieExpires,
        httpOnly: true,
    };

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            user,
            token,
        });
};

module.exports = sendToken;
