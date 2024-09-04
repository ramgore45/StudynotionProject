import React from 'react'
import { useForm } from 'react-hook-form'
import { Iconbtn } from '../../../common/Iconbtn'
import { useState } from 'react'
import {MdAddCircleOutline} from 'react-icons/md'
import {BiAddToQueue} from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
// import { setLoading } from '../../../../reducer/slice/courseSlice'
import { NestedView } from'./NestedView'
import { createSection, updateSection } from '../../../../Services/operations/courseDetailsAPI'
import { setCourse, setEditCourse, setStep } from '../../../../reducer/slice/courseSlice'

function Coursebuilder() {

  const {register, handleSubmit, setValue, formState:{errors}}= useForm()
  const {token} = useSelector((state)=>state.auth)

  const [editSecName,setEditSecName] = useState()

  const {course} = useSelector((state)=>state.course)
  console.log('Course Builder course',course.courseContent)

  const [loading,setLoading] = useState(false)

  const dispatch = useDispatch()

  function cancelEdit (){
    setEditSecName(null)
    setValue("sectionName","")
  }

  async function onSubmit(data){
    setLoading(true)
    let result;
    if(editSecName){
      result = await updateSection({
        sectionName:data.sectionName,
        sectionId:editSecName,
        courseId:course._id,
      },token)
    }
    else{
      result = await createSection({
        sectionName:data.sectionName,
        courseId:course._id,
      },token)
    }

    if(result){
      dispatch(setCourse(result))
      setEditSecName(null)
      setValue("sectionName", "")
      console.log('Course Builder course 2',course.courseContent)
    }
    
    setLoading(false)
  }

  function goToNext(){
    if(course.courseContent.length === 0){
      toast.error("Please Add AtLeast One Section")
      return
    }
    if(course.courseContent.some((section) => section.subSection.length === 0)){
      toast.error("Please Add Atleast one Lecture in Each Section")
      return
    }

    dispatch(setStep(3))
  }

  function goToBack(){
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
  }

  const handleChangeEditSecName =(sectionId, sectionName)=>{
    if(editSecName === sectionId){
      cancelEdit()
      return
    }
    setEditSecName(sectionId)
    setValue("SectionName",sectionName)

  }

  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblack-5" htmlFor="sectionName">
            Section Name <sup className="text-pink-200">*</sup>
          </label>
          <input
            id="sectionName"
            disabled={loading}
            placeholder="Add a section to build your course"
            {...register("sectionName", { required: true })}
            className="form-style w-full"
          />
          {errors.sectionName && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Section name is required
            </span>
          )}
        </div>
        <div className="flex items-end gap-x-4">
          <Iconbtn
            type="submit"
            disabled={loading}
            text={editSecName ? "Edit Section Name" : "Create Section"}
            outline={true}
          >
            <MdAddCircleOutline size={20} className="text-yellow-50" />
          </Iconbtn>
          {editSecName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-richblack-300 underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
      {course.courseContent.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSecName} />
      )}
      {/* Next Prev Button */}
      <div className="flex justify-end gap-x-3">
        <button
          onClick={goToBack}
          className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
        >
          Back
        </button>
        <Iconbtn disabled={loading} text="Next" onclick={goToNext}>
          <BiAddToQueue />
        </Iconbtn>
      </div>
    </div>
  )
}

export default Coursebuilder