const express = require('express')
const router = express.Router()


const { verifySignature, capturePayment, sendPaymentSuccessEmail } = require('../controller/Payment')
const { isStudent, auth } = require('../middleware/auth')

router.post('/capturePayment' , auth , isStudent , capturePayment)
router.post('/verifyPayment' , auth , isStudent , verifySignature)
router.post('/sendPaymentSuccessEmail',auth, isStudent, sendPaymentSuccessEmail)

module.exports = router