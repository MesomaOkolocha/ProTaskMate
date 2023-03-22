import React from 'react'
import { useAuth } from '../Contexts/AppContext'
import { tasksType } from '../Types/types'

export default function Tasks({task}: {task: tasksType}) {
    const {dispatch, isLightToggled, currentBoard} = useAuth()
    const subtasks = task.subtasks || []
    const number = subtasks.filter(item => item.isCompleted).length

    function setModalTrue(){
        dispatch({
            type: 'setShowTaskModalTrue'
        })
    }

    function handleDragStart(e: React.DragEvent, task: tasksType){
        e.dataTransfer.effectAllowed = 'move'
        const taskString = JSON.stringify(task)
        e.dataTransfer.setData('task', taskString)
        if(currentBoard){
            dispatch({
                type: 'setCurrentTask',
                payload: {
                    currentTaskPayload: {
                        ...task,
                    }
                }
            })
        }
    }

    return (
        <div 
            onClick={()=>{
                dispatch({
                    type: 'setCurrentTask',
                    payload: {
                    currentTaskPayload: task
                    }
                })
                setModalTrue()
            }} 
            key={`${task.id}`} 
            className={`flex text-left flex-col w-full min-h-[5.5rem] ${isLightToggled ? 'bg-white' : 'bg-[#2B2C37]'} cursor-grab border-[1px] py-6 px-4 border-[#8686861a] rounded-lg shadow-lg shadow-[#364e7e1a] mb-6 transition delay-100 ease-linear md:hover:opacity-40`}
            draggable
            onDragStart={(e)=>handleDragStart(e, task)}
        >
            <h4 className={`text-[0.9375rem] font-semibold ${isLightToggled ? 'text-black font-semibold' : 'text-white'} mb-2  clamp overflow-hidden text-ellipsis`}>{task.title}</h4>
            <p className='text-[0.75rem] font-semibold text-[#828fa3]'>{`${number} of ${task.subtasks ? task.subtasks.length : 0} subtasks`}</p>
        </div>
    )
}
