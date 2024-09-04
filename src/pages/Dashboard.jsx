import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../componenets/core/Dashboard/Sidebar'

export const Dashboard = () => {

    const {loading : authloading} = useSelector(state=>state.auth)
    const {loading : profileloading} = useSelector(state=>state.profile)

    if (profileloading || authloading) {
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        )
      }

  return (
    <div className='relative flex min-h-[calc(100vh-3.5rem)] w-full'>
        <Sidebar/>
        <div className='h-[calc(100vh-3.5rem)] w-full overflow-auto'>
            <div className='mx-auto w-11/12 py-10'>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}
