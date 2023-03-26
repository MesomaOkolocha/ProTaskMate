import React from 'react'
import { useAuth } from '../Contexts/AppContext'
import {RxCaretDown, RxCaretUp} from 'react-icons/rx'
import { GoPlus } from 'react-icons/go'
import { IoEllipsisVerticalOutline } from 'react-icons/io5'

export default function Header() {

    const { Boards, currentBoard, dispatch, modals, isLightToggled } = useAuth()

    function boardsDropdown(){
        dispatch({
            type: 'setBoardsModalCurrent'
        })
    }

    function editBoarddropDown(){
        dispatch({
            type: 'setEditBoardsModal'
        })
    }

    function addNewTaskDropdown(){
        dispatch({
            type: 'setAddTaskModalTrue'
        })
    }

    const colLength = currentBoard?.columns?.length || 0
    const {editBoardmodal, editModal, boardsModal, deleteBoardModal, addColumnModal, addTaskModal, showTaskModal, deleteTaskModal, editTaskModal, createBoardModal } = modals

    return (
        <div className={`${boardsModal || editModal || deleteBoardModal || addColumnModal || addTaskModal || showTaskModal || deleteTaskModal || editTaskModal || createBoardModal ? 'opacity-40 delay-100 transition-all ease-linear' : ' delay-100 transition-all ease-linear'} ${isLightToggled? 'bg-white' : 'bg-[#2b2c37]'} h-[6rem] flex items-center sticky top-0 z-[9999]`}>
            <div className='min-w-[18.75rem] h-[6rem] hidden md:flex items-center gap-2 px-4 py-6 md:px-10 border-b-[1px] border-r-[1px] border-[#8686861a]'>
                <img src='https://kanban-app-jay.netlify.app/assets/logo-mobile.c1810dc7.svg' 
                    className='min-w-[1.5rem]'
                />
                <h1 className={`text-[1.5rem] ${isLightToggled ? 'text-black' : 'text-white'} font-extrabold`}>TaskMate</h1>
            </div>
            <div className='flex items-center justify-between w-full px-4 py-6 md:px-10 border-b-[1px] border-[#8686861a] h-[6rem]'>
                <div className='flex items-center gap-3 relative'>
                    <img src='https://kanban-app-jay.netlify.app/assets/logo-mobile.c1810dc7.svg' 
                        className='min-w-[1.5rem] md:hidden'
                    />
                    <div className='flex gap-1 items-center'>
                        <p className={`flex max-w-[10rem] md:max-w-[13rem] overflow-hidden text-ellipsis text-left whitespace-nowrap font-bold ${isLightToggled ? 'text-black' : 'text-white'} text-[1.2rem] md:text-[1.5rem]`}>{ Boards === null || Boards.length===0 ?'No Board Found' :  currentBoard?.name}</p>
                        <button className='md:hidden' onClick={boardsDropdown}><i className='text-[#635FC7] font-extrabold text-[1.3rem]'>{boardsModal ? <RxCaretUp /> : <RxCaretDown />}</i></button>
                    </div>
                    <div className='md:hidden'>
                    </div>
                </div>
                {Boards && Boards.length>0 && 
                    <div className='flex items-center gap-3 md:ml-10 lg:ml-[30%]'>
                        {colLength>0 && 
                        <button onClick={addNewTaskDropdown} className='bg-[#635FC7] md:flex items-center rounded-full gap-1 px-3 py-1 md:px-6 md:rounded-lg md:py-3 lg:rounded-full'>
                            <i className='font-bold text-[1.2rem] text-white md:text-[0.8rem]'><GoPlus /></i>
                            <p className='hidden md:block font-semibold text-[1.1rem] md:text-[0.8rem] lg:text-[1rem] lg:font-bold text-white'>Add New Task</p>
                        </button>}
                        <button onClick={editBoarddropDown}>
                            <i className='text-[1.2rem] text-[#88899b] min-w-[22px] h-[38px]'><IoEllipsisVerticalOutline /></i>
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}
