const mongoose = require('mongoose')

const expensesSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: [true, "Please Enter Your Name"]
    },
    date: {
        type: Date,
        required: true
    },
})

module.exports = mongoose.model('spend', expensesSchema)