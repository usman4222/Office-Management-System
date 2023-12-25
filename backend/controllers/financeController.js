const catchAsyncError = require("../middleware/catchAsyncError");
const spend = require("../models/financeModel");
const ErrorHandler = require("../utils/errorHanlder");



exports.financeController = catchAsyncError(async (req, res, next) => {
    try {
        const { text, name, date } = req.body;

        if (!text || typeof text !== 'string' || text.trim() === '') {
            return next(new ErrorHandler("Text is required.", 400));
        }

        const expense = new spend({ text, name, date });

        const savedExpense = await expense.save();

        res.status(201).json({ success: true, data: savedExpense, message: "New Expense Saved Successfully" });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});


exports.getAllExpenses = catchAsyncError(async (req, res, next) => {
    try {
        const expenses = await spend.find();

        if (expenses.length === 0) {
            return next(new ErrorHandler("No Expense Found", 400));
        }

        res.status(200).json({
            success: true,
            expenses,
            error: { message: "This is an error while getting all expenses" } 
        });
    } catch (error) {
        return next(new ErrorHandler("Error getting expenses", 500)); 
    }
});