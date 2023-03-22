import { useEffect } from 'react'
import { useAuth } from '../Contexts/AppContext'
import useWindowDimensions from '../Hooks/windowDimensions'
import NewColumn from './NewColumn'
import { tasksType } from '../Types/types'
import Column from './Column'

export default function Body() {

    const { currentBoard, sideBarShown, isLightToggled } = useAuth()
    

    const {height} = useWindowDimensions()
    const newHeight = height-96
    const style = {
        height: newHeight
    }


    return (
        <div className={`${isLightToggled ? 'bg-[#F4F7FD]' : 'bg-[#20212C]'} delay-100 transition-all ease-linear px-4 py-6 md:px-10 overflow-x-scroll bodyScrollbarH flex ${sideBarShown && 'md:ml-[300px]'} scrollbar`} style={style}>
            {currentBoard?.columns?.map((column, index)=>{
                return (
                    <Column column={column} index={index}/>
                )
            })}
            <NewColumn />
        </div>
    )
}
