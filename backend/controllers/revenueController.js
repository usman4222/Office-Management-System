const catchAsyncError = require("../middleware/catchAsyncError");
const revenue = require("../models/revenueModel");


exports.createRevenue = catchAsyncError(async (req, res, next) => {
    try {
        const { ref, amount, date, description, month } = req.body

        const Revenue = new revenue({ ref, amount, date, description, month })

        const revenueSalary = await Revenue.save()

        res.status(200).json({
            success: true,
            data: revenueSalary,
            message: "Revenue Created Successfully"
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })

    }
})



exports.getAllRevenue = catchAsyncError(async (req, res, next) => {
    try {
        const revenues = await revenue.find();

        if (revenues.length === 0) {
            return next(new ErrorHandler("No Revenues Found", 400));
        }

        res.status(200).json({
            success: true,
            revenues,
            error: { message: "This is an error while getting all revenues" }
        });
    } catch (error) {
        return next(new ErrorHandler("Error getting revenues", 500));
    }
});