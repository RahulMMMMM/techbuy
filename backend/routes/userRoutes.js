const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.route('/')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

router.route('/signup')
    .post(userController.createUser)

module.exports = router