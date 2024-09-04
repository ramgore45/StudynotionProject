const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    courseName :{
        type:String,
        require:true,
        trim:true
    },
    courseDescription :{
        type:String,
        require:true,
        trim:true
    },
    instructor :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true,
    },
    whatYouWillLearn :{
        type:String,
        require:true,
    },
    courseContent : [{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:"Section",
    }],
    // course : [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     require: true,
    //     ref:"Section "
    // }],
    ratingAndReviews : [{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:"RatingAndReview "
    }],
    price:{
        type:Number,
        require:true
    },
    thumbnail:{
        type:String,
        require:true
    },
    category:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category",
        require:true
    }],
    studentEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User"
    }],
    instructions: {
        type: [String],
    },
    status: {
        type: String,
        enum: ["Draft", "Published"],
    },
    createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Course", courseSchema)