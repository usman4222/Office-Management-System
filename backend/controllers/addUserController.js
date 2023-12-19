const catchAsyncError = require("../middleware/catchAsyncError");
const newUser = require("../models/newUserModel")



//Add New Employee
exports.addUser = catchAsyncError(async (req, res, next) => {
    try {
        const { name, fatherName, phone, address, role, designation } = req.body;

        const user = new newUser({
            name,
            fatherName,
            phone,
            address,
            role,
            designation
        });

        await user.save();

        res.status(201).json({ success: true, data: user, message: "New User Created Successfully" });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message,  });
    }
})


//Get All Employee


exports.getAllUsers = catchAsyncError(async (req, res, next) => {
    try {
        const users = await newUser.find();

        if (users.length === 0) {
            return next(new ErrorHandler("No User Found", 400));
        }

        res.status(200).json({
            success: true,
            users,
            error: { message: "This is an error while getting all users" } 
        });
    } catch (error) {
        return next(new ErrorHandler("Error getting users", 500)); 
    }
});

