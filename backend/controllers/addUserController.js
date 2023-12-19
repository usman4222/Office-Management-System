const catchAsyncError = require("../middleware/catchAsyncError");
const newUser = require("../models/newUserModel");
const ErrorHandler = require("../utils/errorHanlder");



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

//delete employee
exports.deleteEmployee = catchAsyncError(async (req, res, next) => {
    const user = await newUser.findByIdAndDelete(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`No User exists with this ID: ${req.params.id}`, 404));
    }

    // If you're managing images with cloud services like Cloudinary, 
    // uncomment the code below to delete associated images.
    // const imageId = user.avatar.public_id
    // await cloudinary.v2.uploader.destroy(imageId)

    res.status(200).json({
        success: true,
        message: "User Deleted successfully"
    });
});


//edit employee
exports.updateUser = catchAsyncError(async (req, res, next) => {

    let user = newUser.findById(req.params.id)

    if (!user) {
        return next(new ErrorHandler("User Not found", 404));
    }

    user = await newUser.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        user
    })
})


//get one user Details
exports.getOneUserDetails = catchAsyncError(async (req, res, next) => {

    const user = await newUser.findById(req.params.id)

    if (!user) {
        return next(new ErrorHandler("User Not found", 404));
    }

    res.status(200).json({
        success: true,
        user
    })

})