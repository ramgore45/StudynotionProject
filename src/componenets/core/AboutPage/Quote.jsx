import React from 'react'
import { HighlightText } from '../HomePage/HighlightText'

export const Quote = () => {
  return (
    <div>
      we are passionate about revolutioning the way we learn. our innovation platform 
      <HighlightText text={'Combines Technology'}/>
      <span className='text-brown-500'>{" "} expertise</span>
      ,and community to create an 
      <span className='text-brown-500'>
        {" "}
        unparalleled educational expertise 
      </span>
    </div>
  )
}
