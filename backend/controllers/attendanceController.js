const catchAsyncError = require('../middleware/catchAsyncError');
const newUser = require('../models/newUserModel');
const ErrorHandler = require('../utils/errorHanlder');

exports.updateAttendanceStatus = catchAsyncError(async (req, res, next) => {
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
                // Attendance for this date already exists, update the status
                user.attendance[existingAttendanceIndex].status = status;
                updatedAttendance.push(user.attendance[existingAttendanceIndex]);
            } else {
                // Attendance for this date doesn't exist, add new attendance
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
