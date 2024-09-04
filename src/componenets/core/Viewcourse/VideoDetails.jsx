import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Player } from 'video-react'
import 'video-react/dist/video-react.css'
import { FaPlayCircle } from "react-icons/fa";
import { Iconbtn } from '../../common/Iconbtn'
import { markLectureAsComplete } from '../../../Services/operations/courseDetailsAPI'
import { updateCompletedLectures } from '../../../reducer/slice/viewCourseSlice'

export const VideoDetails = () => {

  const {courseId,sectionId,subSectionId} = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const playerRef = useRef()
  const {token} = useSelector(state=>state.auth)
  const {courseSectionData,courseEntireData,completedLectures} = useSelector(state=>state.viewCourse)

  const [videoData,setVideoData] = useState([])
  const [videoEnded,setVideoEnded] = useState(false)
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    const setVideoSepecificDetails = async()=>{
      if(!courseSectionData.length)
        return

      if(!courseId && !sectionId && !subSectionId){
        navigate("/dashboard/enrolled-courses")
      }else{
        // Lets assume all fields are preseent
        const filterData = courseSectionData.filter(
          (section)=>section._id==sectionId
        )

        const filterVideoData = filterData?.[0].subSection.filter(
          (data)=>data._id===subSectionId
        )

        setVideoData(filterVideoData[0])
        setVideoEnded(false)
      }
    }

    setVideoSepecificDetails() 

  },[courseSectionData,courseEntireData,location.pathname])

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      data=> data._id===sectionId
    )
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      data=>data._id===subSectionId
    )

    if(currentSectionIndex===0 && currentSubSectionIndex===0){
      return true
    }else{
      return false
    }

  }

  const isLastVideo=()=>{
    const currentSectionIndex = courseSectionData.findIndex(
      data=> data._id===sectionId
    )

    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      data=>data._id===subSectionId
    )

    if(currentSectionIndex===courseSectionData.length-1 && currentSubSectionIndex===noOfSubSections-1){
      return true
    }else{
      return false
    }


  }

  const goToNextVideo=()=>{
    const currentSectionIndex = courseSectionData.findIndex(
      data=> data._id===sectionId
    )

    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      data=>data._id===subSectionId
    )

    if(currentSubSectionIndex!== noOfSubSections-1){
      // same section next video
      const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
    }else{
      // different section first video
      const nextSectionId = courseSectionData[currentSectionIndex+1]._id
      const nextSubSectionId = courseSectionData[currentSectionIndex+1].subSection[0]._id
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
    }

  }

  const goToPreVideo=()=>{
    const currentSectionIndex = courseSectionData.findIndex(
      data=> data._id===sectionId
    )

    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      data=>data._id===subSectionId
    )

    if(currentSubSectionIndex!== 0){
      // same section next video
      const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1]._id
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
    }else{
      // Different Section Last Video
      const prevSectionId = courseSectionData[currentSectionIndex-1]._id
      const prevSubSectionLength = courseSectionData[currentSectionIndex-1].subSection.length
      const prevSubSectionId = courseSectionData[currentSectionIndex-1].subSection[prevSubSectionLength-1]._id
      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)
    }
  }

  const handleLectureCompletion=async()=>{
    // for now dummy code...replace it after sometime
    setLoading(true)

    const res = await markLectureAsComplete({courseId:courseId , subSectionId:subSectionId},token)
    // Update satte Slice ViewCourse
    if(res){
      dispatch(updateCompletedLectures(subSectionId))
    }

    setLoading(false)
  }

  return (
    <div>
        {
          !videoData ? (
            <div>No Video Found</div>
          ):(
            <Player
            ref={playerRef}
            aspectRatio='16:9'
            playsInline
            onEnded={()=>setVideoEnded(true)}
            src={videoData?.videoUrl}
            >
              <FaPlayCircle/>
              {
                videoEnded && (
                  <div>
                    {
                      !completedLectures.includes(subSectionId) && (
                        <Iconbtn
                            disabled={loading}
                            onClick={()=>handleLectureCompletion()}
                            text={!loading?"Mark As Complete":"LOading..."}
                        />
                      )
                    }
                    <Iconbtn
                        disabled={loading}
                        onClick={()=>{
                            if(playerRef?.current){
                              playerRef?.current.seek(0)
                              setVideoEnded(false)
                            }
                          }}
                        text="Rewatch"
                        customClasses="text-xl"
                    />

                    <div>
                      {
                        !isFirstVideo() && (
                          <button
                              disabled={loading}
                              onClick={goToPreVideo()}
                          >
                            Prev
                          </button>
                        )
                      }
                      {
                        !isLastVideo() && (
                          <button
                              disabled={loading}
                              onClick={goToNextVideo}
                          >
                            Next
                          </button>
                        )
                      }
                    </div>

                  </div>
                )
              }
            </Player>
          )
        }
        <h1>
          {videoData?.title}
        </h1>
        <h3>
          {videoData?.description}
        </h3>
    </div>
  )
}
