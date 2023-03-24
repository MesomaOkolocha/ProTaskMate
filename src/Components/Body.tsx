import { useEffect } from 'react'
import { useAuth } from '../Contexts/AppContext'
import useWindowDimensions from '../Hooks/windowDimensions'
import NewColumn from './NewColumn'
import { tasksType } from '../Types/types'
import Column from './Column'
import { GoPlus } from 'react-icons/go'

export default function Body() {

    const { Boards, dispatch, currentBoard, sideBarShown, isLightToggled } = useAuth()
    

    const {height} = useWindowDimensions()
    const newHeight = height-96
    const style = {
        height: newHeight
    }

    if(!Boards || Boards.length===0){
        return (
            <div className={`${isLightToggled ? 'bg-[#F4F7FD]' : 'bg-[#20212C]'} delay-100 transition-all ease-linear flex flex-col items-center justify-center w-full px-4 ${sideBarShown && 'md:ml-[300px]'} scrollbar`} style={style}>
                <p className='text-center text-white font-semibold text-[1.1rem]'>Your dashboard is empty. Create a new board to get started</p>
                <button onClick={()=>{
                    dispatch({
                        type: 'setCreateBoardModalTrue'
                    })
                }} className='flex text-white font-bold p-3 rounded-full items-center gap-1 mt-3 bg-[#635fc7]'>
                    <i className='text-[0.6rem]'><GoPlus /></i>
                    <p>Create New board</p>
                </button>
            </div>
        )
    }

    return (
        <div className={`${isLightToggled ? 'bg-[#F4F7FD]' : 'bg-[#20212C]'} delay-100 transition-all ease-linear px-4 py-6 md:px-10 w-full overflow-x-scroll bodyScrollbarH flex ${sideBarShown && 'md:ml-[300px]'} scrollbar`} style={style}>
            {currentBoard?.columns?.map((column, index)=>{
                return (
                    <Column column={column} index={index}/>
                )
            })}
            <NewColumn />
        </div>
    )
}
