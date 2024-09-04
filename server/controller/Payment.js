const Instance = require("../config/razorpay")
const Course = require("../model/course")
const User = require("../model/user")
const mailSender = require("../utils/mailsender")
const courseEnrolledEmail = require("../mail/templates/courseEnrollmentEmail")
const  Mongoose  = require("mongoose")
const {crypto} = require("crypto")
const courseProgress = require("../model/courseProgress")
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail")

exports.capturePayment = async(req,res)=>{

    const {courses} = req.body
    console.log(courses)
    const userId = req.user.id
    console.log(userId)

    if(courses.length===0 || !userId){
        return res.status(400).json({
                    success:false,
                    message:"please provide valid userId and CourseId"
         })
    }

    let totalAmt = 0

    for(const course_id of courses){
        let course
        try{
            course = await Course.findById(course_id)
            if(!course){
                return res.status(400).json({   
                        success:false,
                        message:"Could not found course"
                    })
            }
            const uid = new Mongoose.Types.ObjectId(userId)
            if(course.studentEnrolled.includes(uid)){
                return res.status(200).json({
                        success:true,
                        message:"student is already register"
                    })
            }

            totalAmt += course.price
        }
        catch(error){
            console.log(error)
            return res.status(500).json({
                success:false,
                message:error.message
                })  
        }

        const options = {
            amount : totalAmt*100,
            currency : "INR",
            receipt : Math.random(Date.now()).toString(),
        }

        try{
            const paymentResponse = await Instance.instance.orders.create(options)
            console.log("PAYMENT RESPONSE END",paymentResponse)
            res.status(200).json({
                success:true,
                message:paymentResponse
            })

        }
        catch(error){
            console.log(error)
            res.status(500).json({
                success:false,
                message:error.message
            })
        }

    }

}


// Verify the Payment
exports.verifySignature=async(req,res)=>{
    const razorpay_order_id= req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const courses = req.body?.courses
    const userId = req.user.id

    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId){
        res.status(400).json({
            success:false,
            message:"Payment Failed"
        })
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature = crypto
                .createHmac("sha256", process.env.RAZORPAY_SECRET)
                .update(body.toString())
                .digest("hex")

    if(expectedSignature === razorpay_signature){
        // Enroll krwana student ko
        await enrollStudents(courses,userId,res)

        // Return response
        return res.status(200).json({
            success:true,
            message:"Payment Verified "
        })
    }
     
    return res.status(400).json({
        success:false,
        message:"Payment Failed"
    })

}


const enrollStudents = async(courses,userId,res)=>{
    if(!courses ||!userId){
        res.status(401).json({
            success:false,
            message:"Please provide data for course and User. Enrolled failed"
        })
    }
    for(const courseId of courses){
        try{
            const enrolledCourse = await courses.FindByOneAndUpdate(
                {_id:courseId},
                {$push:{studentEnrolled:userId}},
                {new:true}
            )
            if(!enrolledCourse){
                return res.status(400).json({
                    success:false,
                    message:"Course not Found"
                })
            }

            const courseProgress = await courseProgress.create({
                courseId:courseId,
                userId:userId,
                completedVideos:[]
            })
    
            // Find the student and enrolled them in courses
            const enrolledStudents = await User.findByIdAndUpdate(userId,
                {$push:{
                    courses:courseId,
                    courseProgress:courseProgress._id
                }},
                {new:true}
                )
    
            // Send Mail to Student 
            const emailResponse = await mailSender(
                enrollStudents.email,
                `Succefully enrolled into ${enrolledCourse.courseName}` ,
                courseEnrolledEmail(enrolledCourse.courseName, `${enrolledStudents.firstName} ${enrolledStudents.firstName}`)
            )
            console.log("emailSent Successfully", emailResponse.response)
        }
        catch(errror){
            console.log(errror)
            res.status(500).json({
                success:false,
                message:errror.message
            })
        }
    }
  
}


exports.sendPaymentSuccessEmail= async(req,res)=>{
    const {orderId , paymentId,amount} = req.body
    const userId = req.user.id
    if(!orderId || !paymentId || !amount || !userId){
        res.status(400).json({
            success:false,
            message:"Plese provide necessary details"
        })
    }

    try{
        const enrolledStudent = await User.findById(userId)
        await mailSender(
            enrolledStudent.email,
            "Payment Receive",
            paymentSuccessEmail(`${enrolledStudent.firstName}`, amount/100, orderId,paymentId)
        )
    }catch(error){
        console.log("Errro in sending email",error)
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}



// exports.capturePayment=async(req,res)=>{
//     try{
//         //fetch course id , user id
//         const courseId = req.body
//         const userId = req.user.id
//         // validation
//         if(!courseId || !userId){
//             return res.status(400).json({
//                 success:false,
//                 message:"please provide valid userId and CourseId"
//             })
//         }
//         // validate course id
//         let course ; 
//         try{
//             course = await Course.findById(courseId)
//              // validate course details
//             if(!course){
//                 return res.status(400).json({
//                     success:false,
//                     message:"Course is not found"
//                 })
//             }

//             // user already pay for this course
//             const uid = new Mongoose.Schema.Types.ObjectId(userId)
//             if(course.studentsEnrolled.includes(uid)){
//                 return res.status(200).json({
//                     success:true,
//                     message:"student is already register"
//                 })
//             }
//         }
//         catch(error){
//             console.log(error)
//             return res.status(500).jon({
//                 success:false,
//                 message:error.message
//             })
//         }
//         // order create 
//         const amount = Course.price
//         const currency = 'INR'

//         const option = {
//             amount: amount*100,
//             currency:currency,
//             receipt:Math.random()(Date.now()).toString(),
//             notes:{
//                 courseId: courseId,
//                 userId
//             }
//         }

//         try{
//             // initialize the payment using RazorPay
//             const paymentResponse = await Instance.instance.orders.create(option)
//             console.log(paymentResponse)

//             res.status(200).json({
//                 success:true,
//                 message:"",
//                 courseName:course.courseName,
//                 courseDescripton : course.courseDescripton,
//                 thumbnail: course.thumbnail
//             })
//         }
//         catch(error){
//             console.log(error)
//             return res.status(400).json({
//                 success:false,
//                 message:"Could Not Init Order"
//             })
//         }
//         // return response 
//         return res.status(200).json({
//             success:true,
//             message:"Capture payment done successfully"
//         })
//     }
//     catch(error){
//         console.log(error)
//         return res.status(400).json({
//             success :false,
//             message :error.message
//     })
//     }
// }

// // verification of signature of RAZORPAY and SERVER
// exports.verifySignature=async(req,res)=>{
//     const webHookSecret = "123456789"

//     const signature = req.headers("x-razorpay-signature")

//     crypto.createHmac("sha256",webHookSecret)
//     shasum.update(JSON.stringify(req.body))
//     const digest = shasum.digest("hex")

//     if(signature === digest){
//         console.log("paymetn is authorized")

//         const {userId , courseId} = req.body.payload.paymnet.entity.notes

//         try{
//             // fuldfill the action
//             // find the course and enrolled student
//             const enrolledCourse = await Course.findByIdAndUpdate(
//                 {_id:courseId},
//                 {
//                     $push:{studentsEnrolled:userId}
//                 },
//                 {new:true}
//             )

//             if(!enrolledCourse){
//                 return res.status(400).json({
//                     success:false,
//                     message:"Course not found"
//                 })
//             }
//             console.log(enrolledCourse)

//             // find student and add the course in enroll Course
//             const enrolledStudent = await User.findByIdAndUpdate(
//                 {_id:userId},
//                 {$push:{courses:courseId}},
//                 {new:true}
//             )
//             console.log(enrolledStudent)

//             const emailResponse = await mailSender(
//                 enrolledStudent.email,
//                 "Congratulation from StudyNotion,",
//                 "You are enrolled successfuly for Course"
//             )
            
//             return res.status(200).json({
//                 success:true,
//                 message:"Signature verifed and course added successfully"
//             })
//         }
//         catch(error){
//             console.log(error)
//             return res.status(400).json({
//                 success:false,
//                 message:error.message
//             })
//         }
//     }
//     else{
//         return res.status(400).json({
//             success:false,
//             message:"invalid request, signature is not matching"
//         })
//     }
// }