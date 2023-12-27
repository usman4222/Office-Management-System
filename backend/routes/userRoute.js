const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { addUser, getAllUsers, deleteEmployee, updateUser, getOneUserDetails } = require('../controllers/addUserController');
const { updateAttendanceStatus, getUserAttendanceDetails } = require('../controllers/attendanceController');
const { financeController, getAllExpenses } = require('../controllers/financeController');
const { createRevenue } = require('../controllers/revenueController');
const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/newuser').post(addUser)
router.route('/allusers').get(getAllUsers)
router.route('/delete/:id').delete(deleteEmployee)
router.route('/updateuser/:id').put(updateUser)
router.route('/user/:id').get(getOneUserDetails)
router.route('/attendance/:id').put(updateAttendanceStatus)
router.route('/finance').post(financeController)
router.route('/allexpenses').get(getAllExpenses)
router.route('/revenue').post(createRevenue)

module.exports = router;
