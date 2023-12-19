const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { addUser, getAllUsers } = require('../controllers/addUserController');
const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/newuser').post(addUser)
router.route('/allusers').get(getAllUsers)

module.exports = router;
