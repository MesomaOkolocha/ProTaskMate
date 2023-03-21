import { nanoid } from 'nanoid';
import {useState, useEffect, useRef} from 'react'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { FaCaretDown, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../Contexts/AppContext';

export default function AddNewTask() {
    
    
    const {dispatch, newTask, Boards, modals, currentBoard, errorMessage, currentBoardCopy, isLightToggled } = useAuth()
    
    const modalRef = useRef<HTMLDivElement>(null);
    
    const [isOpen, setIsOpen] = useState(false);
    const [isStatusOpen, setIsStatusOpen] = useState(false)
    

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
        event.stopPropagation()
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            dispatch({
                type: 'setNoModals'
            })
            dispatch({
                type: 'setError',
                payload: {
                    errorPayload: ''
                }
            })
            }
        }

        window.addEventListener("click", handleClickOutside);
        return () => {
        window.removeEventListener("click", handleClickOutside);
        };
    }, [modalRef, modals.addTaskModal]);

    useEffect(() => {
        dispatch({
            type: 'setNewTask',
            payload: {
                newTaskPayload: {
                    ...newTask,
                    status: '',
                    subtasks: [
                        {
                            title: '',
                            isCompleted: false,
                            id: nanoid() 
                        }
                    ],
                    title: ''
                }
            }
        })
    }, []);
    
    useEffect(() => {
        setIsOpen(modals.addTaskModal)
    }, [modals.addTaskModal]);

    function cancel(){
        dispatch({
        type: 'setNoModals'
        })
        dispatch({
            type: 'setError',
            payload: {
                errorPayload: ''
            }
        })
    }
    
    function setStatusItemsOpen(){
        setIsStatusOpen(!isStatusOpen)
    }

    function selectStatus(name: string){
        if(currentBoard){
            const selectedColumn = currentBoard.columns.find(item=>item.name === name)
            if(selectedColumn){
                const newStatusId = selectedColumn.id
                dispatch({
                    type: 'setNewTask',
                    payload: {
                        newTaskPayload: {
                            ...newTask,
                            status: name,
                            statusId: newStatusId
                        }
                    }
                })
            }
        }
        setIsStatusOpen(!isStatusOpen)
    }

    function addNewSubTask(){
        dispatch({
            type: 'setNewTask',
            payload: {
                newTaskPayload: {
                    ...newTask,
                    subtasks: [
                        ...newTask.subtasks,
                        {
                            title: '',
                            isCompleted: false,
                            id: nanoid()
                        }
                    ]
                }
            }
        })
    }

    function saveNewTask(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const {title, subtasks, status} = newTask
        const isFilled = subtasks.every(item=>item.title!=='')
       
       if(currentBoard){
        if(title === '' || !isFilled || status === ''){
            dispatch({
                type: 'setError',
                payload: {
                    errorPayload: 'Complete all required fields or delete the incomplete ones.'
                }
            })
        } else {
            const newBoards = Boards.map(board=>{
                if(board.name === currentBoard.name){
                    return {
                        ...board,
                        columns: board.columns.map(col=>{
                            if(col.name === newTask.status){
                               if(col.tasks !== undefined) {
                                    return {
                                        ...col,
                                        tasks: [
                                            ...col.tasks,
                                            newTask
                                        ]
                                    }
                               }else return {
                                ...col,
                                tasks: [newTask]
                               }
                            }else return col
                        })
                    }
                } else return board
            })
            dispatch({
                type: 'setBoards',
                payload: {
                    BoardsPayload: newBoards
                }
            })
            dispatch({
                type: 'setNoModals'
            })
        } 
       }  
    }
  
    function deleteSubTask(id: string | number){
        const changedTasks = {
            ...newTask,
            subtasks: newTask.subtasks.filter(item=>item.id !== id)
        }
        dispatch({
            type: 'setNewTask',
            payload: {
                newTaskPayload: changedTasks
            }
        })
    }

    
    return (
        <>
        {
        isOpen && currentBoardCopy &&
        <div ref={modalRef} className={`rounded-[10px] ${isLightToggled ? 'bg-white' : 'bg-[#2B2C37]'}  w-full max-w-[30rem] min-w-[350px] p-8 fixed top-0 md:top-[3%] z-[99999] tasksHeight md:min-h-[250px] md:max-h-[650px] no-scrollbar overflow-y-scroll md:flex md:flex-col`}>  
             <button onClick={cancel} className='absolute md:hidden top-[0.5rem] right-[0.3rem] rounded-[4px] p-[0.3rem] bg-[#0808081a] text-white'><FaTimes /></button>
            <h3 className={`mb-4 text-[1.125rem] font-semibold ${isLightToggled ? 'text-black' : 'text-white'}`}>Add New Task</h3>
            <form onSubmit={saveNewTask}>
                <div className='flex flex-col'>
                <h3 className={`text-[0.75rem] font-semibold ${isLightToggled ? 'text-[#828fa3]': 'text-white'} mb-2`}>Title</h3>
                <label>
                    <div>
                        <input 
                            type='text'
                            className={`${isLightToggled ? 'text-[#000000]': 'text-white'} w-full bg-transparent border-[2px] rounded-md px-4 py-2 text-[0.8125rem] font-semibold text-white transition-colors delay-200 ease-linear outline-none focus:border-[#635FC7] ${ errorMessage !=='' ? 'border-red-400' : 'border-[#828ca366]'} `}
                            value={newTask.title}
                            onChange={e=>{
                                dispatch({
                                    type: 'setError',
                                    payload: {
                                        errorPayload: ''
                                    }
                                })
                                dispatch({
                                    type: 'setNewTask',
                                    payload: {
                                    newTaskPayload: {
                                        ...newTask,
                                        title: e.target.value
                                    }
                                    }
                                })
                            }}
                        />
                        {errorMessage!=='' && <p className='text-red-400 mt-2 font-semibold text-[0.8125rem]'>Required</p>}
                    </div>
                </label>
                </div>
                <div className='flex flex-col mt-6 '>
                    <h3 className={`text-[0.75rem] font-semibold ${isLightToggled ? 'text-[#828fa3]': 'text-white'} mb-2`}>Description</h3>
                    <textarea 
                        className={`${isLightToggled ? 'text-[#000000]': 'text-white'} bg-transparent border-[2px] rounded-md px-4 py-2 text-[0.8125rem] font-semibold text-white transition-colors delay-200 ease-linear outline-none focus:border-[#635FC7] border-[#828ca366] h-20`}
                        onChange = {(e)=>{
                            dispatch({
                                type: 'setNewTask',
                                payload: {
                                  newTaskPayload: {
                                    ...newTask,
                                    description: e.target.value
                                  }
                                }
                              })
                        }}
                        value={newTask.description}
                    />
                </div>
                <div className='flex flex-col mt-6 '>
                    <h3 className={`text-[0.75rem] font-semibold ${isLightToggled ? 'text-[#828fa3]': 'text-white'} mb-2`}>Subtasks</h3>
                    <div className='max-h-[250px] md:max-h-[200px] overflow-y-scroll no-scrollbar'>
                    {newTask.subtasks.map(subtask=>{
                        return (
                            <label key={subtask.id} className='mb-2 flex justify-between items-center'>
                                <div className=' w-[90%]'>
                                    <input 
                                        type='text'
                                        className={`w-full bg-transparent border-[2px] rounded-md px-4 py-2 text-[0.8125rem] font-semibold ${isLightToggled ? 'text-black' : 'text-white'} transition-colors delay-200 ease-linear outline-none focus:border-[#635FC7] ${ errorMessage !=='' ? 'border-red-400' : 'border-[#828ca366]'} `}
                                        value={subtask.title}
                                        onChange={(e)=>{
                                            dispatch({
                                                type: 'setError',
                                                payload: {
                                                    errorPayload: ''
                                                }
                                            })
                                            dispatch({
                                                type: 'setNewTask',
                                                payload: {
                                                    newTaskPayload: {
                                                        ...newTask,
                                                        subtasks: newTask.subtasks.map(task=>{
                                                            if(task.id === subtask.id){
                                                                return {
                                                                    ...task,
                                                                    title: e.target.value
                                                                }
                                                            }else return task
                                                        })
                                                    }
                                                }
                                            })
                                        }}
                                    />
                                    {errorMessage!=='' && <p className='text-red-400 text-[0.8125rem] mt-2'>Required</p>}
                                </div>
                                <button type='button' onClick={(e)=>{e.stopPropagation(); deleteSubTask(subtask.id)}} className='text-[#808080] opacity-20 text-[1.5rem]'><FaTimes /></button>
                            </label>
                        )
                    })}
                    </div>
                  <button type='button' onClick={addNewSubTask} className={`${newTask.subtasks?.length < 5 ? '' : 'hidden'} mt-4 font-semibold rounded-full py-2 text-[0.8125rem] flex items-center justify-center ${isLightToggled ? 'bg-[#F4F7FD]' : 'bg-white'} text-[#635fc7]`}>+ Add New Subtask</button>
                </div>
                <div className='flex flex-col mt-6 relative transition-all delay-75'>
                    <h3 className={`text-[0.75rem] font-semibold ${isLightToggled ? 'text-[#828fa3]': 'text-white'} mb-2`}>Status</h3>
                    <button type='button' onClick={setStatusItemsOpen} className={`flex justify-between border-[2px] rounded-md px-4 py-2 text-[0.8125rem] font-semibold ${isLightToggled ? 'text-black' : 'text-white'} transition-colors delay-200 ease-linear outline-none ${isStatusOpen ? 'border-[#635FC7]' : 'border-[#828ca366]'} ${ errorMessage !=='' ? 'border-red-400' : 'border-[#828ca366]'}`}>
                        <span>{newTask.status}</span>
                        <span className='text-[#635fc7] text-[1.2rem]'>{isStatusOpen ? <BiChevronUp /> : <BiChevronDown /> }</span>
                    </button>
                    {errorMessage!=='' && <p className='text-red-400 mt-2 font-semibold text-[0.8125rem]'>Required</p>}
                   {isStatusOpen &&  
                   <div className={`${isLightToggled ? 'bg-[#F4F7FD]' : 'bg-[#20212C]'} flex flex-col gap-2 h-fit absolute top-20 p-4 w-full rounded-[4px] `}>
                        {
                            currentBoardCopy.columns.map(status=>{
                                return (
                                    <button key={status.id} type='button' onClick={(e)=>{e.stopPropagation(); selectStatus(status.name);}} className='text-[#828fa3] text-[0.8125rem] capitalize text-left'>{status.name}</button>
                                )
                            })
                        }
                    </div>
                    }
                </div>
                <button type='submit' className=' mt-4 w-full font-semibold rounded-full py-2 text-[0.8125rem] flex items-center justify-center bg-[#635fc7] text-white'>Create Task</button>
          </form>
      </div>
    }
    </>
    )
}
