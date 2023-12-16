const User = require('../models/userModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middleware/catchAsyncError');
const sendToken = require('../utils/jwtToken')
const cloudinary = require("cloudinary")


//register user
exports.registerUser = catchAsyncError(async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.create({
            name,
            email,
            password,
        });

        sendToken(user, 201, res);
    } catch (error) {
        // Handle any error that might occur during upload or user creation
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error uploading avatar or creating user.' });
    }
});


//login user

exports.loginUser = catchAsyncError(async (req, res, next) => {

    const { email, password } = req.body

    //checking user have email and password already
    if (!email || !password) {
        return next(new ErrorHandler("Please enter Email and Password", 400)) //bad req
    }

    const user = await User.findOne({ email }).select("+password")

    if (!user) {
        return next(new ErrorHandler("Invalid Credentials", 401)) // unauthorized
    }

    const isPasswordMatched = await user.comparePassword(password)

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Credentials", 401))
    }

    sendToken(user, 200, res)
})

