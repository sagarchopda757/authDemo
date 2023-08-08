const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller')
const {isLogin} = require('../middleware/login')
router.post('/signup',authController.signup)
router.post('/login',authController.login)
router.post('/sociallogin',authController.socialLogin)
router.get('/me',isLogin,authController.me)


module.exports = router;