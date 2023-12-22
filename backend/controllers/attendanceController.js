const catchAsyncError = require('../middleware/catchAsyncError');
const newUser = require('../models/newUserModel');
const ErrorHandler = require('../utils/errorHanlder');

exports.updateAttendanceStatus = catchAsyncError(async (req, res, next) => {
    try {
        const { id } = req.params;
        const { attendanceStatus } = req.body;

        console.log('ID:', id);
        console.log('Attendance Status:', attendanceStatus);

        if (!attendanceStatus || attendanceStatus.length === 0) {
            return res.status(400).json({ success: false, message: 'Attendance status is missing or empty' });
        }

        const user = await newUser.findByIdAndUpdate(
            id,
            { attendance: attendanceStatus }, // Update the 'attendance' field with the provided status
            { new: true } // To receive the updated document
        );

        if (!user) {
            return next(new ErrorHandler('User Not found', 404));
        }

        return res.status(200).json({ success: true, message: 'Attendance status updated successfully', user });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal Server Error', error });
    }
});