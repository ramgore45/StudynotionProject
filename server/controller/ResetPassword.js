const User = require("../model/user")
require("dotenv").config()
const JWT = require("jsonwebtoken")
const mailSender = require("../utils/mailsender")
const crypto = require("crypto")
const bcrypt = require("bcrypt")

// reset Password Token
exports.resetPasswordToken = async (req,res)=> {
    try{
        // fetch email from request body
        const {email} = req.body.email
        // Check user for This email, email validation
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({
                success:false,
                message:"This USer is not Present"
            })
        }
        // generate token
        const token = crypto.randomUUID()

        // update user by adding token and expiration time :-- How
        const updateDetails = await User.findOneAndUpdate(
                                            {email:email},
                                            {
                                                token:token,
                                                resetPasswordExpires:Date.now() + 5*60*1000
                                            },
                                            {new:true}
                                            ) 
        // Link  Generate or Create URl
        const url = `http://localhost:3000/update-password/${token}`
        // Send MAIL containing the URL
        await mailSender(email,
                        "Password Reset Link",
                        `Password Reset Link is ${url}`
                        )

        return res.status(200).json({
            success:true,
            message:"Email sent successfuly for Password Reset ,please check your Email"
        })
        
    }
    catch(error){
        console.log(error)
        return res.status(404).json({
            success:false,
            message:"Something went Wrong During Reseting Password"
        })
    }
}

// reset password 
exports.resetPassword = async (req,res)=>{
    try{
        // DAta fetch
        const {password, confirmPassword, token} = req.body
        // Validation
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and Confirm Password doesnt matching" 
            })
        }
        // get user details from Db using token
        const userDetails = await User.findOne({token})
        // if non entry - invalid Token 
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"Token is not matching" 
            })
        }
        // Token time check
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(400).json({
                success:false,
                message:"Your token is expired, please regenerate Token " 
            })
        }
        // HASH password
        const hashedPass = await bcrypt.hash(password , 10)
        // Password update in DB or user
        await User.findOneAndUpdate({token:token},
                                    {password:hashedPass},
                                    {new:true}
                                    )

        return res.status(200).json({
            success:true,
            message:"Password Reset Successfully"
        })
    }
    catch(error){
        console.log(error)
        return res.status(404).json({
            success:false,
            message:"Reset Password is failed due to some Issues" 
        })
    }
}