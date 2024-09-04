import React from 'react'
import * as Icons from "react-icons/vsc"
import { NavLink, matchPath, useLocation } from 'react-router-dom'
import { resetCourseState } from '../../../reducer/slice/courseSlice'
import { useDispatch } from 'react-redux'

export const SideBarLink = ({link , iconName}) => {

    const Icon = Icons[iconName]
    const location = useLocation()
    const dispatch = useDispatch()

    const matchroute = (route) =>{
        return matchPath({path:route} , location.pathname)
    }

  return (
    <NavLink to={link.path}
    onClick={() => dispatch(resetCourseState())}
    className={`${matchroute(link.path) ? "bg-yellow-800" : "bg-opacity-0"}
    relative px-8 py-2 text-sm font-medium `}
    >
        <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50
        ${matchroute(link.path)?"opacity-100" : "opacity-0"}`}></span>

        <div>
            {/* <Icon className='text-lg'/> */}
            <span>{link.name}</span>
        </div>
    </NavLink>
  )
}
