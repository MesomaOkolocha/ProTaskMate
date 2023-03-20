import {useState, useEffect, useRef, useCallback} from 'react'
import { useAuth } from '../../Contexts/AppContext'
import { FaTimes } from 'react-icons/fa'
import { generateColumn } from '../../Functions/Functions'
import { BoardType } from '../../Types/types'
import { nanoid } from 'nanoid'

export default function CreateNewBoard() {

  const {dispatch, isLightToggled, Boards, modals, currentBoard, currentBoardCopy, errorMessage } = useAuth()
  
  const modalRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

    const newBoard: BoardType = {
        id: nanoid(),
        name: '',
        columns: [{
            tasks: [],
            name: '',
            id: nanoid()
        }],
        isActive: false
    }
   
    useEffect(()=>{
        dispatch({
        type: 'setCurrentBoardCopy',
        payload: {
            currentBoardCopyPayload: newBoard
        }
        })
    }, [])

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
    }, [modalRef, modals.createBoardModal]);

    useEffect(() => {
        setIsOpen(modals.createBoardModal)
    }, [modals.createBoardModal]);

    function cancel(){
        dispatch({
        type: 'setNoModals'
        })
    }

    function addColumn(){
        if(currentBoardCopy){
        const newColumn = generateColumn()
        const Board = {...currentBoardCopy, columns: [...currentBoardCopy.columns, newColumn]}
        dispatch({
            type: 'setCurrentBoardCopy',
            payload: {
            currentBoardCopyPayload: Board
            }
        })
        }
    }

    function deleteItem(id: string | number){
        if(currentBoardCopy){
            const newBoard = {...currentBoardCopy, columns: currentBoardCopy.columns.filter(item=>item.id!==id)}
            dispatch({
                type: 'setCurrentBoardCopy',
                payload: {
                currentBoardCopyPayload: newBoard
                }
            })
        }
    }

    function newBoardFunction(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(currentBoard && currentBoardCopy){
            const {name, columns} = currentBoardCopy
            const isFilled = columns.every(col=>col.name!=='')
            if(name==='' || !isFilled){
                return dispatch({
                    type: 'setError',
                    payload: {
                        errorPayload: 'Add a name to the board'
                    }
                })
            } else {
                const newBoards: BoardType[] = [
                    ...Boards.map(board=>{
                        return {...board, isActive: false}
                    }),
                    {...currentBoardCopy, isActive: true}
                ]
                
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
  
    return (
        <>
        {
        isOpen && currentBoardCopy &&
        <div ref={modalRef} className={`rounded-[10px] ${isLightToggled ? 'bg-white' : 'bg-[#2B2C37]'} w-full max-w-[30rem] min-w-[350px] p-8 fixed top-0 md:top-[10%] z-[99999] h-full md:min-h-[250px] md:max-h-[550px] md:flex md:flex-col `}>  
            <button onClick={cancel} className='absolute md:hidden top-[0.5rem] right-[0.3rem] rounded-[4px] p-[0.3rem] bg-[#0808081a] text-white'><FaTimes /></button>
            <h3 className={`mb-4 text-[1.125rem] font-semibold ${isLightToggled ? 'text-black' : 'text-white'}`}>Add New Board</h3>
            <form onSubmit={newBoardFunction}>
                <div className='flex flex-col'>
                    <h3 className={`text-[0.75rem] font-semibold ${isLightToggled ? 'text-[#828fa3]' : 'text-white '} mb-2`}>Name</h3>
                    <label className='mb-2 flex justify-between items-center'>
                        <input 
                        type='text'
                        defaultValue={currentBoardCopy.name}
                        className={`${isLightToggled ? 'text-black' : 'text-white'} w-full bg-transparent border-[2px] rounded-md px-4 py-2 text-[0.8125rem] font-semibold  transition-colors delay-200 ease-linear outline-none focus:border-[#635FC7]  ${ errorMessage !=='' ? 'border-red-400' : 'border-[#828ca366]'}`}
                        value={currentBoardCopy.name}
                        onChange={(e)=>{
                            dispatch({
                                type: 'setError',
                                payload: {
                                    errorPayload: ''
                                }
                            })
                            dispatch({
                                type: 'setCurrentBoardCopy',
                                payload: {
                                    currentBoardCopyPayload: {
                                        ...currentBoardCopy,
                                        name: e.target.value
                                    }
                                }
                            })
                        }}
                        />
                    </label>
                    {errorMessage!=='' && <p className='text-red-400  font-semibold text-[0.8125rem]'>Required</p>}
                </div>
                <div className='flex flex-col mt-6 md:max-h-[300px] overflow-y-scroll no-scrollbar'>
                    <h3 className={`text-[0.75rem] font-semibold  ${isLightToggled ? 'text-[#828fa3]' : 'text-white '} mb-2`}>Columns</h3>
                    {currentBoardCopy.columns?.map(item=>{
                        return (
                            <label key={item.id} className='mb-2 flex justify-between items-center'>
                                <input 
                                type='text'
                                className={`${currentBoardCopy.columns?.length > 1 ? 'w-[90%]' : 'w-full'} bg-transparent border-[2px] rounded-md px-4 py-2 text-[0.8125rem] font-semibold ${isLightToggled ? 'text-black' : 'text-white'} transition-colors delay-200 ease-linear outline-none focus:border-[#635FC7] border-[#828ca366]  ${ errorMessage !=='' ? 'border-red-400' : 'border-[#828ca366]'}`}
                                value={item.name}
                                onChange={(e)=>{
                                    dispatch({
                                        type: 'setError',
                                        payload: {
                                            errorPayload: ''
                                        }
                                    })
                                    dispatch({
                                        type: 'setCurrentBoardCopy',
                                        payload: {
                                            currentBoardCopyPayload: {
                                                ...currentBoardCopy,
                                                columns: currentBoardCopy.columns.map(c=>{
                                                    if(c.id===item.id){
                                                        return {
                                                            ...c,
                                                            name: e.target.value
                                                        }
                                                    }else return c
                                                })
                                            }
                                        }
                                    })
                                }}
                                />
                                {currentBoardCopy.columns?.length > 1 && <button type='button' onClick={(e)=>{e.stopPropagation(); deleteItem(item.id)}} className='text-[#808080] opacity-20 text-[1.5rem]'><FaTimes /></button>}
                            </label>
                        )
                    })}
                    {errorMessage!=='' && <p className='text-red-400  font-semibold text-[0.8125rem]'>Required</p>}
                </div>
                <div className='mt-4 flex flex-col gap-4 w-full'>
                    <button type='button' onClick={()=>addColumn()} className={`${currentBoardCopy.columns.length < 5 ? 'flex' : 'hidden'} font-semibold rounded-full py-2 text-[0.8125rem] items-center justify-center ${isLightToggled ? 'bg-[#f4f7fd]' : 'bg-white'} text-[#635fc7]`}>+ Add New Column</button>
                    <button type='submit' className='font-semibold rounded-full py-2 text-[0.8125rem] flex items-center justify-center bg-[#635fc7] text-white'>Create New Board</button>
                </div>
            </form>
        </div>
        }
        </>
    )
}
