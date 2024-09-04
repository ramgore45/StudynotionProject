import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore'
import { HighlightText } from './HighlightText'
import { CourseCard } from './CourseCard'

const Tabname = ["Free" , "New to coding" , "Most popular" , "Skills paths" , "Career paths"]

export const Exploremore = () => {
  const [currentTab , setCurrentTAb] = useState (Tabname[0])
  const [courses , setCourses] = useState(HomePageExplore[0].courses)
  const [currentCard , setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)

  function setMyCard (value){
    setCurrentTAb(value)
    const result = HomePageExplore.filter((course)=> course.tag===value) 
    setCourses(result[0].courses)
    setCurrentCard(result[0].courses[0].heading)
  }

  return (
    <div>
        <div className='text-white items-center flex flex-col'>
          <div className='text-4xl font-semibold text-center'>
            Unlock the 
            <HighlightText text={'Power of Code'}/>
          </div>
          <p className='text-center text-richblack-300 text-md mt-3'>Lorem ipsum dolor sit amet.jsjkdbsajk</p>

          <div className="flex flex-row rounded-full bg-richblack-700 mt-5 mb-5 ">
            {
              Tabname.map((elem , index)=>{
                return (
                  <div key={index} className={`text-[16px]   items-center gap-2
                          rounded-full transition-all duration-200 cursor-pointer 
                          hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2
                          ${currentTab ===elem ? "bg-richblack-900 text-richblack-5" : "text-richblack-200"}`}
                      onClick={()=>setMyCard(elem)}
                  >
                    {elem}
                  </div>
                )
              })
            }
          </div>
          <div className="hidden lg:block lg:h-[200px]"></div>

          {/* Cards Group */}
          <div className="lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3">
            {courses.map((ele, index) => {
              return (
                <CourseCard
                  key={index}
                  cardData={ele}
                  currentCard={currentCard}
                  setCurrentCard={setCurrentCard}
                />
              );
            })}
          </div>

        </div>
    </div>
  )
}
