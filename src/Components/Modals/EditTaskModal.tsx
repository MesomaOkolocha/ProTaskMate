import { nanoid } from 'nanoid';
import {useState, useEffect, useRef} from 'react'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { FaCaretDown, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../Contexts/AppContext';

export default function EditTaskModal() {
    
    
    const {dispatch, isLightToggled, Boards, modals, currentBoard, errorMessage, currentBoardCopy, currentTask } = useAuth()
    
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
    }, [modalRef, modals.editTaskModal]);
    
    useEffect(()=>{
        dispatch({
            type: 'setError',
            payload: {
                errorPayload: ''
            }
        })
    },[])
    useEffect(() => {
        setIsOpen(modals.editTaskModal)
    }, [modals.editTaskModal]);

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

    function selectStatus(id: string | number){
        if(currentBoard){
            const selectedColumn = currentBoard.columns.find(item=>item.id === id)
            if(selectedColumn){
                const newStatusId = selectedColumn.id
                dispatch({
                    type: 'setCurrentTask',
                    payload: {
                        currentTaskPayload: {
                            ...currentTask,
                            status: selectedColumn.name,
                            statusId: newStatusId
                        }
                    }
                })
            }
        }
        setIsStatusOpen(!isStatusOpen)
    }

    function addNewSubTask(){
        if(currentTask.subtasks !== undefined){
            dispatch({
                type: 'setCurrentTask',
                payload: {
                     currentTaskPayload: {
                        ...currentTask,
                        subtasks: [
                            ...currentTask.subtasks,
                            {
                                title: '',
                                isCompleted: false,
                                id: nanoid()
                            }
                        ]
                    }
                }
            })
        }else {
            dispatch({
                type: 'setCurrentTask',
                payload: {
                     currentTaskPayload: {
                        ...currentTask,
                        subtasks: [
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
    }

    function saveEditedTask(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const { title, subtasks, status } = currentTask;
      
        // Check if all required fields are filled or incomplete ones have been deleted
        const isFilled = subtasks ? subtasks.every((item) => item.title !== "") : true;
        if (title === "" || !isFilled || status === "") {
          dispatch({
            type: "setError",
            payload: {
              errorPayload: "Complete all required fields or delete the incomplete ones.",
            },
          });
        } else {
          // Update boards with the edited task
          const newBoards = Boards.map((board) => {
            if (board.name === currentBoard?.name) {
              return {
                ...board,
                columns: board.columns.map((col) => {
                  if (col.id === currentTask.statusId) {
                    if (col.tasks !== undefined) {
                      // If there are already tasks in the column, add the edited task
                      return {
                        ...col,
                        tasks: [...col.tasks.filter((item) => item.id !== currentTask.id), currentTask],
                      };
                    } else {
                      // If the column has no tasks, create a new array with the edited task
                      return {
                        ...col,
                        tasks: [currentTask],
                      };
                    }
                  } else {
                    if (col.tasks !== undefined) {
                      // Remove the edited task from columns that are not its status
                      return {
                        ...col,
                        tasks: col.tasks.filter((item) => item.id !== currentTask.id),
                      };
                    } else return col;
                  }
                }),
              };
            } else return board;
          });
          dispatch({
            type: "setBoards",
            payload: {
              BoardsPayload: newBoards,
            },
          });
          dispatch({
            type: "setNoModals",
          });
        }
      }
      

    function deleteSubTask(id: string | number){
        const changedTasks = {
            ...currentTask,
            subtasks: currentTask.subtasks.filter(item=>item.id !== id)
        }
        dispatch({
            type: 'setCurrentTask',
            payload: {
                currentTaskPayload: changedTasks
            }
        })
    }

    
    return (
        <>
        {
        isOpen && currentBoardCopy &&
        <div ref={modalRef} className={`rounded-[10px] ${isLightToggled ? 'bg-white': 'bg-[#2B2C37]'} w-full max-w-[30rem] min-w-[350px] p-8 fixed top-0 md:top-[3%] z-[99999] tasksHeight md:min-h-[250px] md:max-h-[650px] no-scrollbar overflow-y-scroll md:flex md:flex-col`}>  
             <button onClick={cancel} className='absolute md:hidden top-[0.5rem] right-[0.3rem] rounded-[4px] p-[0.3rem] bg-[#0808081a] text-white'><FaTimes /></button>
             <h3 className={`mb-4 text-[1.125rem] font-semibold ${isLightToggled ? 'text-black' : 'text-white'}`}>Edit Task</h3>
            <form onSubmit={saveEditedTask}>
                <div className='flex flex-col'>
                <h3 className={`text-[0.75rem] font-semibold ${isLightToggled ? 'text-[#828fa3]': 'text-white'} mb-2`}>Title</h3>
                <label>
                    <div>
                        <input 
                            type='text'
                            className={`${isLightToggled ? 'text-[#000000]': 'text-white'} w-full bg-transparent border-[2px] rounded-md px-4 py-2 text-[0.8125rem] font-semibold text-white transition-colors delay-200 ease-linear outline-none focus:border-[#635FC7] ${ errorMessage !=='' ? 'border-red-400' : 'border-[#828ca366]'} `}
                            defaultValue={currentTask.title}
                            value={currentTask.title}
                            onChange={e=>{
                                dispatch({
                                    type: 'setError',
                                    payload: {
                                        errorPayload: ''
                                    }
                                })
                                dispatch({
                                    type: 'setCurrentTask',
                                    payload: {
                                    currentTaskPayload: {
                                        ...currentTask,
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
                                type: 'setCurrentTask',
                                payload: {
                                  currentTaskPayload: {
                                    ...currentTask,
                                    description: e.target.value
                                  }
                                }
                              })
                        }}
                        defaultValue={currentTask.description}
                        value={currentTask.description}
                    />
                </div>
                <div className='flex flex-col mt-6 '>
                <h3 className={`text-[0.75rem] font-semibold ${isLightToggled ? 'text-[#828fa3]': 'text-white'} mb-2`}>Subtasks</h3>
                    <div className='max-h-[250px] md:max-h-[300px] overflow-y-scroll no-scrollbar'>
                    {currentTask.subtasks?.map(subtask=>{
                        return (
                            <label className='mb-2 flex justify-between items-center'>
                                <div className=' w-[90%]'>
                                    <input 
                                        type='text'
                                        className={`w-full bg-transparent border-[2px] rounded-md px-4 py-2 text-[0.8125rem] font-semibold ${isLightToggled ? 'text-black' : 'text-white'} transition-colors delay-200 ease-linear outline-none focus:border-[#635FC7] ${ errorMessage !=='' ? 'border-red-400' : 'border-[#828ca366]'} `}
                                        defaultValue={subtask.title}
                                        value={subtask.title}
                                        onChange={(e)=>{
                                            dispatch({
                                                type: 'setError',
                                                payload: {
                                                    errorPayload: ''
                                                }
                                            })
                                            dispatch({
                                                type: 'setCurrentTask',
                                                payload: {
                                                    currentTaskPayload: {
                                                        ...currentTask,
                                                        subtasks: currentTask.subtasks.map(task=>{
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
                    <button type='button' onClick={addNewSubTask} className={` ${currentTask.subtasks === undefined || [] && currentTask.subtasks?.length < 5  ? 'flex' : 'hidden'} mt-4 font-semibold rounded-full py-2 text-[0.8125rem] items-center justify-center ${isLightToggled ? 'bg-[#F4F7FD]' : 'bg-white'} text-[#635fc7]`}>+ Add New Subtask</button>
                </div>
                <div className='flex flex-col mt-6 relative transition-all delay-75'>
                    <h3 className={`text-[0.75rem] font-semibold ${isLightToggled ? 'text-[#828fa3]': 'text-white'} mb-2`}>Status</h3>
                    <button type='button' onClick={setStatusItemsOpen} className={`flex justify-between border-[2px] rounded-md px-4 py-2 text-[0.8125rem] font-semibold ${isLightToggled ? 'text-black' : 'text-white'} transition-colors delay-200 ease-linear outline-none ${isStatusOpen ? 'border-[#635FC7]' : 'border-[#828ca366]'} ${ errorMessage !=='' ? 'border-red-400' : 'border-[#828ca366]'}`}>
                        <span>{currentTask.status}</span>
                        <span className='text-[#635fc7] text-[1.2rem]'>{isStatusOpen ? <BiChevronUp /> : <BiChevronDown /> }</span>
                    </button>
                    {errorMessage!=='' && <p className='text-red-400 mt-2 font-semibold text-[0.8125rem]'>Required</p>}
                   {isStatusOpen &&  
                   <div className='bg-[#20212C] flex flex-col gap-2 h-fit absolute top-20 p-4 w-full rounded-[4px] '>
                        {
                            currentBoardCopy.columns.map(status=>{
                                return (
                                    <button type='button' onClick={(e)=>{e.stopPropagation(); selectStatus(status.id);}} className='text-[#828fa3] text-[0.8125rem] capitalize text-left'>{status.name}</button>
                                )
                            })
                        }
                    </div>
                    }
                </div>
                <button type='submit' className=' mt-4 w-full font-semibold rounded-full py-2 text-[0.8125rem] flex items-center justify-center bg-[#635fc7] text-white'>Save Changes</button>
          </form>
      </div>
    }
    </>
    )
}
