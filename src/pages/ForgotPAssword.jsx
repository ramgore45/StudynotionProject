import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPasswordResetToken } from '../Services/operations/authAPI'

export const ForgotPAssword = () => {

    const [emailsent, setEmailsent] = useState(false)
    const [email,setEmail] = useState("")
    const dispatch = useDispatch()

    const {loading} = useSelector(state=> state.auth)

    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(getPasswordResetToken(email , setEmailsent))
        
    }

  return (
    <div className='text-white flex flex-col '>
        {
            loading ? (
                <div>Loading.....</div>
            ) : (
                <div>
                    <h1>
                        {
                            !emailsent ? "Reset Your Password" : "Check Your Email"
                        }
                    </h1>
                    <p>
                        {
                            !emailsent ? 
                            (<div>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error, labore?</div>)
                            : 
                            (<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, aut.</div>)
                        }
                    </p>

                    <form onSubmit={handleOnSubmit}>
                        {
                            !emailsent && 
                            (
                                <label>
                                    <p>Email Address</p>
                                    <input
                                        required
                                        type='email'
                                        name='email'
                                        value={email}
                                        onChange={(e)=>setEmail(e.target.value)}
                                        placeholder='Enter Your Email Address'
                                    />
                                </label>
                            )
                        }

                        <button
                        type='submit'>
                            {
                                !emailsent ? "Reset Password" : "Resend Email"
                            }
                        </button>
                    </form>

                    <div>
                        <Link to={'/login'}>
                                back to login
                        </Link>
                    </div>
                    
                </div>
            ) 
        }
    </div>
  )
}
