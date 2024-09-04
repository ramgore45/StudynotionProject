const express = require("express")
const router = express.Router()


const { logIN, signUP, sendOtp, changePassword } = require("../controller/Auth")
const { resetPasswordToken, resetPassword } = require("../controller/ResetPassword")
const { auth } = require("../middleware/auth")


router.post('/login', logIN)
router.post('/signup', signUP)
router.post('/sendotp', sendOtp)
router.post('/changepassword',auth, changePassword)

router.post('/resetpasswordtoken',resetPasswordToken)
router.post('/resetpassword',resetPassword)

module.exports = router