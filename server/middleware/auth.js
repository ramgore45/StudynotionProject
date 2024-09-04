const JWT = require("jsonwebtoken")
require("dotenv").config()
const User = require("../model/user")

exports.auth = async(req,res,next)=>{
    try{
        // get TOKEN from request cookie and body and header
        
        const token = req.header("Authorization").replace("Bearer ", "") || req.cookies.token || req.body.token
        console.log("Auth Token ", token)
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is Missing"
            })
        }

        // Verify token
        try{
            const decode = JWT.verify(token , process.env.JWT_SECRET)
            console.log(decode)
            req.user = decode
        }
        catch(e){
            console.log(e)
            return res.status(400).json({
                success:false,
                message:"Token is Invalid"
            })
        }

        next()
   }
    catch(error){
        console.log(error)
        return res.status(400).json({
            success:false,
            message:"Authorization is Failed"
        })
    }
}

// Is Student then 
exports.isStudent = async (req , res , next)=> {
    try{
        const userDetails = await User.findOne({ email: req.user.email });
        if(userDetails.accountType !== "Student"){
            return res.status(404).json({
                success:false,
                message:"This Is protected route for Students"
            })
        }
        next()
    }
    catch(error){
        console.log(error)
        return res.status(400).json({
            success:false,
            message:"USer Role Cannot Be Verified"
        })
    }
} 

// Is Instructor then
exports.isInstructor = async (req , res , next)=> {
    try{
        const userDetails = await User.findOne({ email: req.user.email });
        if(userDetails.accountType !== "Instructor"){
            return res.status(404).json({
                success:false,
                message:"This Is protected route for Instructor"
            })
        }
        next()
    }
    catch(error){
        console.log(error)
        return res.status(400).json({
            success:false,
            message:"USer Role Cannot Be Verified"
        })
    }
} 

// Is Admim then
exports.isAdmin = async (req , res , next)=> {
    try{
        const userDetails = await User.findOne({ email: req.user.email });
        if(userDetails.accountType !== "Admin"){
            return res.status(404).json({
                success:false,
                message:"This Is protected route for Admin"
            })
        }
        next()
    }
    catch(error){
        console.log(error)
        return res.status(400).json({
            success:false,
            message:"USer Role Cannot Be Verified"
        })
    }
} 