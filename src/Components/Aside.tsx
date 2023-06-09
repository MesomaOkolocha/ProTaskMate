import {useState} from 'react'
import { useAuth } from '../Contexts/AppContext'
import { createNewBoard, deleteUserAccount, logout } from '../Functions/Functions'
import useWindowDimensions from '../Hooks/windowDimensions'
import { TbLayoutBoardSplit } from 'react-icons/tb'
import { GoPlus } from 'react-icons/go'
import AsideFooter from './AsideFooter'
import AsideBoards from './AsideBoards'

export default function Aside() {
   
    const { height } = useWindowDimensions()

    const {isLightToggled, sideBarShown} = useAuth()
    const newHeight = height - 96
    
    const style = {
        height: newHeight
    }

    return (
        <>
        {sideBarShown && 
        <div className={`fixed ${isLightToggled ? 'bg-white' : 'bg-[#2b2c37]'} transition-all delay-100 ease-linear w-[18.75rem] hidden md:flex gap-2 py-6 border-b-[1px] border-r-[1px] border-[#8686861a]`} style={style}>
            <AsideBoards />
        </div>}
        </>

    )
}
