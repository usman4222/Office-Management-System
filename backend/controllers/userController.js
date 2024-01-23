const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHanlder');
const catchAsyncError = require('../middleware/catchAsyncError');
const sendToken = require('../utils/jwtToken');

//register user
exports.registerUser = catchAsyncError(async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        const newUser = await User.create({ email, password });

        res.status(201).json({
            success: true,
            message: "User Created Successfully",
            newUser
        });
    } catch (error) {
        next(error)
        console.error("Registration Error:", error);
    }
})


// exports.loginUser = catchAsyncError(async (req, res, next) => {

//     const { email, password } = req.body;
//     try {
//         if (!email || !password) {
//             throw new ErrorHandler("Please enter Email and Password", 400);
//         }

//         const user = await User.findOne({ email }).select("+password");

//         if (!user) {
//             throw new ErrorHandler("Invalid Credentials", 401);
//         }

//         const isPasswordMatched = await user.comparePassword(password);

//         if (!isPasswordMatched) {
//             throw new ErrorHandler("Invalid Credentials", 401);
//         }
//         console.log("login error:", user);

//         sendToken(user, 200, res);
//     } catch (error) {
//         next(error);
//         console.log("login error:", error);
//     }
// })


exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please enter Email and Password", 400));
    }

    const user = await User.findOne({ email });

    if (!user) {
        return next(new ErrorHandler("Invalid Credentials", 401));
    }

    const storedPassword = user.password;

    if (!storedPassword) {
        return next(new ErrorHandler("Invalid Credentials", 401));
    }

    if (password === storedPassword) {
        // const token = await user.generateAuthToken();
        // console.log(token);
        // res.cookie('jwtToken', token, {
        //     expires: new Date(Date.now() + 24 * 60 * 60),
        //     httpOnly: true
        // })
        // res.status(200).json({
        //     user,
        //     token
        // })
        sendToken(user, 200, res);
    } else {
        return next(new ErrorHandler("Invalid Credentials", 401));
    }
});



exports.logoutUser = catchAsyncError(async (req, res, next) => {
    // res.cookie("jwtToken", null, {
    //     expires: new Date(Date.now() + 24 * 60 * 60 * 1000), 
    //     httpOnly: true,
    // });
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Logout Successfully",
    });
});
