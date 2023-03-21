import { useEffect } from 'react'
import { useAuth } from '../Contexts/AppContext'
import { logout } from '../Functions/Functions'
import useWindowDimensions from '../Hooks/windowDimensions'
import AsideBoards from './AsideBoards'
import NewColumn from './NewColumn'
import { useDrag, useDrop } from 'react-dnd'

export default function Body() {

    const { currentBoard, sideBarShown, dispatch, isLightToggled } = useAuth()
    
    // const [{isDragging}, drag] = useDrag({
    //     type: 'Card',
    //     item: { type: 'CARD' },
    //     collect: monitor => ({
    //         isDragging: monitor.isDragging(),
    //     }),
    // })

    const {height} = useWindowDimensions()
    const newHeight = height-96
    const style = {
        height: newHeight
    }

    function handleOnDrag(e: React.DragEvent){
        e.dataTransfer.effectAllowed = 'move'
    }

    function handleOnDrop(e: React.DragEvent){
        e.dataTransfer.dropEffect = 'move'
    }

    function handleDragOver(e: React.DragEvent){
        e.preventDefault()
        e.dataTransfer.effectAllowed = 'move'
    }

    function setModalTrue(){
        dispatch({
            type: 'setShowTaskModalTrue'
        })
    }

    return (
        <div className={`${isLightToggled ? 'bg-[#F4F7FD]' : 'bg-[#20212C]'} delay-100 transition-all ease-linear px-4 py-6 md:px-10 overflow-x-scroll bodyScrollbarH flex ${sideBarShown && 'md:ml-[300px]'} scrollbar`} style={style}>
            {currentBoard?.columns?.map((column, index)=>{
                const tasks = column.tasks || []
                const length = tasks.length
                return (
                    <div key={`${column.id}${index}`} className={` min-w-[17.5rem] flex flex-col mr-8 h-full text-white overflow-y-scroll no-scrollbar p-1`}>
                        <div className='flex items-center gap-2 tracking-[2.4px] font-semibold text-[0.75rem] text-[#828fa3]'>
                            <div className='h-[15px] w-[15px] bg-[#49C4E5] rounded-full'></div>
                            <h3>{`${column.name.toUpperCase()}(${length})`}</h3>
                        </div>
                        <div 
                            onDrop={handleOnDrop} onDragOver={handleDragOver}
                            className={`mt-6 ${length === 0 ? 'outline-dashed h-full outline-2 rounded-lg' : ''} ${isLightToggled ? 'outline-[#cecdcd]' : 'outline-[#2B2C37]'} h-full`}
                        >
                        {column.tasks && column.tasks.map((task, index) => {
                            const subtasks = task.subtasks || []
                            const number = subtasks.filter(item => item.isCompleted).length
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
                                    key={`${task.id}${index}`} 
                                    className={`flex text-left flex-col w-full min-h-[5.5rem] ${isLightToggled ? 'bg-white' : 'bg-[#2B2C37]'} cursor-grab border-[1px] py-6 px-4 border-[#8686861a] rounded-lg shadow-lg shadow-[#364e7e1a] mb-6 transition delay-100 ease-linear md:hover:opacity-40`}
                                    draggable={true}
                                    onDragStart={(e)=>{handleOnDrag(e)}}
                                >
                                    <h4 className={`text-[0.9375rem] font-semibold ${isLightToggled ? 'text-black font-semibold' : 'text-white'} mb-2  clamp overflow-hidden text-ellipsis`}>{task.title}</h4>
                                    <p className='text-[0.75rem] font-semibold text-[#828fa3]'>{`${number} of ${subtasks.length} subtasks`}</p>
                                </div>
                            )
                        })}
                        </div>
                    </div>
                )
            })}
            <NewColumn />
        </div>
    )
}
