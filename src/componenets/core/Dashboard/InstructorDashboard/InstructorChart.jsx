import React, { useState } from 'react'
import {Chart , registerables } from 'chart.js'
import {Pie} from 'react-chartjs-2'
Chart.register(...registerables )


export const InstructorChart = ({courses}) => {

    const [currentChart,setCurrentChart] = useState("student")

    const getrandomColor = (numColors)=>{
        const colors = []
        for(let i=0; i<numColors; i++ ){
            const color = `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`
            colors.push(color) 
        }
        return colors
    }
    // Crating data for chart display student data
    const chartDataStudent = {
        label:courses.map((course)=>course.CourseName),
        datasets:[
            {
                data:courses.map((course)=>course.totalStudentsEnrolled),
                backgroundColor:getrandomColor(courses.length),
            }
        ]
    }

    // creating data for chart display Income Data
    const chartDataIncome = {
        label:courses.map((course)=>course.CourseName),
        datasets:[
            {
                data:courses.map((course)=>course.totalAmountGenerated),
                backgroundColor:getrandomColor(courses.length),
            }
        ]
    }

    // create options
    const options = {

    }

  return (
    <div>
        <p>Viusalize</p>
        <div>
            <button
                onClick={()=>setCurrentChart('student')}
            >
                Student
            </button>
            <button
                onClick={()=>setCurrentChart('income')}
            >
                Income
            </button>
        </div>
        <Pie
            data={currentChart==="student" ? chartDataStudent : chartDataIncome}
            options={options}
        />
    </div>
  )
}
