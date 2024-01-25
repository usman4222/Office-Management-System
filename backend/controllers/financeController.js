const catchAsyncError = require("../middleware/catchAsyncError");
const spend = require("../models/financeModel");
const ErrorHandler = require("../utils/errorHanlder");
const ApiFeatures = require("../utils/search");


exports.financeController = catchAsyncError(async (req, res, next) => {
    try {
        const { title, ref, amount, description, date } = req.body;

        const expense = new spend({ title, ref, amount, description, date });

        const savedExpense = await expense.save();

        res.status(201).json({ success: true, data: savedExpense, message: "New Expense Saved Successfully" });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});


exports.getAllExpenses = catchAsyncError(async (req, res, next) => {
    try {

        const { keyword, number, date } = req.query;

        const apiFeature = new ApiFeatures(spend.find(), { keyword, number, date }).search();

        const expenses = await apiFeature.query;

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


exports.getCurrentMonthExpenses = catchAsyncError(async (req, res, next) => {
    try {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        const totalMonthlyExpenses = await spend.find({
            $expr: {
                $and: [
                    { $eq: [{ $month: "$date" }, currentMonth] }, 
                    { $eq: [{ $year: "$date" }, currentYear] }, 
                ],
            },
        });

        if (totalMonthlyExpenses.length === 0) {
            return next(new ErrorHandler("No Expenses Found for this month", 404));
        }

        const totalCurrentMonthExpenses = totalMonthlyExpenses.reduce(
            (total, expense) => total + parseFloat(expense.amount),
            0
        );

        res.status(200).json({
            success: true,
            totalCurrentMonthExpenses,
        });
    } catch (error) {
        return next(new ErrorHandler("Error getting current month expenses", 500));
    }
});
