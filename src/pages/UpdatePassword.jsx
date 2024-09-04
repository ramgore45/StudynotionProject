import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { resetPassword } from '../Services/operations/authAPI'

export const UpdatePassword = () => {

    const dispatch = useDispatch()
    const location = useLocation()

    const [formdata , setFormdata] = useState({
        password :'',
        confirmPassword:''
    })

    const [show,setShow] = useState(false)
    const [confirmshow,setConfirmShow] = useState(false)

    const {loading }= useSelector(state=> state.auth)

    const handleOnChange=(e)=>{
        setFormdata((prev)=>({
            ...prev ,
            [e.target.name] : e.target.value
        }))
    }

    const {password, confirmPassword } = formdata

    const handleOnSubmit = (e)=>{
        e.preventDefault()
        const token = location.pathname.split('/').at(-1)
        dispatch(resetPassword(password, confirmPassword , token))
    }

  return (
    <div>
        {
            loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <h1>
                        Choose new Password
                    </h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, corporis!</p>
                    <form>
                        <label>
                            <p>New Password <sup>*</sup></p>
                            <input
                                required
                                type={`${show ? 'text' : 'password'}`}
                                name='password'
                                value={password}
                                onChange={handleOnChange}
                            />
                        </label>
                        <label>
                            <p>Confirm Password <sup>*</sup></p>
                            <input
                                required
                                type={`${show ? 'text' : 'password'}`}
                                name='confirmPassword'
                                value={confirmPassword}
                                onChange={handleOnChange}
                            />
                        </label>


                        <button type='submit'>
                            Reset Password
                        </button>
                    </form>
                </div>
            )
        }
    </div>
  )
}
