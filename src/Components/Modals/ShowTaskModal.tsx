import {useState, useEffect, useRef} from 'react'
import { useAuth } from '../../Contexts/AppContext'
import { IoEllipsisVerticalOutline } from 'react-icons/io5'
import { FaCheck, FaTimes } from 'react-icons/fa';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';

export default function ShowTaskModal() {

    const { currentBoard, dispatch, currentTask, Boards, modals } = useAuth()

    const modalRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isStatusOpen, setIsStatusOpen] = useState(false)

    useEffect(()=>{
        
        const newBoards = Boards.map(item=>{
            if(item.name === currentBoard?.name){
                return {
                    ...item,
                    columns: item.columns.map(column=>{
                        if(column.name === currentTask.status){
                            return {
                                ...column,
                                tasks: column.tasks.map(item=>{
                                    if(item.title === currentTask.title){
                                        return currentTask
                                    }else return item
                                })
                            }
                        }else return column
                    })
                }
            } else return item;
        })
       
        dispatch({
            type: 'setBoards',
            payload: {
                BoardsPayload: newBoards
            }
        })
    }, [currentTask])

    useEffect(()=>{
        const newBoards = Boards.map(board=>{
            if(board.id === currentBoard?.id){
                return currentBoard
            } else return board
        })
        dispatch({
            type: 'setBoards',
            payload: {
                BoardsPayload: newBoards
            }
        })
    },[currentBoard])

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            event.stopPropagation()
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                dispatch({
                type: 'setNoModals'
                })
            }
        }

        window.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, [modalRef, modals.showTaskModal]);

    useEffect(() => {
        if (modals.showTaskModal) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [modals]);

    function setChecked(id: string | number){
        const newCurrentTask = {
            ...currentTask,
            subtasks: currentTask.subtasks.map(item=>{
                if(item.id === id){
                    return {
                        ...item,
                        isCompleted: !item.isCompleted
                    }
                }else return item
            })
        }
        dispatch({
            type: 'setCurrentTask',
            payload: {
                currentTaskPayload: newCurrentTask
            }
        })
    }

    function setStatusItemsOpen(){
        setIsStatusOpen(!isStatusOpen)
    }

    function changeStatus(id: string | number){
        const findStatus =  currentBoard?.columns.find(item=>item.id === id)
        if(findStatus && currentBoard){
            
            const newCurrentTask = {
                ...currentTask,
                status: findStatus.name,
                statusId: findStatus.id
            }

            const newCurrentBoard = {
                ...currentBoard,
                columns: currentBoard.columns.map(column=>{
                    if (column.name === newCurrentTask.status){
                        return {
                            ...column,
                            tasks: [
                                ...column.tasks,
                                newCurrentTask
                            ]
                        }
                    } else if (column.name === currentTask.status){
                        return {
                            ...column,
                            tasks: column.tasks.filter(task=>task.id !== currentTask.id)
                        }
                    }else return column
                })
            }

            console.log(newCurrentBoard)

            dispatch({
                type: 'setCurrentBoard',
                payload: {
                    currentBoardPayload: newCurrentBoard
                }
            })
            
            dispatch({
                type: 'setCurrentTask',
                payload: {
                    currentTaskPayload: newCurrentTask
                }
            })
        }
        setIsStatusOpen(!isStatusOpen)
    }

    function cancel(){
        dispatch({
          type: 'setNoModals'
        })
    }

    const subtasksNumber = currentTask.subtasks.length;
    const completedSubtasks = currentTask.subtasks.filter(item=>item.isCompleted).length 
    
    return (
        <>
        {
            isOpen &&
            <div ref={modalRef} className='rounded-[10px] bg-[#2B2C37] w-full max-w-[30rem] min-w-[350px] p-8 fixed top-0 md:top-[10%] z-[99999] h-full md:min-h-[250px] md:max-h-[550px] md:flex md:flex-col'>  
                <button onClick={cancel} className='absolute md:hidden top-[0.5rem] right-[0.3rem] rounded-[4px] p-[0.3rem] bg-[#0808081a] text-white'><FaTimes /></button>
                <div className='flex justify-between items-center mb-[0.5rem]'>
                    <h3 className='text-white text-[1.125rem] font-semibold'>{currentTask.title}</h3>
                    <button className='text-[1.2rem] text-[#88899b] min-w-[22px] h-[38px]' ><IoEllipsisVerticalOutline /></button>
                </div>
                <p className='text-[#828fa3] max-h-[10rem] overflow-x-hidden break-words overflow-y-auto text-[0.8125rem]'>{currentTask.description ==='' ? 'No description' : currentTask.description}</p>
                <div className='mt-6 flex flex-col w-full mb-2'>
                    <p className='text-[0.75rem] text-white font-semibold'>{`Subtasks (${completedSubtasks} of ${subtasksNumber})`}</p> 
                   <div className='mt-2'>
                   {
                        currentTask.subtasks.map(tasks=>{
                            return (
                                <div onClick={(e)=>{e.stopPropagation(); setChecked(tasks.id)}} className={`${tasks.isCompleted ? 'bg-[#525170]' : 'bg-[#20212C]'} mb-2 flex items-center gap-6 p-3 rounded-md text-[0.75rem] text-white font-semibold`}>
                                    <div className={`${tasks.isCompleted ? 'bg-[#635FC7]' : 'bg-[#2B2C37] h-4'} p-1 rounded-sm w-4 text-[0.5rem]`}>{tasks.isCompleted && <FaCheck />}</div>
                                    <p className={`${tasks.isCompleted ? 'line-through' : ''}`}>{tasks.title}</p>
                                </div>
                            )
                        })
                    }
                   </div>
                </div>
                <div className='flex flex-col mt-6 relative transition-all delay-75'>
                    <p className='text-[0.75rem] font-semibold text-white mb-2'>Status</p>
                    <button type='button' onClick={setStatusItemsOpen} className={`flex justify-between border-[2px] rounded-md px-4 py-2 text-[0.8125rem] font-semibold text-white transition-colors delay-200 ease-linear outline-none ${isStatusOpen ? 'border-[#635FC7]' : 'border-[#828ca366]'}`}>
                        <span>{currentTask.status}</span>
                        <span className='text-[#635fc7] text-[1.2rem]'>{isStatusOpen ? <BiChevronUp /> : <BiChevronDown /> }</span>
                    </button>
                   {isStatusOpen &&  
                   <div className='bg-[#20212C] flex flex-col gap-2 h-fit absolute top-20 p-4 w-full rounded-[4px] '>
                        {
                            currentBoard?.columns.map(status=>{
                                return (
                                    <button type='button' onClick={(e)=>{e.stopPropagation(); changeStatus(status.id)}} className='text-[#828fa3] text-[0.8125rem] capitalize text-left'>{status.name}</button>
                                )
                            })
                        }
                    </div>
                    }
                </div>
            </div>
        } 
        </>
    )
}