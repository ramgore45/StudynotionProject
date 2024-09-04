import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { apiConnector } from '../../Services/apiconnector'
import CountryCode from '../../data/countrycode.json'
import {courseEndpoints} from '../../Services/apis'
import { useForm } from 'react-hook-form'

export const ContactUsForm = () => {

    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        reset,
        formState:{errors , isSubmitSuccessful} ,

    } = useForm()

    const submitContactForm = async(data)=>{
        console.log('Logging Data', data)
        try{
            setLoading(true)
            const response = await apiConnector("POST", courseEndpoints.CONTACT_US_API , data)
            // const response = {status:"OK"}
            console.log('logging response' , response)
            setLoading(false)
        }catch(error){
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                email:'',
                firstName:'',
                lastName:'',
                message:'',
                phoneNo:''
            })
        }
    },[reset, isSubmitSuccessful])

  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
        <div>
            <div className='flex gap-x-'>
                {/* First name */}
                <div>
                    <label htmlFor='firstName'>First Name</label>
                    <input 
                        type='text'
                        name='firstName'
                        id='firstName'
                        placeholder='Entry First Name'
                        {...register('firstName', {required:true})}
                    />
                    {
                        errors.firstName && (
                            <span>Please Enter Your First Name</span>
                        )
                    }
                </div>

                {/* Last Name */}
                <div>
                    <label htmlFor='lastName'>Last Name</label>
                    <input 
                        type='text'
                        name='lastName'
                        id='lastName'
                        placeholder='Entry Last Name'
                        {...register('lastName', {required:true})}
                    />
                    {
                        errors.lastName && (
                            <span>Please Enter Your Last Name</span>
                        )
                    }
                </div>

                {/* Email */}
                <div>
                    <label htmlFor='email'>Email Address</label>
                    <input 
                        type='email'
                        name='email'
                        id='email'
                        placeholder='Enter email'
                        {...register('email', {required:true})}
                    />
                    {
                        errors.email && (
                            <span>Please Enter Your Email Address</span>
                        )
                    }
                </div>

                {/* Phone Nmber */}
                <div>
                    <label htmlFor='phoneNo'>Phone Number</label>
                    <div>
                        {/* dropdown */}
                        <div>
                            <select name='dropdown' id='dropdown' {...require()}>
                                {
                                    CountryCode.map((element , index)=>{
                                        return (
                                            <option key={index} value={element.code}>
                                                {element.code}-{element.country}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div>
                            <input
                                type='number'
                                name='phoneNo'
                                id='phoneNo'
                                placeholder='12345 67890'
                                {...register("phoneNo", {required:true , maxLength:{value:'10' , message:'Invalid Phone Number'}})}
                            />
                        </div>
                    </div>
                    {
                        errors.phoneNo && (
                            <span>Please enter valid phone number</span>
                        )
                    }
                </div>
                    
                {/* Message */}
                <div>
                    <label htmlFor='message'>Message</label>
                    <teaxtarea 
                        type='text'
                        name='message'
                        id='message'
                        cols='30'
                        rows='7'
                        placeholder='Enter your message'
                        {...register('message',{require:true})}
                    />
                    {
                        errors.message && (
                            <span className="-mt-1 text-[12px] text-yellow-100">Please Enter Your Message </span>
                        )
                    }
                </div>

                <button
                    disabled={loading}
                    type="submit"
                    className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
                    ${
                    !loading &&
                    "transition-all duration-200 hover:scale-95 hover:shadow-none"
                    }  disabled:bg-richblack-500 sm:text-[16px] `}
                >
                    Send Message
                </button>

            </div>
        </div>
    </form>
  )
}
