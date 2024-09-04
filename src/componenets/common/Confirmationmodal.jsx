import React from 'react'
import { Iconbtn } from './Iconbtn'

export const Confirmationmodal = ({modalData}) => {
  return (
    <div>
        <div>
            <p>
                {modalData.text1}
            </p>
            <p>
                {modalData.text2}
            </p>
            <div>
                <Iconbtn 
                onClick={modalData?.btn1Handler}
                text={modalData?.btn1text}
                />

                <button onClick={modalData?.btn2Handle}>
                    {modalData?.btn2text}
                </button>
            </div>
        </div>
    </div>
  )
}
