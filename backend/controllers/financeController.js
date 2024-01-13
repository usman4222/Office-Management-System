const catchAsyncError = require("../middleware/catchAsyncError");
const spend = require("../models/financeModel");
const ErrorHandler = require("../utils/errorHanlder");
const QRCode = require('qrcode');



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


// exports.getMonthlyExpenses = catchAsyncError(async (req, res, next) => {
//     try {
//         const { month, year } = req.query;

//         const expenses = await spend.find({
//             $expr: {
//                 $and: [
//                     { $eq: [{ $month: "$date" }, parseInt(month)] },
//                     { $eq: [{ $year: "$date" }, parseInt(year)] },
//                 ],
//             },
//         });

//         if (expenses.length === 0) {
//             return next(new ErrorHandler("No Expenses Found for this month", 404));
//         }

//         const totalMonthlyExpenses = expenses.reduce(
//             (total, expense) => total + parseFloat(expense.amount),
//             0
//         );

//         res.status(200).json({
//             success: true,
//             totalMonthlyExpenses,
//             expenses,
//         });
//     } catch (error) {
//         return next(new ErrorHandler("Error getting monthly expenses", 500));
//     }
// });


exports.getCurrentMonthExpenses = catchAsyncError(async (req, res, next) => {
    try {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // Get current month
        const currentYear = currentDate.getFullYear(); // Get current year

        const totalMonthlyExpenses = await spend.find({
            $expr: {
                $and: [
                    { $eq: [{ $month: "$date" }, currentMonth] }, // Filter by current month
                    { $eq: [{ $year: "$date" }, currentYear] }, // Filter by current year
                ],
            },
        });

        if (totalMonthlyExpenses.length === 0) {
            return next(new ErrorHandler("No Expenses Found for this month", 404));
        }

        // Calculate total expenses for the current month
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
