const Attendance = require('../models/userAttendence')

// Create an attendance record
exports.createAttendance = async (req, res) => {
  try {
    const { userId, date, status } = req.body; // Assuming these fields come from the request body

    // Create a new attendance record
    const attendance = new Attendance({
      userId,
      date,
      status,
    });

    // Save the attendance record to the database
    const newAttendance = await attendance.save();

    res.status(201).json(newAttendance); // Send back the newly created attendance record
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
