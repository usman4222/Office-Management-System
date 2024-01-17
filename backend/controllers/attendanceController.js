const catchAsyncError = require('../middleware/catchAsyncError');
const newUser = require('../models/newUserModel');
const ErrorHandler = require('../utils/errorHanlder');

exports.markAttendance = catchAsyncError(async (req, res, next) => {
    try {
        const { id } = req.params;
        const { attendance } = req.body;

        if (!Array.isArray(attendance) || attendance.length === 0) {
            return next(new ErrorHandler("Attendance status is missing or empty", 400));
        }

        const user = await newUser.findById(id);

        if (!user) {
            return next(new ErrorHandler('User Not found', 404));
        }

        const updatedAttendance = [];

        for (const entry of attendance) {
            const { status, date } = entry;

            const existingAttendanceIndex = user.attendance.findIndex(
                (a) => a.date.toDateString() === new Date(date).toDateString()
            );

            if (existingAttendanceIndex !== -1) {
                user.attendance[existingAttendanceIndex].status = status;
                updatedAttendance.push(user.attendance[existingAttendanceIndex]);
            } else {
                user.attendance.push({ date, status });
                updatedAttendance.push({ date, status });
            }
        }

        const result = await user.save();
        return res.status(200).json({ success: true, message: 'Attendance status updated successfully', updatedAttendance });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal Server Error', error });
    }
});





// exports.updateAttendance = catchAsyncError(async (req, res, next) => {
//     const userId = req.params.id;
//     const { date, status } = req.body;

//     try {
//         let user = await newUser.findById(userId);

//         if (!user) {
//             return next(new ErrorHandler("User Not found", 404));
//         }

//         const existingAttendanceIndex = user.attendance.findIndex(
//             (a) => a.date.toDateString() === new Date(date).toDateString()
//         );

//         if (existingAttendanceIndex !== -1) {
//             user.attendance[existingAttendanceIndex].status = status;
//         } else {
//             user.attendance.push({ date, status });
//         }

//         user = await user.save();

//         res.status(200).json({
//             success: true,
//             updatedAttendance: user.attendance,
//         });
//     } catch (error) {
//         return next(new ErrorHandler('Internal Server Error', 500));
//     }
// });


exports.updateAttendance = catchAsyncError(async (req, res, next) => {

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