import React from 'react'
import { useAuth } from '../Contexts/AppContext'
import {RxCaretDown} from 'react-icons/rx'
import { GoPlus } from 'react-icons/go'
import { IoEllipsisVerticalOutline } from 'react-icons/io5'

export default function Header() {

    const { currentBoard } = useAuth()

    return (
        <div className='bg-[#2b2c37] h-[6rem] flex items-center sticky top-0 z-[9999]'>
            <div className='min-w-[18.75rem] h-[6rem] hidden md:flex items-center gap-2 px-4 py-6 md:px-10 border-b-[1px] border-r-[1px] border-[#464545]'>
                <img src='https://kanban-app-jay.netlify.app/assets/logo-mobile.c1810dc7.svg' 
                    className='min-w-[1.5rem]'
                />
                <h1 className='text-[1.5rem] text-white font-extrabold'>TaskMate</h1>
            </div>
            <div className='flex items-center justify-between md:justify-start w-full px-4 py-6 md:px-10'>
                <div className='flex items-center gap-3'>
                    <img src='https://kanban-app-jay.netlify.app/assets/logo-mobile.c1810dc7.svg' 
                        className='min-w-[1.5rem] md:hidden'
                    />
                    <div className='flex gap-1 items-center'>
                        <p className='flex max-w-[10rem] md:max-w-[13rem] overflow-hidden text-ellipsis text-left whitespace-nowrap font-bold text-white text-[1.2rem] md:text-[1.5rem]'>{currentBoard.name}</p>
                        <button className='md:hidden'><i className='text-[#635FC7] font-extrabold text-[1.3rem]'><RxCaretDown /></i></button>
                    </div>
                </div>
                <div className='flex items-center gap-3 md:ml-10 lg:ml-[30%]'>
                    <button className='bg-[#635FC7] md:flex items-center gap-1 px-3 py-1 rounded-full'>
                        <i className='font-bold text-[1.2rem] text-white md:text-[0.8rem]'><GoPlus /></i>
                        <p className='hidden md:block font-semibold text-[1.1rem] text-white'>Add New Task</p>
                    </button>
                    <button>
                        <i className='text-[1.2rem] text-[#88899b] min-w-[22px] h-[38px]'><IoEllipsisVerticalOutline /></i>
                    </button>
                </div>
            </div>
        </div>
    )
}
