import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'
import { VideoDetailsSideBar } from '../componenets/core/Viewcourse/VideoDetailsSideBar'
import { CourseReviewModal } from '../componenets/core/Viewcourse/CourseReviewModal'
import { getFullDetailsOfCourse } from '../Services/operations/courseDetailsAPI'
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../reducer/slice/viewCourseSlice'

export const ViewCourse = () => {

    const [reviewModal,setReviewModal] = useState(false)
    const {courseId} = useParams()
    const {token} = useSelector(state=>state.auth)
    const dispatch = useDispatch()

    useEffect(()=>{
        const setCourseSpecificDetails = async()=>{
            const courseData = await getFullDetailsOfCourse(courseId,token)
            dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent))
            dispatch(setEntireCourseData(courseData?.courseDetails))
            dispatch(setCompletedLectures(courseData?.completedVideos))
            let lectures = 0
            courseData?.courseDetails?.courseContent?.forEach((sec)=>{
                lectures += sec.subSection.length
            })
            dispatch(setTotalNoOfLectures(lectures)) 
        }
        setCourseSpecificDetails()
    },[])

  return (
    <div>
        <div>
            <VideoDetailsSideBar setReviewModal={setReviewModal}/>

            <div>
                <Outlet/>
            </div>
        </div>
        
        <div>
            {
                reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>
            }
        </div>
    </div>
  )
}
