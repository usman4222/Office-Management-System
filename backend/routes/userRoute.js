const express = require('express');
const { registerUser, loginUser, logoutUser, getAllUsers, getUserDetails, setUserRole, deleteUser } = require('../controllers/userController');
const { deleteEmployee, addNewEmployee, updateEmployee, getAllEmployees, getOneEmployeeDetails } = require('../controllers/addUserController');
const { markAttendance, getUserAttendanceDetails, updateAttendance, getSpecificUserAttendance, getSingleAttendance, editSingleAttendance } = require('../controllers/attendanceController');
const { financeController, getAllExpenses, getMonthlyExpenses, getCurrentMonthExpenses } = require('../controllers/financeController');
const { createRevenue } = require('../controllers/revenueController');
const { isAuthenticatedAdmin, isAuthenticated, authorizeRole, isAuthenticatedUser } = require('../middleware/Authentication');
const router = express.Router()

router.route('/login').post(loginUser)
router.route('/logout').get(isAuthenticatedUser, logoutUser)
router.route('/newemployee').post(addNewEmployee)
router.route('/allemployees').get(getAllEmployees, authorizeRole("admin"));
router.route('/delete/:id').delete(deleteEmployee)
router.route('/updateemployee/:id').put(updateEmployee)
router.route('/employee/:id').get(getOneEmployeeDetails)
router.route('/attendance/:id').put(markAttendance)
router.route('/editsingleattendance/:id/:attendanceId').put(editSingleAttendance);
router.route('/getuserattendance/:id').get(getSpecificUserAttendance)
router.route('/getsingleattendance/:id/:attendanceId').get(getSingleAttendance);
router.route('/finance').post(financeController)
router.route('/allexpenses').get(getAllExpenses)
router.route('/revenue').post(createRevenue)
router.route('/getExpenses').get(getCurrentMonthExpenses)

module.exports = router;
