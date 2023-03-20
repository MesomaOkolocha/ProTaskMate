import React from 'react'
import { FaEye } from 'react-icons/fa'
import { useAuth } from '../../Contexts/AppContext'

export default function SideEye() {
    const {sideBarShown, dispatch} = useAuth()
    
    return (
        <>
        {!sideBarShown &&  
        
        <div onClick={()=>{dispatch({type: 'setSidebarTrue'})}} className='bg-[#635fc7] h-[3rem] w-[3.5rem] hidden fixed left-0 bottom-14 rounded-r-[25px] md:flex items-center justify-center text-white text-lg'>
            <FaEye />
        </div>
        }
        </>
    )
}
