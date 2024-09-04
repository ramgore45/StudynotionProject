const mongoose = require("mongoose")
const mailSender = require("../utils/mailsender")
const emailTemplate =require("../mail/templates/emailVerificationTemplate")

const otpSchema = new mongoose.Schema({
    email :{
        type:String,
        require:true,
    },
    otp :{
        type:String,
        require:true
    },
    createdAt :{
        type:Date,
        default:Date.now(),
        expires: 5*60
    },
    contactNumber :{
        type:String,
        trim:true
    }, 
})

// function send to email whit OTP
async function sendVerificationEmail (email ,otp){
 try{
    const mailResponse = await mailSender(email , 'verificationEmail from StudyNotion' , emailTemplate(otp))
    console.log('Successfully Sending Email ', mailResponse)
 }
 catch(error){
    console.log("error occured during Email sending" , error)
 }
}

otpSchema.pre('save' ,async (next)=>{
    if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
} )

module.exports = mongoose.model("OTP", otpSchema)