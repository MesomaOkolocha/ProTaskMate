import {useState, useEffect, useRef} from 'react'
import { useAuth } from '../../Contexts/AppContext'
import { FaTimes } from 'react-icons/fa'

export default function AddColumnModal() {
    const [loading, setLoading] = useState(false)
    const {dispatch, username, Boards, modals, currentBoard} = useAuth()
    
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
        if (modals.addColumnModal) {
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
    
    return (
        <>
        {
            isOpen && currentBoard &&
            <div ref={modalRef} className='rounded-[10px] bg-[#2B2C37] w-full max-w-[30rem] min-w-[350px] p-8 fixed top-0 md:top-[30%] z-[99999] h-full md:min-h-[250px] md:max-h-[350px] md:flex md:flex-col'>  
                <button onClick={cancel} className='absolute md:hidden top-[0.5rem] right-[0.3rem] rounded-[4px] p-[0.3rem] bg-[#0808081a] text-white'><FaTimes /></button>
                <h3 className='mb-4 text-[1.125rem] font-semibold text-white'>Add New Column</h3>
                <form>
                  <div className='flex flex-col'>
                    <h3 className='text-[0.75rem] font-semibold text-white mb-2'>Name</h3>
                    <p className=' w-full bg-transparent border-[2px] rounded-md px-4 py-2 text-[0.8125rem] font-semibold text-[#b5aaaa9b] transition-colors delay-200 ease-linear outline-none focus:border-[#635FC7] border-[#828ca366] '>
                      {currentBoard.name}
                    </p>
                  </div>
                  <div className='flex flex-col mt-6'>
                    <h3 className='text-[0.75rem] font-semibold text-white mb-2'>Columns</h3>
                    {currentBoard.columns.map(item=>{
                      return (
                        <label key={item.id} className='mb-2 flex justify-between items-center'>
                          <input 
                            type='text'
                            defaultValue={item.name}
                            disabled={true}
                            className=' w-[90%] bg-transparent border-[2px] rounded-md px-4 py-2 text-[0.8125rem] font-semibold text-white transition-colors delay-200 ease-linear outline-none focus:border-[#635FC7] border-[#828ca366] '
                          />
                          <button className='text-[#808080] opacity-20 text-[1.5rem]'><FaTimes /></button>
                        </label>
                      )
                    })}
                  </div>
                  <div className='mt-4 flex flex-col gap-4 w-full'>
                    <button className='font-semibold rounded-full py-2 text-[0.8125rem] flex items-center justify-center bg-white text-[#635fc7]'>+ Add New Column</button>
                    <button className='font-semibold rounded-full py-2 text-[0.8125rem] flex items-center justify-center bg-[#635fc7] text-white'>Save Chages</button>
                  </div>
                </form>
            </div>
        }
        </>
    )
}
