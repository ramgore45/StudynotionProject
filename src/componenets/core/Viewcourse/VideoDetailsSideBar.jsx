import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Iconbtn } from '../../common/Iconbtn'

export const VideoDetailsSideBar = ({setReviewModal}) => {

    const [activeStatus ,setActiveStatus] = useState("")
    const [videoBarActive,setVideoBarActive] = useState("")
    const location = useLocation()
    const navigate = useNavigate()
    const {sectionId,subSectionId} = useParams()
    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures
    } = useSelector(state=>state.viewCourse)

    useEffect(()=>{
        const setActiveFlags = ()=>{
            if(!courseSectionData.length === 0){
                return
            }

            const currentSectionIndex = courseSectionData.findIndex(
                (data)=> data._id === sectionId
            )

            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
                (data)=> data._id===subSectionId
            )

            const activeSubSectionId = courseSectionData?.[currentSectionIndex]?.subSection?.[currentSubSectionIndex]._id

            // set current section here
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id)
            // Setcurrent subsection here
            setVideoBarActive(activeSubSectionId)
        }

       if(courseSectionData){
        setActiveFlags()
       }
    },[courseSectionData,courseEntireData,location.pathname])

  return (
    <div>
        <div>
            {/* For buttons nd Headings */}
            <div>
                <div>
                    <button
                     onClick={()=> navigate("/dashboard/enrolled-courses")}
                    >
                        Back
                    </button>
                    <Iconbtn
                        text="Add Review"
                        onClick={()=>setReviewModal(true)}
                    />
                </div>
                <div>
                    <p>{courseEntireData?.courseName}</p>
                    <p>{completedLectures?.length} / {totalNoOfLectures}</p>
                </div>
            </div>
            {  /* For Sections And Subsections */}
            <div>
                {
                    courseSectionData.map((section,index)=>(
                        <div key={index}
                        onClick={()=>setActiveStatus(section._id)}
                        >
                            {/* Section */}
                            <div>
                                <div>
                                    {section?.sectionName}
                                    {/* add arrow */}
                                </div>
                            </div>
                            {/* SubSections */}
                            <div>
                                {
                                    activeStatus  === section?._id && (
                                        <div>
                                            {
                                                courseEntireData.subSection.map((lec,index)=>(
                                                    <div key={index}
                                                     className={`flex gap-x-5 
                                                        ${videoBarActive === lec._id ? "bg-yellow-200 text-richblack-900" : 
                                                        "bg-richblack-900 text-white"}
                                                     `}
                                                     onClick={()=> {
                                                        navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${lec?._id}`)
                                                        setVideoBarActive(lec?._id)
                                                     }}
                                                    >
                                                        <input 
                                                            type='checkbox'
                                                            checked={completedLectures.includes(lec._id)}
                                                            onChange={()=>{}}
                                                        />
                                                        <span>{lec.title}</span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    ))
                }    
            </div>
        </div>
    </div>
  )
}
