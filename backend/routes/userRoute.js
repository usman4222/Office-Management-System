const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { addUser, getAllUsers, deleteEmployee } = require('../controllers/addUserController');
const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/newuser').post(addUser)
router.route('/allusers').get(getAllUsers)
router.route('/delete/:id').delete(deleteEmployee)

module.exports = router;
