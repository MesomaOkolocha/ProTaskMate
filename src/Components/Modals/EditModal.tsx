import {useState, useEffect, useRef} from 'react'
import { useAuth } from '../../Contexts/AppContext'
import { FaTimes } from 'react-icons/fa'
import { BoardType } from '../../Types/types'
import { generateColumn } from '../../Functions/Functions'

export default function EditModal() {
    const [loading, setLoading] = useState(false)
    const {dispatch, isLightToggled, Boards, modals, currentBoard, currentBoardCopy} = useAuth()
    

    const modalRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    
    useEffect(()=>{
      dispatch({
        type: 'setCurrentBoardCopy',
        payload: {
          currentBoardCopyPayload: currentBoard
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
  }, [modalRef, modals.addColumnModal]);


  useEffect(() => {
      if (modals.editModal) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
  }, [modals]);

  function cancel(){
    dispatch({
      type: 'setNoModals'
    })
  }

  function addColumn(){
    if(currentBoardCopy){
      const Board = {...currentBoardCopy, columns: [...currentBoardCopy.columns, generateColumn()]}
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

  function saveChangesToBoard(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    if(currentBoard && currentBoardCopy && Boards){
      const newColumns = currentBoardCopy?.columns?.filter(item=>item.name !=='') ?? []
      const newBoards: BoardType[] = Boards.map(items=>{
        if(items.id === currentBoard.id){
          return {
            ...currentBoardCopy,
            columns: newColumns
          }
        }else {
          return items
        }
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
    
  return (
    <>
      {
        isOpen && currentBoardCopy &&
          <div ref={modalRef} className={`rounded-[10px] ${isLightToggled ? 'bg-white' : 'bg-[#2B2C37]'} w-full max-w-[30rem] min-w-[350px] p-8 fixed top-0 md:top-[10%] z-[99999] h-full md:min-h-[250px] md:max-h-[550px] md:flex md:flex-col`}>  
            <button onClick={cancel} className='absolute md:hidden top-[0.5rem] right-[0.3rem] rounded-[4px] p-[0.3rem] bg-[#0808081a] text-white'><FaTimes /></button>
            <h3 className={`mb-4 text-[1.125rem] font-semibold ${isLightToggled ? 'text-black' : 'text-white'}`}>Edit Board</h3>
            <form onSubmit={saveChangesToBoard}>
              <div className='flex flex-col'>
                <h3 className={`text-[0.75rem] font-semibold ${isLightToggled ? 'text-[#828fa3]' : 'text-white '} mb-2`}>Name</h3>
                <label>
                  <input 
                    type='text'
                    defaultValue={currentBoardCopy.name}
                    className={`w-full bg-transparent border-[2px] rounded-md px-4 py-2 text-[0.8125rem] font-semibold ${isLightToggled ? 'text-black' : 'text-white'} transition-colors delay-200 ease-linear outline-none focus:border-[#635FC7] border-[#828ca366]`}
                    value={currentBoardCopy.name}
                    onChange={e=>{
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
              </div>
              <div className='flex flex-col mt-6 md:max-h-[300px] overflow-y-scroll no-scrollbar'>
                <h3 className={`text-[0.75rem] font-semibold ${isLightToggled ? 'text-[#828fa3]' : 'text-white '} mb-2`}>Columns</h3>
                {currentBoardCopy.columns?.map((item, index)=>{
                  const length = currentBoardCopy.columns.length || 0
                  return (
                    <label key={item.id} className='mb-2 flex justify-between items-center'>
                      <input 
                        type='text'
                        defaultValue={item.name}
                        className={`${isLightToggled ? 'text-black' : 'text-white'} w-[90%] bg-transparent border-[2px] rounded-md px-4 py-2 text-[0.8125rem] font-semibold  transition-colors delay-200 ease-linear outline-none focus:border-[#635FC7] border-[#828ca366] `}
                        value={item.name}
                        onChange={(e)=>{
                          dispatch({
                            type: 'setCurrentBoardCopy',
                            payload: {
                              currentBoardCopyPayload: {
                                ...currentBoardCopy,
                                columns: currentBoardCopy.columns.map(c=>{
                                  if(item.id === c.id){
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
                        autoFocus={length > 1 && length - index === 1 ? true : false}
                      />
                      <button type='button' className='text-[#808080] opacity-20 text-[1.5rem]' onClick={(e)=>{e.stopPropagation(); deleteItem(item.id)}}><FaTimes /></button>
                    </label>
                  )
                })}
              </div>
              <div className='mt-4 flex flex-col gap-4 w-full'>
                <button type='button' onClick={addColumn} className={`${currentBoardCopy.columns.length < 5 ? 'flex' : 'hidden'} font-semibold rounded-full py-2 text-[0.8125rem] items-center justify-center ${isLightToggled ? 'bg-[#f4f7fd]' : 'bg-white'} text-[#635fc7]`}>+ Add New Column</button>
                <button type='submit' className='font-semibold rounded-full py-2 text-[0.8125rem] flex items-center justify-center bg-[#635fc7] text-white'>Save Chages</button>
              </div>
            </form>
        </div>
      }
    </>
  )
}
