import {useState, useEffect, useRef} from 'react'
import { useAuth } from '../../Contexts/AppContext'
import { FaTimes } from 'react-icons/fa'
import { BoardType } from '../../Types/types'
import { generateColumn } from '../../Functions/Functions'

export default function EditModal() {
    const [loading, setLoading] = useState(false)
    const {dispatch, username, Boards, modals, currentBoard} = useAuth()
    const [currentBoardCopy, setCurrentBoardCopy] = useState<BoardType | null>(currentBoard)

    const modalRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
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
    }, [modalRef]);

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

    async function addColumn(){
    
      if(currentBoardCopy){
        setCurrentBoardCopy(prevBoard =>{
          if(prevBoard){
            return {
              ...prevBoard,
              columns: [...prevBoard?.columns, generateColumn()]
            }
          }else {
            return null
          }
        })
      }
    }

    function deleteColumn(id: string | number){

      setCurrentBoardCopy((prevState)=>{
        if(prevState){
          return {
            ...prevState,
            columns: prevState.columns.filter(item=>item.id!==id)
          }
        }else {
          return null
        }
      })
        
    }
    
    return (
      <>
      {
        isOpen && currentBoardCopy &&
          <div ref={modalRef} className='rounded-[10px] bg-[#2B2C37] w-full max-w-[30rem] min-w-[350px] p-8 fixed top-0 md:top-[20%] z-[99999] h-full md:min-h-[250px] md:max-h-[500px] md:flex md:flex-col'>  
            <button onClick={cancel} className='absolute md:hidden top-[0.5rem] right-[0.3rem] rounded-[4px] p-[0.3rem] bg-[#0808081a] text-white'><FaTimes /></button>
            <h3 className='mb-4 text-[1.125rem] font-semibold text-white'>Edit Board</h3>
            <form>
              <div className='flex flex-col'>
                <h3 className='text-[0.75rem] font-semibold text-white mb-2'>Name</h3>
                <label>
                  <input 
                    type='text'
                    defaultValue={currentBoardCopy.name}
                    className=' w-full bg-transparent border-[2px] rounded-md px-4 py-2 text-[0.8125rem] font-semibold text-white transition-colors delay-200 ease-linear outline-none focus:border-[#635FC7] border-[#828ca366] '
                  />
                </label>
              </div>
              <div className='flex flex-col mt-6 max-h-[300px] overflow-y-scroll no-scrollbar'>
                <h3 className='text-[0.75rem] font-semibold text-white mb-2'>Columns</h3>
                {currentBoardCopy.columns.map(item=>{
                  return (
                    <label key={item.id} className='mb-2 flex justify-between items-center'>
                      <input 
                        type='text'
                        defaultValue={item.name}
                        className=' w-[90%] bg-transparent border-[2px] rounded-md px-4 py-2 text-[0.8125rem] font-semibold text-white transition-colors delay-200 ease-linear outline-none focus:border-[#635FC7] border-[#828ca366] '
                      />
                      <button type='button' className='text-[#808080] opacity-20 text-[1.5rem]' onClick={()=>deleteColumn(item.id)}><FaTimes /></button>
                    </label>
                  )
                })}
              </div>
              <div className='mt-4 flex flex-col gap-4 w-full'>
                <button type='button' onClick={addColumn} className='font-semibold rounded-full py-2 text-[0.8125rem] flex items-center justify-center bg-white text-[#635fc7]'>+ Add New Column</button>
                <button className='font-semibold rounded-full py-2 text-[0.8125rem] flex items-center justify-center bg-[#635fc7] text-white'>Save Chages</button>
              </div>
            </form>
        </div>
    }
    </>
  )
}
