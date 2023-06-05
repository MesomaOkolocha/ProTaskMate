import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { useAuth } from '../Contexts/AppContext'
import { columnType } from '../Types/types'
import Tasks from './Tasks'

export default function Column({column, index}: {column: columnType, index: string | number}) {
    
    const { isLightToggled } = useAuth()
    const tasks = column.tasks || []
    const length = tasks.length

    return (
        <div key={`${column.id}${index}`} className={` min-w-[17.5rem] flex flex-col mr-8 h-full text-white p-1`}>
            <div className='flex items-center gap-2 tracking-[2.4px] font-semibold text-[0.75rem] text-[#828fa3]'>
                <div className={`h-[15px] w-[15px] rounded-full 
                    ${
                        index === 0 ? 'bg-[#49C4E5]' : 
                        index===1 ? 'bg-[#49e597]':
                        index===2 ? 'bg-[#e54949]':
                        index===3 ? 'bg-[#e549c1]': 
                        'bg-[#4c49e5]'
                    }`}>
                </div>
                <h3>{`${column.name.toUpperCase()}(${length})`}</h3>
            </div>
            <Droppable droppableId={column.id.toString()}>
                {provided=>{
                    return (
                       <div key={column.id} className='h-full'>
                        <div ref={provided.innerRef} className={`mt-6 ${length === 0 ? 'outline-dashed h-full outline-2 rounded-lg' : ''} ${isLightToggled ? 'outline-[#cecdcd]' : 'outline-[#2B2C37]'} h-full`}>
                            {column.tasks && column.tasks?.map((task, index) => {
                                return (
                                    <>
                                        <Tasks task={task} key={task.id} index={index}/>
                                    </>
                                )
                            })}
                        </div>
                        {provided.placeholder}
                       </div>
                    )
                }}
            </Droppable>
        </div>
    )
}
