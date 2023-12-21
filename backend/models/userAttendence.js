const mongoose = require('mongoose');

// Create a schema for attendance records
const AttendanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  status: {
    type: String,
    enum: ['Present', 'Absent', 'Late', 'Leave'], 
    default: 'Present'
  },
});

const Attendance = mongoose.model('Attendance', AttendanceSchema);

module.exports = Attendance;
