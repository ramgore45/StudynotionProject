import React from 'react'
import Instructor from '../../../assets/Images/Instructor.png'
import { HighlightText } from './HighlightText'
import { CTAButton } from './CTAButoon'
import { FaArrowRight } from 'react-icons/fa'

export const INstructorSection = () => {
  return (
    <div className=''>
        <div className='flex flex-row gap-20 items-center'>
            <div className='w-[50%] '>
                <img src={Instructor}/>
            </div>
            <div className='w-[50%] flex flex-col justify-center'>
                <div className='font-semibold text-4xl'>
                    BEcame an <br></br>
                    <HighlightText text={'Instructor'}/>
                </div>
                <p className='w-[80%]font-medium text-[16px] text-richblack-300'>
                    Lorem ipsum dolor sit amet consectetur,adipisicing elit. Iusto, ad.
                    Lorem ipsum dolor sit amet consectetur,adipisicing elit. Iusto, ad.
                </p>
                <div className='w-fit'>
                    <CTAButton className='flex flex-row gap-2 justify-center items-center' active={true} linkto={'/signup'}>
                        Start learning today
                        <FaArrowRight/>
                    </CTAButton>
                </div>
            </div>
        </div>
    </div>
  )
}
