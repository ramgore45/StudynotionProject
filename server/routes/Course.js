const express = require('express')
const router = express.Router()

const { createCourse, getAllCourses, getCourseDetails, editCourse, getInstructorCourses, getFullCourseDetails } = require('../controller/course')
const { createSection, updateSection, deleteSection } = require('../controller/Section')
const { createSubsection, updateSubSection, deleteSubSection } = require('../controller/Subsection')
const { createCategory, showAllCategorys, getCategoryPageDetails } = require('../controller/category')
const { createRatingAndReview, getAvgRating, getAllRatingAndReview } = require('../controller/RatingAndReview')

const { auth, isInstructor, isAdmin, isStudent } = require('../middleware/auth')
const { updateCourseProgress } = require('../controller/CourseProgress')

// Instructor authorize
router.post('/createCourse', auth , isInstructor , createCourse )
router.post("/editCourse", auth, isInstructor, editCourse)
router.post('/addSection', auth , isInstructor , createSection )
router.post('/updateSection' ,auth , isInstructor , updateSection )
router.post('/deleteSection', auth , isInstructor , deleteSection )
router.post('/createSubSection', auth , isInstructor , createSubsection )
router.post('/updateSubSection', auth , isInstructor , updateSubSection )
router.post('/deleteSubSection', auth , isInstructor , deleteSubSection )

router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
router.get('/getAllCourses', getAllCourses )
router.post('/getCourseDetails', getCourseDetails )
router.post('/getFullCourseDetails', getFullCourseDetails )

router.post('/updateCourseProgress',auth, isStudent, updateCourseProgress)

// Admin Authorized
router.post('/createCategory' , auth , isAdmin , createCategory)
router.get('/showAllCategorys', showAllCategorys)
router.post('/getCategoryPageDetails', getCategoryPageDetails)

// Student Auth
router.post('/createRatingReviews', createRatingAndReview)
router.get('/getAvgRatingReview', getAvgRating)
router.get('/getAllRatingReview', getAllRatingAndReview)


module.exports = router