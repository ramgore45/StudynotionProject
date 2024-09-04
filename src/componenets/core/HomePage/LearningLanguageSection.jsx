import React from 'react'
import { HighlightText } from './HighlightText'
import konw_your_progress from '../../../assets/Images/Know_your_progress.png'
import compare_with_others from '../../../assets/Images/Compare_with_others.svg'
import plan_your_lessons from  '../../../assets/Images/Plan_your_lessons.svg'
import { CTAButton } from './CTAButoon'

export const LearningLanguageSection = () => {
  return (
    <div className='m-[130px]'>
      <div className='flex flex-col gap-5 items-center'>
        <div className='text-4xl font-semibold text-center'>
          Your Swiss Knife For 
          <HighlightText text={'learning any language'}/>
        </div>

        <div className='text-center text-richblack-600 mx-auto text-base w-[50%] '>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic beatae asperiores magnam
           nostrum perspiciatis sapiente porro neque?
        </div>

        <div className='flex flex-row items-center justify-center mt-5'>
          <img src={konw_your_progress} className='object-contain -mr-36'/>
          <img src={compare_with_others} className='object-contain '/>
          <img src={plan_your_lessons} className='object-contain -ml-36'/>
        </div>

        <div >
          <CTAButton active={true} linkto={'/signup'}>
            Learn More
          </CTAButton>
        </div>
      </div>
    </div>
  )
}
