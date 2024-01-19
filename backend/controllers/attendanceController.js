const catchAsyncError = require('../middleware/catchAsyncError');
const newUser = require('../models/newUserModel');
const userModel = require('../models/userModel');
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


// exports.getSingleAttendanceDetails = catchAsyncError(async (req, res, next) => {

//     const user = await newUser.findById(req.params.id)

//     if (!user) {
//         return next(new ErrorHandler("User Not found", 404));
//     }

//     res.status(200).json({
//         success: true,
//         user
//     })
// })

exports.getSpecificUserAttendance = catchAsyncError(async (req, res, next) => {
    const userId = req.params.id;

    try {
        const user = await newUser.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found',
            });
        }

        const userAttendance = user.attendance;

        res.status(200).json({
            success: true,
            userAttendance,
        });
    } catch (error) {
        console.error(`Error getting user attendance: ${error.message}`);
        next(error); // Pass the error to the Express error handler
    }
})


exports.getSingleAttendance = async (req, res, next) => {
    const userId = req.params.id;
    const attendanceId = req.params.attendanceId;

    try {
        const user = await newUser.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found',
            });
        }

        const userAttendance = user.attendance;

        const specificAttendance = userAttendance.find(entry => entry._id.toString() === attendanceId);

        if (!specificAttendance) {
            return res.status(404).json({
                success: false,
                error: 'Attendance entry not found',
            });
        }

        res.status(200).json({
            success: true,
            specificAttendance,
        });
    } catch (error) {
        console.error(`Error getting user attendance: ${error.message}`);
        next(error);
    }
};



exports.editSingleAttendance = async (req, res, next) => {
    const userId = req.params.id;
    const attendanceId = req.params.attendanceId;
    const { date, status } = req.body; 

    try {
        const user = await newUser.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found',
            });
        }

        const userAttendance = user.attendance;

        const specificAttendance = userAttendance.find(entry => entry._id.toString() === attendanceId);

        if (!specificAttendance) {
            return res.status(404).json({
                success: false,
                error: 'Attendance entry not found',
            });
        }

        if (status !== undefined) {
            specificAttendance.status = status;
        }

        if (date) {
            specificAttendance.date = date;
        }

        await user.save();

        res.status(200).json({
            success: true,
            specificAttendance,
        });
    } catch (error) {
        console.error(`Error editing user attendance: ${error.message}`);
        next(error);
    }
};
