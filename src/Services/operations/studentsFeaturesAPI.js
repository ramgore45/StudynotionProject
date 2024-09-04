import toast from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import rzpLogo from '../../assets/Logo/rzp_logo.png' 
import { setPaymentLoading } from "../../reducer/slice/courseSlice"
import { resetCart } from "../../reducer/slice/cartSlice"

const { studentEndpoints } = require("../apis")

{/* LOad the Script  */} 
{/* To open modul, Create Option object . Call through options */}

const {COURSE_PAYMENT_API,COURSE_VERIFY_API,SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints

function loadScript(src){
    return new Promise((resolve)=>{
        const script = document.createElement("script")
        script.src = src

        script.onload=()=>{
            resolve(true)
        }
        script.onerror=()=>{
            resolve(false)
        }
        document.body.appendChild(script)
    })
}


export async function buyCourse(token,courses,userDetails,navigate,dispatch){
    const toastId = toast.loading("Loading...")

    try{
        // load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

        if(!res){
            toast.error("Razorpay SDK is failed to load")
            return
        }
        // initiate the order
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, 
                                            {courses},
                                            {
                                                Authorization:`Bearer ${token}`,
                                            })
                        
        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message)
        }
        console.log("PAYMENT OPTIONS START HERE",orderResponse)
        const options = {
            key:process.env.RAZORPAY_KEY_ID ,
            currency:`${orderResponse.data.message.currency}`,
            amount:`${orderResponse.data.message.amount}`,
            order_id:orderResponse.data.message.id,
            name:"StudyNotion",
            description:"Thank you for Purchasing the Course",
            image: rzpLogo,
            prefill:{
                name:`${userDetails.firstName} ${userDetails.lastName}`,
                email:userDetails.email
            },
            handler:function (response) {
                // send successful wala mail
                sendPaymentSuccessEmail(response,orderResponse.data.message.amount , token)
                // verify payment
                verifyPayment({...response,courses},token,navigate,dispatch)
            }
        }

        const paymentObject = new window.Razorpay(options)
        console.log("PaymentObject",paymentObject)
        paymentObject.open()

        paymentObject.on("payment failed",function (response){
            toast.error("OOOps payent failed")
            console.log(response.error)
        })

    }
    catch(error){
        console.log("Payemnt API Error",error)
        toast.error("coulsNot make payment...",error)
    }
    toast.dismiss(toastId)
}


async function sendPaymentSuccessEmail(response,amount,token){
    try{
        await apiConnector("POST",SEND_PAYMENT_SUCCESS_EMAIL_API,{
            orderId:response.razorpay_order_id,
            paymentId:response.razorpay_payment_id,
            amount,
        },{
            Authorization:`Bearer ${token}`
        })
    }
    catch(error){
        console.log("Send Payment Succes email failed....", error)
    }
}


async function verifyPayment(bodyData,token,navigate,dispatch){
    const toastId = toast.loading("LOading .....")
    dispatch(setPaymentLoading(true))

    try{
        const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization:` Bearer ${token}`
        })

        if(!response.data.success){
            throw new Error (response.data.message)
        }

        toast.success("payment Successful, you are added to the course")
        navigate("/dashboard/enrolled-courses")
        dispatch(resetCart())

    }catch(error){
        console.log("Payment verification Error", error)
        toast.error("Could not verify paymnet")
    }
    toast.dismiss(toastId)
    dispatch(setPaymentLoading(false))
}