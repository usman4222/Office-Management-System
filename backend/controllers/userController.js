const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHanlder');
const catchAsyncError = require('../middleware/catchAsyncError');
const sendToken = require('../utils/jwtToken');

//register user
exports.registerUser = catchAsyncError(async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        console.log("Received Data:", req.body);

        // Check if user with the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        const newUser = await User.create({ name, email, password });

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
         console.log("New User Created:", newUser); 
    } catch (error) {
        next(error)
        console.error("Registration Error:", error);
    }
})




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


exports.logoutUser = catchAsyncError(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Logout Successfully"
    })
})



exports.getAllUsers = catchAsyncError(async (req, res, next) => {

    const users = await User.find();

    if (users.length === 0) {
        return next(new ErrorHandler("No User Found", 400))
    }

    res.status(200).json({
        success: true,
        users
    })
})


exports.getUserDetails = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not Exist with this ID: ${req.params.id}`, 404))
    }

    res.status(200).json({
        success: true,
        user
    })
})


exports.setUserRole = catchAsyncError(async (req, res, next) => {

    const userNewData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    await User.findByIdAndUpdate(req.params.id, userNewData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    // if (!user) {
    //     return next(new ErrorHandler(`No User Exist with this ID: ${req.params.id}`, 404))
    // }

    res.status(200).json({
        success: true,
        message: "User role Updated successfully",
        userNewData
    })
})