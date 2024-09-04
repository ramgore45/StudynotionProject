const express = require('express')
const router = express.Router()

const { updateProfile, getAllUserDetails, deleteAccount, updateDisplayPicture, getEnrolledCourses, instructorDashboard } = require('../controller/Profile')
const { auth, isInstructor } = require('../middleware/auth')


router.post('/updateProfile' ,auth , updateProfile)
router.get('/getProfileDetails' , auth , getAllUserDetails)
router.delete('/deleteAccount' , auth , deleteAccount)
router.post('/updateDisplayPicture' , auth , updateDisplayPicture)
router.get('/getEnrolledStudents' , auth , getEnrolledCourses)
router.get('/instructorDashboard' , auth , isInstructor, instructorDashboard)

module.exports = router