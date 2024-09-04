const Profile = require("../model/profile")
const User = require("../model/user")
const Course = require("../model/course")
const { uploadImageToCludinary } = require("../utils/imageUploader")

// update profile already exists
exports.updateProfile = async(req,res)=>{
    try{
        // get data
        const {gender , dateOfBirth="" , about="" , contactNumber} = req.body
        // get userId // fetch from decode ->user-> authentication 
        const id = req.user.id
        // validation
        if(!contactNumber || !gender || !id){
            return res.status(404).json({
                success:false,
                message:"Please fill all profile details"
            })
        }

        // find profile
        const userDetails = await User.findById(id)
        const profileId = userDetails.addiitionalDetails
        const profileDetails = await Profile.findById(profileId)

        // update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.gender = gender;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;

        await profileDetails.save()

        // return reponse
        return res.status(200).json({
            success:true,
            message:"Updated profile",
            profileDetails
        })
    }
    catch(error){
        console.log(error)
        return res.status(400).json({
            success:false,
            message:"Error during Updating Profile",
            error:error.message
        })
    }
}

// Delete Account
// Explore scheduling delete account (ChronJob)
exports.deleteAccount = async(req,res) =>{
    try{
        // get user id
        const id  = req.user.id
        // validation
        const userDetails = await User.findById(id)
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"no user details for deletion"
            })
        }
        // additional details / profile delete
        await Profile.findByIdAndDelete({_id:userDetails.addiitionalDetails})
        // user deleted 
        // HomeWork : Scheduling Job
        await User.findByIdAndDelete({_id:id})
        // homeWork :- Student enrolled delete

        return res.status(200).json({
            success:true,
            message:"User deleted successfully"
        })

    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            messgae:"deletion failed"
        })
    }
}

// get AllUser details
exports.getAllUserDetails=async(req,res)=>{
    try{
        // get user by id
        const id = req.user.id
        // validation
        const userDetails = await User.findById(id).populate("additionalDetails").exec()

        return res.status(200).json({
            success:true,
            message:"all details fetch ",
            userDetails:userDetails
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            messgae:"Get all user details failed"
        })
    }
}

exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCludinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
  
exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};

exports.instructorDashboard = async(req,res)=>{
  try{
    const courseDetails = await Course.find({
      instructor:req.user.id
    })

    const courseData = await courseDetails.map((course)=>{
      const totalStudentsEnrolled = course.studentEnrolled.length
      const totalAmountGenerated = totalStudentsEnrolled * course.price

      const courseDataWithStats = {
        _id:course._id,
        courseName:course.courseName,
        courseDescription:course.courseDescription,
        totalStudentsEnrolled,
        totalAmountGenerated
      }

      return courseDataWithStats
    })

    return res.status(200).json({
      courses:courseData,
      success:true,
      message:"Instructor Dashboard Fetch"
    })

  }catch(error){
    console.log(error)
    res.status(500).json({
      success:false,
      message:"internal server error"
    })
  }
}