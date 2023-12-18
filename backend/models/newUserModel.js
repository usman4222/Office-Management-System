const mongoose = require('mongoose');

const newUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter your Name..."]
    },
    fatherName: {
        type: String,
        required: [true, "Please Enter Father Name"]
    },
    phone: {
        type: Number,
        required: [true, "Please Enter your phone number"]
    },
    address: {
        type: String,
        required: [true, "Please Enter your Address"]
    },
    role: String,
    desigination: String,
    userType: String,
    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model("newUser", newUserSchema);
