const catchAsyncError = require("../middleware/catchAsyncError");
const spend = require("../models/financeModel");


exports.createRevenue = catchAsyncError(async (req, res, next) => {
    try {
        const { ref, amount, date, description, month } = req.body

        const salary = new revenue({ ref, amount, date, description, month })

        const savedSalary = await salary.save()

        res.status(200).json({
            success: true,
            data: savedSalary,
            message: "Revenue Created Successfully"
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })

    }
})