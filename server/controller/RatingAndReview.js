const RatingAndReviews = require("../model/ratingAndReview")
const Course = require("../model/course")
const { Mongoose } = require("mongoose")

// create Rating And review
exports.createRatingAndReview=async(req,res)=>{
    try{
        // get user id and course id
        const userId = req.user.userId

        // fetchdata from req.body
        const {rating,review,courseId} = req.body
        // check user is enrolled or not
        const courseDetails = await Course.find({
            _id:courseId,
            studentEnrolled:{$elemMatch:{$eq:userId}}
        })

        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:"Course Detals not found"
            })
        }

        // check user already review the course
        const alreadyReviewed = await RatingAndReviews.findOne({
            user:userId,
            course:courseId
        })

        if(alreadyReviewed){
            return res.status(404).json({
                success:false,
                message:"User is already rating/review course"
            })
        }

        // create rating and review
        const ratingReview = await RatingAndReviews.create({
            rating , review, 
            course:courseId,
            user:userId
        })
        // update course with rating and review
        const updatedCourseDetails = await Course.findByAndUpdate(
            {_id:courseId},
            {$push:{
                ratingAndReview:ratingReview._id
            }},
            {new:true}
        )
        console.log(updatedCourseDetails)

        return res.status(200).json({
            success:true,
            message:"Rating and Review Created successdully",
            ratingAndReview:ratingReview,
        })
    }
    catch(error){
        console.log(error)
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

// Get Averaage Rating and Review
exports.getAvgRating = async(req,res)=>{
    try{
        // get courseId
        const courseId = req.body.courseId

        // calculate Avg Rating
        const result  = await RatingAndReviews.aggregate([
            {
                $match:{
                    course:new Mongoose.Types.ObjectId(courseId)
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"}
                }
            }
        ])

        if(result.length > 0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating
            })
        }

        // rating not exist
        return res.status(200).json({
            success:true,
            message:"Average rating is 0 , no ratings given til now",
            averageRating:0
        })

    }
    catch(error){
        console.log(error)
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

// Get Rating And Review
exports.getAllRatingAndReview = async(req,res)=>{
    try{
        const allRatingAndReview = await RatingAndReviews.find({})
                                            .sort({rating:"desc"})
                                            .populate({
                                                path:"user",
                                                select:"firstName lastName email image",
                                            })
                                            .populate({
                                                path:"course",
                                                select:"courseName"
                                            })
                                            .exec()
        return res.status(200).json({
            success:true,
            message:"Allrevew fetch successfully",
            allRatingAndReview,
        })
    }
    catch(error){
        console.log(error)
        return res.status(400).json({
            success : false,
            message:error.message
        })
    }
}

