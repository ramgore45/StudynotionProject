import React, { useEffect, useState } from 'react'
import {Swiper,SwiperSlide} from 'swiper/react'
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/free-mode"
import ReactStars from 'react-rating-stars-component'
import { apiConnector } from '../../Services/apiconnector'
import { ratingsEndpoints } from '../../Services/apis'
import { Autoplay, FreeMode, Pagination } from 'swiper'
import {FaStar} from 'react-icons/fa'

export const ReviewSlider = () => {

    const [reviews,setReviews] = useState([])
    const truncateWords = 15
    useEffect(()=>{
        const fetchAllReviews = async()=>{
            const data = await apiConnector('GET', ratingsEndpoints.REVIEWS_DETAILS_API)
            console.log(data)

            if(data?.success){
                setReviews(data?.data) 
            }
            console.log(reviews)
        }
        if(reviews){
        fetchAllReviews()}
    },[])

  return (
    <div>
        <Swiper
            slidesPerView={4}
            spaceBetween={24}
            loop={true}
            freeMode={true}
            autoplay={{
                delay:2500
            }}
            modules={[FreeMode,Pagination,Autoplay]}
        >
            {
                reviews.map((rev,index)=>(
                    <SwiperSlide key={index}>
                        <img 
                            src={rev?.user?.image ? rev?.user?.image 
                                : `https://api.dicebar.com/5.x/initials/svg?seed=${rev?.user?.firstName} ${rev?.user?.lastName}`}
                            alt='Profile Pic'
                        />
                        <p>{rev?.user?.firstName} {rev?.user?.lastName}</p>
                        <p>{rev?.course?.courseName}</p>
                        <p>{rev?.review}</p>
                        <div>{rev?.rating.toFixed(1)}</div>
                        <ReactStars
                            count={5}
                            value={rev?.rating}
                            size={20}
                            edit={false}
                            emptyIcon={<FaStar/>}
                            fullIcon={<FaStar/>}
                        />
                    </SwiperSlide>
                ))
            }
        </Swiper>
    </div>
  )
}
