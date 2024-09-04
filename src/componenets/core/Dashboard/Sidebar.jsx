import React from 'react'
import {sidebarLinks} from '../../../data/dashboard-links'
import { useDispatch, useSelector } from 'react-redux'
import { SideBarLink } from './SideBarLink'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { VscSignOut } from 'react-icons/vsc'
import { Confirmationmodal } from '../../common/Confirmationmodal'
import { logout } from '../../../Services/operations/authAPI'
import { ACCOUNT_TYPE } from '../../../utils/constants'

export const Sidebar = () => {

    const {user , loading:profileloading} = useSelector(state=>state.profile)
    const {loading:authloading} = useSelector(state=>state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [confirmationModal , setConfirmationModal] = useState(null)

    console.log("userAccount type", user?.accountType)

    if(profileloading || authloading){
        return(
            <div>
                Loading ...
            </div>
        )
    }


  return (
    <div>
        <div className='flex flex-col min-w-[222px] border-r-richblack-700
                h-[calc(100vh-3.5rem)] bg-richblack-800 py-10 text-richblack-100'>
                
                <div className='flex flex-col'> 
                    {
                        sidebarLinks.map((link)=>{
                            if(link.type && user?.accountType !== link.type) return null
                            return(
                                <SideBarLink key={link.id} link={link} iconName={link.icon} />
                            )
                        })
                    }
                </div>

                <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'></div>

                <div className='flex flex-col'>
                    <SideBarLink link={{name:"setting" , path:"dashboard/settings"} } iconName="vscSettingGear"/>
                    
                    <button onClick={()=> setConfirmationModal({
                        text1:"Are you sure ?",
                        text2:"You will be logged out of your account",
                        btn1text:"Logout",
                        btn2text:"Cancel",
                        btn1Handler: ()=>dispatch(logout(navigate)),
                        btn2Handler: ()=> setConfirmationModal(null)
                    })}
                    className='text-sm font-medium text-richblack-300 px-8 py-2'
                    >
                        <div className='flex gap-x-2'>
                            <VscSignOut className='text-lg'/>
                            <span>Log Out</span>
                        </div>
                    </button>
                </div>

        </div>

        {confirmationModal && <Confirmationmodal modalData={confirmationModal}/>}


    </div>
  )
}
