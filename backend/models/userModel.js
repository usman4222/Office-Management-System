const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Assuming Jwt was a typo and should be jwt
const crypto = require('crypto');
const { JWT_SECRET, JWT_EXPIRE } = require('../config.js');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
    },
})

userSchema.methods.getJWTToken = function () {

    return jwt.sign({ id: this._id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRE
    })

}


module.exports = mongoose.model("User", userSchema)




