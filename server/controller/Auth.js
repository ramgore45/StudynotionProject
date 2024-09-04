const User = require('../model/user') 
const OTP = require("../model/otp")
const otpGenerator = require('otp-generator')
const Profile = require("../model/profile") 
const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")
const mailSender = require('../utils/mailsender')
require('dotenv').config()

exports.sendOtp = async(req,res)=>{
    try{
        // fetch email from request body
        const {email } = req.body

        const checkUser = await User.findOne({email})

        if(checkUser){
            return res.status(401).json({
                success:false,
                message:"User is already Exist"
            })
        }
        console.log('otp start')
        // Generate OTP
        var otp = otpGenerator.generate(6 ,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        })
        console.log(otp)

        // check OTP uniqeue
        const result = await OTP.findOne({otp : otp})
        console.log("otp found",result)

        while(result){
            otp = otpGenerator.generate(6 ,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            }) 
           
        }

        const otpPayLoad = {email , otp}

        const otpBody = await OTP.create(otpPayLoad)
        console.log(otpBody)

        return res.status(200).json({
            success:true,
            otp,
            message:"Otp Sent Successfully"
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error While sending OTP"
        })
    }
}

// Sign up handler 
exports.signUP = async(req , res) =>{
  try{    // data fetch from body
    const {firstName, lastName , email, password ,confirmPassword , accountType , otp} = req.body
    
    // validate krlo
    if(!firstName || !lastName|| !email || !password || !confirmPassword || !otp){
        return res.status(403).json({
            success:false,
            message:'Please fill all the Details'
        })
    }

    // 2 password match krlo
    if(password!==confirmPassword){
        return res.status(400).json({
            success:false,
            message:'Password and Conform Password Value doesnt Macthing'
        })
    }

    // Checking eXISTING user
    const existingUser = await User.findOne({email})
    if(existingUser){
        return res.status(403).json({
            success:false,
            message:'User already Exist Please try LogIn Directly'
        })
    }
    // find most recent otp
    const response = await OTP.find({email}).sort({createdAt:-1}).limit(1)
    console.log("Here is most recent OTP",response)
    const recentOtp = response[0].otp
    console.log("Recent Otp ",recentOtp)

     // validateOTP
    if(recentOtp.length===0){
        return res.status(403).json({
            success:false,
            message:'OTP not found'
        })
    }else if(otp !== recentOtp){
        return res.status(403).json({
            success:false,
            message:'OTP doesnt match'
        })
    }

    // Hashing PAssword
    const hashPassword = await bcrypt.hash(password , 10)

    const profileDetails = await Profile.create({
        gender:null,
        dateOfBirth:null,
        about:null,
        contactNumber:null
    })

    // Entry create in DB
    const user = await User.create({
        firstName,
        lastName,
        email,
        password:hashPassword,
        accountType,
        additionalDetails:profileDetails._id,
        image:`https://api.dicebar.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    })

    // return Res.
    return res.status(200).json({
        success:true,
        user:user,
        message:"Sign up Successfully, account created"
    })
  }
  catch(error){
    console.log(error)
    return res.status(400).json({
        success:false,
        message:'User is not registered please try again after Sometime Later'
    })
  }
}


// LogIn handler
exports.logIN = async (req,res)=>{
    try{
        // get data from request body -Login Page
        const {email , password} = req.body
        // Validation
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"Please fill all the details"
            })
        }

        // user Exist or not
        const user = await User.findOne({email}).populate("additionalDetails")
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not Regitered please sign up firstly"
            })
        }

        // generate JWT , after password matching
        // Generate JWT token and Compare Password

        const hashPass = await bcrypt.compare(password, user.password)

    if (hashPass) {
        const token = JWT.sign(
          { email: user.email, id: user._id, role: user.role },
          process.env.JWT_SECRET,
          {
            expiresIn: "24h",
          }
        )
  
        // Save token to user document in database
        user.token = token
        user.password = undefined
        // Set cookie for token and return success response
        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        }
        res.cookie("token", token, options).status(200).json({
          success: true,
          token,
          user,
          message: `User Login Success`,
        })
      } else {
        return res.status(401).json({
          success: false,
          message: `Password is incorrect`,
        })
      }
        
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:"There is error During LogIn Please try again after sometime later"
        })
    }
}

// ChangePassword
exports.changePassword = async(req , res)=>{
    try{
        // get Data from request body
        const {email,oldPassword , newPassword, confirmPassword} = req.body
        // get old password , new password , confirmPassword
        if(!email || !oldPassword || !newPassword || !confirmPassword){
            return res.status(400).json({
                success:false,
                messgae:"Please Fill all the details"
            })
        } 

        const user = await User.find({email})
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User is not exist, Please write proper email"
            })
        }

        const checkPass = await bcrypt.compare(oldPassword , user.password)
        // validation
        if(!checkPass){
            return res.status(400).json({
                success:true,
                message:"old password is wrong please check again"
            })
        }
        
        if(newPassword !== confirmPassword){
            return res.status(400).json({
                success:false,
                messgae:"Please check value of New Password and Confirm Password"
            })
        }

        const hashPass = await bcrypt.hash(newPassword , 10)
        // update password in database
        await User.findOneAndUpdate(
                                    {email:email},
                                    {password:hashPass},
                                    {new:true}
                                    )
        // send Email - Password updated
        await mailSender(email ,
                        "StudyNotion",
                        "Password is successfully updated "
                        )
        
        res.status(200).json({
            success:true,
            message:"Password Updated Successfully"
        })
    }
    catch(error){
        console.log(error)
        res.status(400).json({
            success:false,
            message:"Error occured during Updating Password"
        })
    }
}
