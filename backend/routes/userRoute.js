const express = require('express');
const { registerUser, loginUser, logoutUser, getAllUsers, getUserDetails, setUserRole, deleteUser } = require('../controllers/userController');
const { deleteEmployee, addNewEmployee, updateEmployee, getAllEmployees, getOneEmployeeDetails } = require('../controllers/addUserController');
const { updateAttendanceStatus, getUserAttendanceDetails } = require('../controllers/attendanceController');
const { financeController, getAllExpenses, getMonthlyExpenses, getCurrentMonthExpenses } = require('../controllers/financeController');
const { createRevenue } = require('../controllers/revenueController');
const { isAuthenticatedAdmin, isAuthenticated, authorizeRole, isAuthenticatedUser } = require('../middleware/Authentication');
const router = express.Router()

router.route('/login').post(loginUser)
router.route('/logout').get(isAuthenticatedUser, logoutUser)
router.route('/newemployee').post(isAuthenticatedUser, addNewEmployee)
router.route('/allemployees').get(isAuthenticatedUser, getAllEmployees);
router.route('/delete/:id').delete(isAuthenticatedUser, deleteEmployee)
router.route('/updateemployee/:id').put(isAuthenticatedUser, updateEmployee)
router.route('/employee/:id').get(isAuthenticatedUser, getOneEmployeeDetails)
router.route('/attendance/:id').put(isAuthenticatedUser, updateAttendanceStatus)
router.route('/finance').post(isAuthenticatedUser, financeController)
router.route('/allexpenses').get(isAuthenticatedUser, getAllExpenses)
router.route('/revenue').post(isAuthenticatedUser, createRevenue)
router.route('/getExpenses').get(isAuthenticatedUser, getCurrentMonthExpenses)

module.exports = router;
