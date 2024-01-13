const express = require('express');
const { registerUser, loginUser, logoutUser, getAllUsers, getUserDetails, setUserRole } = require('../controllers/userController');
const { deleteEmployee, addNewEmployee, updateEmployee, getAllEmployees, getOneEmployeeDetails } = require('../controllers/addUserController');
const { updateAttendanceStatus, getUserAttendanceDetails } = require('../controllers/attendanceController');
const { financeController, getAllExpenses, getMonthlyExpenses, getCurrentMonthExpenses } = require('../controllers/financeController');
const { createRevenue } = require('../controllers/revenueController');
const { isAuthenticatedAdmin } = require('../middleware/Authentication');
const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.route('/allusers').get(getAllUsers)
router.route('/user/:id').get(getUserDetails)
router.route('/setrole/:id').put(setUserRole)
router.route('/newemployee').post( addNewEmployee)
router.route('/allemployees').get( getAllEmployees)
router.route('/delete/:id').delete(deleteEmployee)
router.route('/updateuser/:id').put(updateEmployee)
router.route('/user/:id').get(getOneEmployeeDetails)
router.route('/attendance/:id').put(updateAttendanceStatus)
router.route('/finance').post(financeController)
router.route('/allexpenses').get(getAllExpenses)
router.route('/revenue').post(createRevenue)
router.route('/getExpenses').get(getCurrentMonthExpenses)

module.exports = router;
