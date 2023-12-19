const mongoose = require('mongoose');

const newUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter your Name..."],
        maxLength: [20, "Name should'nt exceed more than 20 characters"],
        minLength: [4, "Name Should be more than 4 character"]
    },
    fatherName: {
        type: String,
        required: [true, "Please Enter Father Name"],
        maxLength: [20, "Name should'nt exceed more than 20 characters"],
        minLength: [4, "Name Should be more than 4 character"]
    },
    phone: {
        type: Number,
        required: [true, "Please Enter your phone number"]
    },
    address: {
        type: String,
        required: [true, "Please Enter your Address"]
    },
    role: {
        type: String,
        required: [true, "Please define user role"]
    },
    designation: {
        type: String,
        required: [true, "Please define user designation"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model("newUser", newUserSchema);
