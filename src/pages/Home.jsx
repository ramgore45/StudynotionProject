import React from 'react'
import { Link } from 'react-router-dom'
import {FaArrowRight} from 'react-icons/fa'
import { HighlightText } from '../componenets/core/HomePage/HighlightText'
import { CTAButton } from '../componenets/core/HomePage/CTAButoon'
import Banner from '../assets/Images/banner.mp4'
import { CodeBlocks } from '../componenets/core/HomePage/CodeBlocks'
import { TimelineSection } from '../componenets/core/HomePage/TimelineSection'
import { LearningLanguageSection } from '../componenets/core/HomePage/LearningLanguageSection'
import { INstructorSection } from '../componenets/core/HomePage/INstructorSection'
import { Footer } from '../componenets/common/Footer'
import { Exploremore } from '../componenets/core/HomePage/Exploremore'
import { ReviewSlider } from '../componenets/common/ReviewSlider'

export const Home = () => {
  return (
    <div >
        {/* Section 1 */}
        <div className='relative mx-auto flex flex-col w-[11/12] max-w-maxContent items-center justify-between
                    text-white'>
            <Link to={'/signup'}>
                <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 
                                transition-all duration-200 hover:scale-95 w-fit'>
                    <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                                    transition-all duration-200 group-hover:bg-richblack-900'>
                        <p>Become An Instructor</p>
                        <FaArrowRight/>
                    </div>
                </div>
            </Link>

            <div className='text-center text-4xl font-semibold mt-8'>
                Empower Your Future With
                <HighlightText text={"Coding Skills"}/>
            </div>
            <div className='w-[80%] font-bold text-richblack-300 text-lg mt-4 text-center'>
                Iusto neque asperiores modi, commodi dignissimos voluptas perferendis dolorum. Aut voluptate, voluptatem debitis animi aliquid iure deserunt nesciunt, odio, accusamus facilis quidem.
            </div>

            <div className='flex flex-row gap-7 mt-8'>
                <CTAButton active={true} linkto={'/signup'} >
                    Learn more
                </CTAButton>

                <CTAButton active={false} linkto={'/login'} >
                    Book A Demo
                </CTAButton>
            </div>

            <div className='mx-3 my-12 shadow-blue-200 '>
                <video  muted loop autoPlay>
                    <source src={Banner} type='video/mp4'/>
                </video>
            </div>

                
                    {/* Code Section 1 */}

            <div>
                <CodeBlocks
                    position={'flex-row'}
                    heading={
                        <div>
                            unlock your 
                            <HighlightText text={"Coding Potential"}/>
                            with our online courses
                        </div>
                    }
                    subheading={<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae adipisci aut cum debitis, consequuntur assumenda!</p>}
                    ctabtn1={{
                        text:'try it yourself',
                        linkto:'/signup',
                        active:true
                    }}
                    ctabtn2={{
                        text:'learn more',
                        linkto:'/login',
                        active:false
                    }}    

                    codeblock={`
                        <!DOCTYPE>
                    `}
                    
                    codeColor={"text-yellow-25"}
                />

                <CodeBlocks
                    position={'flex-row-reverse'}
                    heading={
                        <div>
                            unlock your 
                            <HighlightText text={"Coding Potential"}/>
                            with our online courses
                        </div>
                    }
                    subheading={<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae adipisci aut cum debitis, consequuntur assumenda!</p>}
                    ctabtn1={{
                        text:'try it yourself',
                        linkto:'/signup',
                        active:true
                    }}
                    ctabtn2={{
                        text:'learn more',
                        linkto:'/login',
                        active:false
                    }}    

                    codeblock={`
                        <!DOCTYPE>
                    `}
                    
                    codeColor={"text-yellow-25"}
                />
            </div>
            
            <Exploremore/>
        </div>

        {/* Section 2 */}
        <div className='bg-pure-greys-5 text-richblack-700 '>
            <div className='homepage_bg h-[333px]'>
                <div className='w-11/12 max-w-maxContent flex flex-col justify-center items-center gap-5 mx-auto '>
                    <div className='h-[150px]'></div>
                    <div className='flex flex-row gap-7 text-white'>
                        <CTAButton active={true} linkto={'/signup'}>
                            Explore Full Catalog
                            <FaArrowRight/>
                        </CTAButton>

                        <CTAButton active={false} linkto={'/signup'}>
                            Learn More
                        </CTAButton>
                    </div>
                </div>
            </div>

            <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 ">
                {/* Job that is in Demand - Section 1 */}
                <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
                    <div className="text-4xl font-semibold lg:w-[45%] ">
                    Get the skills you need for a{" "}
                    <HighlightText text={"job that is in demand."} />
                    </div>
                    <div className="flex flex-col items-start gap-10 lg:w-[40%]">
                        <div className="text-[16px]">
                            The modern StudyNotion is the dictates its own terms. Today, to
                            be a competitive specialist requires more than professional
                            skills.
                        </div>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className="">Learn More</div>
                        </CTAButton>
                    </div>
                </div>

                {/* Timeline Section - Section 2 */}
                <TimelineSection />

                {/* Learning Language Section - Section 3 */}
                <LearningLanguageSection />

            </div>
        </div>

        

        {/* Section 3 */}
        <div className='w-11/12 mx-auto items center flex flex-col justify-between gap-8 my-[130px]
                first-letter bg-richblack-900 text-white'>
                
                <INstructorSection/>

                <h1 className='text-center text-4xl font-semibold mt-10'>REview from other Learners</h1>

                <ReviewSlider/>

        </div>

        {/* Footer */}
        <div>
            <Footer/>
        </div>

    </div>
  )
}
