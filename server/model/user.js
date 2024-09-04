const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName :{
        type:String,
        require:true,
        trim:true
    },
    lastName :{
        type:String,
        require:true,
        trim:true
    },
    email :{
        type:String,
        require:true,
        trim:true
    },
    password :{
        type:String,
        require:true,
    },
    confirmPassword :{
        type:String,
        require:true,
    },
    contactNumber:{
        type:Number,
        require:true
    },
    accountType :{
        type:String,
        enum:["Admin","Student","Instructor"],
        require:true,
    },
    additionalDetails : [{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:"Profile"
    }],
    courses :[ {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:"Course"
    }],
    image:{
        type:String,
        require:true
    },
    courseProgress : [{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:"CourseProgress"
    }],

    token:{
        type:String
    },
    resetPasswordExpires:{
        type:Date
    }
})

module.exports = mongoose.model("User", userSchema)