const catchAsyncError = require("../middleware/catchAsyncError");
const newUser = require("../models/newUserModel")


exports.addUser = catchAsyncError(async (req, res, next) => {
    try {
        const { name, fatherName, phone, address, role, designation, userType } = req.body;

        const user = new newUser({
            name,
            fatherName,
            phone,
            address,
            role,
            designation,
            userType
        });

        await user.save();

        res.status(201).json({ success: true, data: user, message: "New User Created Successfully" });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message,  });
    }
})
