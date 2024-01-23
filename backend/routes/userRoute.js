const express = require('express');
const { registerUser, loginUser, logoutUser, getAllUsers, getUserDetails, setUserRole, deleteUser } = require('../controllers/userController');
const { deleteEmployee, addNewEmployee, updateEmployee, getAllEmployees, getOneEmployeeDetails } = require('../controllers/addUserController');
const { markAttendance, getUserAttendanceDetails, updateAttendance, getSpecificUserAttendance, getSingleAttendance, editSingleAttendance } = require('../controllers/attendanceController');
const { financeController, getAllExpenses, getMonthlyExpenses, getCurrentMonthExpenses } = require('../controllers/financeController');
const { createRevenue, getAllRevenue, getCurrentMonthRevenue } = require('../controllers/revenueController');
const { isAuthenticatedUser, authorizeRole } = require('../middleware/Authentication')
const router = express.Router()

// router.use(isAuthenticatedUser)

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.route('/newemployee').post(isAuthenticatedUser,addNewEmployee)
router.route('/allemployees').get(isAuthenticatedUser, getAllEmployees)
router.route('/delete/:id').delete(isAuthenticatedUser,deleteEmployee)
router.route('/updateemployee/:id').put(isAuthenticatedUser,updateEmployee)
router.route('/employee/:id').get(isAuthenticatedUser,getOneEmployeeDetails)
router.route('/attendance/:id').put(isAuthenticatedUser,markAttendance)
router.route('/editsingleattendance/:id/:attendanceId').put(isAuthenticatedUser,editSingleAttendance)
router.route('/getuserattendance/:id').get(isAuthenticatedUser,getSpecificUserAttendance)
router.route('/getsingleattendance/:id/:attendanceId').get(isAuthenticatedUser,getSingleAttendance)
router.route('/finance').post(isAuthenticatedUser,authorizeRole("admin"),financeController)
router.route('/allexpenses').get(isAuthenticatedUser, authorizeRole("admin"),getAllExpenses)
router.route('/getExpenses').get(isAuthenticatedUser, authorizeRole("admin"), getCurrentMonthExpenses)
router.route('/revenue').post(isAuthenticatedUser, authorizeRole("admin"), createRevenue)
router.route('/allrevenues').get(isAuthenticatedUser, authorizeRole("admin"), getAllRevenue)
router.route('/currentmonthrevenue').get(isAuthenticatedUser, authorizeRole("admin"), getCurrentMonthRevenue)

module.exports = router;
