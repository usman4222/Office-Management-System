const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHanlder');
const catchAsyncError = require('../middleware/catchAsyncError');
const sendToken = require('../utils/jwtToken');



//register user
exports.registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if user with the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        // Create a new user (you might want to hash the password here)
        const newUser = await User.create({ name, email, password });

        // Send token upon successful registration
        // sendToken(
        //     newUser,
        //     201,
        //     res,
        //     res.send({"User Created Successfully")}
        // );
        res.status(201).json({ 
            success: true,
            message: "User Created Successfully"
         });
    } catch (error) {
        // Pass the error to the error-handling middleware using next
        next(error);
    }
};




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


