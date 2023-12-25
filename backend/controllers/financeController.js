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
