const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { addUser, getAllUsers, deleteEmployee, updateUser, getOneUserDetails } = require('../controllers/addUserController');
const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/newuser').post(addUser)
router.route('/allusers').get(getAllUsers)
router.route('/delete/:id').delete(deleteEmployee)
router.route('/updateuser/:id').put(updateUser)
router.route('/user/:id').get(getOneUserDetails)

module.exports = router;
