import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiOutlineCurrencyRupee } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import Upload from './Upload'
import { setCourse, setStep } from '../../../../reducer/slice/courseSlice'
import toast from 'react-hot-toast'
import { COURSE_STATUS } from '../../../../utils/constants'
import ChipInput from './ChipInput'
import RequirementsFields from './RequirementsFields'
import { MdNavigateNext } from "react-icons/md"
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../Services/operations/courseDetailsAPI'
import { Iconbtn } from '../../../common/Iconbtn'


export const Courseinformation =()=> {

  const {
      register,
      handleSubmit,
      setValue,
      getValues,
      formState:{errors},
  } = useForm()

  const dispatch = useDispatch()

  const {token} = useSelector((state)=>state.auth)
  const {user} = useSelector(state=> state.profile)
  const {course , editCourse} = useSelector((state)=>state.course)
  const [loading , setLoading] = useState(false)
  const [courseCategories , setCoursecategories] = useState([])

  useEffect(()=>{
      const getCategories = async()=>{
          setLoading(true)
          const categories = await fetchCourseCategories()
          if(categories.length>0){
              setCoursecategories(categories)
          }
          setLoading(false)
      }
      if(editCourse){
          setValue("courseTitle" , course.courseName)
          setValue("courseShortDesc" , course.courseShortDesc)
          setValue("coursePrice" , course.coursePrice)
          setValue("courseTags" , course.courseTags)
          setValue("courseBenefits" , course.courseBenefits)
          setValue("courseCategory" , course.courseCategory)
          setValue("courseRequirement" , course.courseRequirement)
          setValue("courseThumbnail" , course.courseThubnail)
      }

      getCategories()

  } , [])

  const isFormUpdated =()=>{
      const currentValues = getValues()
      if(currentValues.courseTitle!== course.courseName ||
          currentValues.courseTitle!== course.courseName ||
          currentValues.courseTitle!== course.courseName ||
          currentValues.courseTitle!== course.courseName ||
          currentValues.courseTitle!== course.courseName ||
          currentValues.courseTitle!== course.courseName ||
          currentValues.courseTitle!== course.courseName ||
          currentValues.courseTitle!== course.courseName
          ) {return true}
          else{return false}
  }

  const onSubmit = async (data) => {
      console.log(data)
      console.log('Useris herere',user)
  
      if (editCourse) {
        // const currentValues = getValues()
        // console.log("changes after editing form values:", currentValues)
        // console.log("now course:", course)
        // console.log("Has Form Changed:", isFormUpdated())
        if (isFormUpdated()) {
          const currentValues = getValues()
          const formData = new FormData()
          // console.log(data)
          formData.append("courseId", course._id)
          if (currentValues.courseTitle !== course.courseName) {
            formData.append("courseName", data.courseTitle)
          }
          if (currentValues.courseShortDesc !== course.courseDescription) {
            formData.append("courseDescription", data.courseShortDesc)
          }
          if (currentValues.coursePrice !== course.price) {
            formData.append("price", data.coursePrice)
          }
          if (currentValues.courseTags.toString() !== course.tag.toString()) {
            formData.append("tag", JSON.stringify(data.courseTags))
          }
          if (currentValues.courseBenefits !== course.whatYouWillLearn) {
            formData.append("whatYouWillLearn", data.courseBenefits)
          }
          if (currentValues.courseCategory._id !== course.category._id) {
            formData.append("category", data.courseCategory)
          }
          if (
            currentValues.courseRequirements.toString() !==
            course.instructions.toString()
          ) {
            formData.append(
              "instructions",
              JSON.stringify(data.courseRequirements)
            )
          }
          if (currentValues.courseImage !== course.thumbnail) {
            formData.append("thumbnailImage", data.courseImage)
          }
          // console.log("Edit Form data: ", formData)
          setLoading(true)
          const result = await editCourseDetails(formData, token)
          setLoading(false)
          if (result) {
            dispatch(setStep(2))
            dispatch(setCourse(result))
          }
        } else {
          toast.error("No changes made to the form")
        }
        return
      }
  
      let formData = new FormData();
      
      formData.append("courseName", data.courseTitle)
      formData.append("courseDescription", data.courseShortDesc)
      formData.append("price", data.coursePrice)
      formData.append("tag", JSON.stringify(data.courseTags))
      formData.append("whatYouWillLearn", data.courseBenefits)
      formData.append("category", data.courseCategory)
      formData.append("status", COURSE_STATUS.DRAFT)
      formData.append("instructions", JSON.stringify(data.courseRequirements))
      formData.append("thumbnailImage", data.courseImage)

      console.log("after appending data===", formData.courseTitle)

      setLoading(true)
      console.log("formData length",formData.length)
      const result = await addCourseDetails(formData, token)
      // console.log(result)
      if (result) {
        dispatch(setStep(2))
        dispatch(setCourse(result))
      }
    
      setLoading(false)
    }

return (
  <form
  onSubmit={handleSubmit(onSubmit)}
  className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
>
  {/* Course Title */}
  <div className="flex flex-col space-y-2">
    <label className="text-sm text-richblack-5" htmlFor="courseTitle">
      Course Title <sup className="text-pink-200">*</sup>
    </label>
    <input
      id="courseTitle"
      placeholder="Enter Course Title"
      {...register("courseTitle", { required: true })}
      className="form-style w-full"
    />
    {errors.courseTitle && (
      <span className="ml-2 text-xs tracking-wide text-pink-200">
        Course title is required
      </span>
    )}
  </div>
  {/* Course Short Description */}
  <div className="flex flex-col space-y-2">
    <label className="text-sm text-richblack-5" htmlFor="courseShortDesc">
      Course Short Description <sup className="text-pink-200">*</sup>
    </label>
    <textarea
      id="courseShortDesc"
      placeholder="Enter Description"
      {...register("courseShortDesc", { required: true })}
      className="form-style resize-x-none min-h-[130px] w-full"
    />
    {errors.courseShortDesc && (
      <span className="ml-2 text-xs tracking-wide text-pink-200">
        Course Description is required
      </span>
    )}
  </div>
  {/* Course Price */}
  <div className="flex flex-col space-y-2">
    <label className="text-sm text-richblack-5" htmlFor="coursePrice">
      Course Price <sup className="text-pink-200">*</sup>
    </label>
    <div className="relative">
      <input
        id="coursePrice"
        placeholder="Enter Course Price"
        {...register("coursePrice", {
          required: true,
          valueAsNumber: true,
          pattern: {
            value: /^(0|[1-9]\d*)(\.\d+)?$/,
          },
        })}
        className="form-style w-full !pl-12"
      />
      <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
    </div>
    {errors.coursePrice && (
      <span className="ml-2 text-xs tracking-wide text-pink-200">
        Course Price is required
      </span>
    )}
  </div>
  {/* Course Category */}
  <div className="flex flex-col space-y-2">
    <label className="text-sm text-richblack-5" htmlFor="courseCategory">
      Course Category <sup className="text-pink-200">*</sup>
    </label>
    <select
      {...register("courseCategory", { required: true })}
      defaultValue=""
      id="courseCategory"
      className="form-style w-full"
    >
      <option value="" disabled>
        Choose a Category
      </option>
      {!loading &&
        courseCategories?.map((category, indx) => (
          <option key={indx} value={category?._id}>
            {category?.name}
          </option>
        ))}
    </select>
    {errors.courseCategory && (
      <span className="ml-2 text-xs tracking-wide text-pink-200">
        Course Category is required
      </span>
    )}
  </div>
  {/* Course Tags */}
  <ChipInput
    label="Tags"
    name="courseTags"
    placeholder="Enter Tags and press Enter"
    register={register}
    errors={errors}
    setValue={setValue}
    getValues={getValues}
  />
  {/* Course Thumbnail Image */}
  <Upload
    name="courseImage"
    label="Course Thumbnail"
    register={register}
    setValue={setValue}
    errors={errors}
    editData={editCourse ? course?.thumbnail : null}
  />
  {/* Benefits of the course */}
  <div className="flex flex-col space-y-2">
    <label className="text-sm text-richblack-5" htmlFor="courseBenefits">
      Benefits of the course <sup className="text-pink-200">*</sup>
    </label>
    <textarea
      id="courseBenefits"
      placeholder="Enter benefits of the course"
      {...register("courseBenefits", { required: true })}
      className="form-style resize-x-none min-h-[130px] w-full"
    />
    {errors.courseBenefits && (
      <span className="ml-2 text-xs tracking-wide text-pink-200">
        Benefits of the course is required
      </span>
    )}
  </div>
  {/* Requirements/Instructions */}
  <RequirementsFields
    name="courseRequirements"
    label="Requirements/Instructions"
    register={register}
    setValue={setValue}
    errors={errors}
    getValues={getValues}
  />
  {/* Next Button */}
  <div className="flex justify-end gap-x-2">
    {editCourse && (
      <button
        onClick={() => dispatch(setStep(2))}
        disabled={loading}
        className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
      >
        Continue Wihout Saving
      </button>
    )}
    <Iconbtn
      disabled={loading}
      text={!editCourse ? "Next" : "Save Changes"}
    >
      <MdNavigateNext />
    </Iconbtn>
  </div>

</form>
)
}
