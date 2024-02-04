const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const loginLimiter = require('../middleware/loginLimiter')


router.route('/login')
    .post(loginLimiter,authController.login)

router.route('/logout')
    .post(authController.logout)
    
router.route('/current-user')
    .get(authController.currentUser)

router.route('/signup')
    .post(authController.createUser)

router.route('/delete-user')
    .post(authController.deleteUser)

router.route('/update-cart')
    .post(authController.changeCart)

router.route('/update-saved')
    .post(authController.changeSaved)

router.route('/get-info')
    .get(authController.getInfo)

router.route('/update-user')
    .post(authController.updateUser)

router.route('/add-address')
    .post(authController.changeAddress)

router.route('/get-addresses')
    .get(authController.getAddresses)

module.exports = router
