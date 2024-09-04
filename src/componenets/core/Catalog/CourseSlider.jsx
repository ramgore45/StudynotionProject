import React from 'react'
import {Swiper,SwiperSlide} from 'swiper/react'
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/free-mode"
import {FreeMode,Pagination} from 'swiper'
import { COurse_Card } from './COurse_Card'

export const CourseSlider = (courses) => {
  return (
    <>
    {courses?.length ? (
      <Swiper
        slidesPerView={1}
        spaceBetween={25}
        loop={true}
        modules={[FreeMode, Pagination]}
        breakpoints={{
          1024: {
            slidesPerView: 3,
          },
        }}
        className="max-h-[30rem]"
      >
        {courses?.map((course, i) => (
          <SwiperSlide key={i}>
            <COurse_Card course={course} Height={"h-[250px]"} />
          </SwiperSlide>
        ))}
      </Swiper>
    ) : (
      <p className="text-xl text-richblack-5">No Course Found</p>
    )}
  </>
  )
}
