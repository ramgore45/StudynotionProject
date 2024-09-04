import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import { Iconbtn } from '../../common/Iconbtn'
import { createRating } from '../../../Services/operations/courseDetailsAPI'

export const CourseReviewModal = ({setReviewModal}) => {

    const user = useSelector(state=>state.profile)
    const token = useSelector(state=>state.auth)
    const courseEntireData = useSelector(state=>state.viewCourse)
    const {
        register,
        handleSubmit,
        setValue,
        formstate:{error},
    } = useForm()


    useEffect(()=>{
        setValue("courseExperience", "")
        setValue("courserating", 0)
    },[])

    const onSubmit = async(data)=>{
        await createRating(
            {
                courseId:courseEntireData._id,
                rating:data.courseRating,
                review:data.courseExperience,
            },
            token
        )
        setReviewModal(false)
    }
    function ratingChange(newRating){
        setValue("courseRating", newRating)
    }

  return (
    <div>
        
        <div>
            {/* Modal Header */}
            <div>
                <p>Add Review</p>
                <button
                onClick={()=>setReviewModal(false)}
                >
                    Close
                </button>
            </div>
            {/* Modal Body */}
            <div>
                <div>
                    <img 
                        src={user?.image}
                        alt='User Image'
                    />
                    <div>
                        <p>{user?.firstName} {user?.lastName}</p>
                        <p>POsting publicly</p>
                    </div>
                </div>

                <form
                 onSubmit={handleSubmit(onSubmit)}
                >
                    <ReactStars
                    count={5}
                    onChange={ratingChange}
                    size={24}
                    activecolor="#ffd700 "
                    />

                    <div>
                        <label htmlFor='courseExperience'>Add Your Experience</label>
                        <textarea
                        id='courseExperience'
                        placeholder='Add course Experince here'
                        {...register("courseExperience",{required:true})}
                        className='form-style'
                        />
                        {
                            error.courseExperience && (
                                <span>please Add Your Experience</span>
                            )
                        }
                    </div>

                    {/* cancel And Save Button */}
                    <div>
                        <button
                        onClick={()=>setReviewModal(false)}
                        >
                            Cancel
                        </button>
                        <Iconbtn
                            text="Save"
                        />
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
