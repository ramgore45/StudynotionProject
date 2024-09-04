import React from 'react'
import {FaArrowRight} from 'react-icons/fa'
import { CTAButton } from './CTAButoon'
import { TypeAnimation } from 'react-type-animation'

export const CodeBlocks = ({position , heading, subheading , ctabtn1 , ctabtn2, codeblock , backgroundGradient , codeColor}) => {
  return (
    <div className={`flex ${position} my-20 items-center justify-center mx-auto w-[80%]`} >

        {/* section-1 */}

        <div className='w-[50%] flex flex-col text-richblack-500 gap-8'>
            {heading}
            <div className='text-richblack-300 font-bold'>
                {subheading}
            </div>
            <div className='flex gap-3'>
                <CTAButton  active={ctabtn1.active} linkto={ctabtn1.linkto}>
                    {ctabtn1.text}
                    <FaArrowRight/>
                </CTAButton>
                <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                    {ctabtn2.text}
                </CTAButton>
            </div>

        </div>

        {/* Section-2 */}
        <div className='flex flex-row gap-2 h-fit w-[50%] text-[10px] '>
            {/* homework - bg-gradient */}
            <div className='text-center flex flex-col text-richblack-400 font-inter font-bold'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>
            <div className={`w-[90%] flex flex-col gap-2 font-bold  font-mono ${codeColor} pr-2`}>
                <TypeAnimation 
                    sequence={[codeblock , 10000 , ""]}
                    repeat={Infinity}
                    cursor={true}
                    omitDeletionAnimation={true}
                />
            </div>
        </div>
    </div>
  )
}
