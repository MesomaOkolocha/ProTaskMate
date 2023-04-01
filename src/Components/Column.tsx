import React from 'react'
import { useDrop } from 'react-dnd'
import { useAuth } from '../Contexts/AppContext'
import { columnType, tasksType } from '../Types/types'
import Tasks from './Tasks'

export default function Column({column, index}: {column: columnType, index: string | number}) {
    
    const { Boards, dispatch, isLightToggled, currentBoard, currentTask } = useAuth()
    const tasks = column.tasks || []
    const length = tasks.length

    function handleOnDrop(e: React.DragEvent){
        e.preventDefault()
        const taskString = e.dataTransfer.getData('task')
        const task = JSON.parse(taskString)

        if(currentBoard){
            const newBoard = {
                ...currentBoard,
                columns: currentBoard.columns.map(col=>{
                    if(col.id === column.id){
                        const newTasks: tasksType[] = [
                            ...(col.tasks || []).filter(item=>item.id !== task.id), 
                            {...task, status: col.name, statusId: col.id}
                        ]
                        return {
                            ...col,
                            tasks: newTasks
                        }
                    } else return {
                        ...col,
                        tasks: [...(col.tasks || []).filter(t => t.id !== task.id)]
                    }
                })
            } 

            const newBoards = Boards?.map(board=>{
                if(board.id === currentBoard.id){
                    return newBoard
                }else return board
            })

            dispatch({
                type: 'setBoards',
                payload:{
                    BoardsPayload: newBoards
                }
            })
        }
    }

    function handleDragOver(e: React.DragEvent){
        e.preventDefault()
    }

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
            <div 
                onDrop={handleOnDrop} onDragOver={handleDragOver}
                className={`mt-6 ${length === 0 ? 'outline-dashed h-full outline-2 rounded-lg' : ''} ${isLightToggled ? 'outline-[#cecdcd]' : 'outline-[#2B2C37]'} h-full  overflow-y-scroll no-scrollbar`}
            >
            {column.tasks && column.tasks?.map((task) => {
                return (
                    <Tasks task={task} key={task.id}/>
                )
            })}
            </div>
        </div>
    )
}
