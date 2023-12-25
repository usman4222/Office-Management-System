const mongoose = require('mongoose')

const expensesSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('spend', expensesSchema)