import {useState, useEffect, useRef} from 'react'
import { FaTimes } from 'react-icons/fa'
import { useAuth } from '../../Contexts/AppContext'
import {  deleteBoard } from '../../Functions/Functions'

export default function DeleteBoardModal() {
    const [loading, setLoading] = useState(false)
    const {dispatch, username, Boards, modals, currentBoard, isLightToggled} = useAuth()
    
    const modalRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
          dispatch({
            type: 'setDeleteBoardModalFalse'
          })
        }
      }
      window.addEventListener("click", handleClickOutside);
      return () => {
        window.removeEventListener("click", handleClickOutside);
      };
    }, [modalRef]);

    useEffect(() => {
        if (modals.deleteBoardModal) {
          setIsOpen(true);
        } else {
          setIsOpen(false);
        }
      }, [modals]);

      async function deleteBoardItem(id: string | number){
        setLoading(true)
        try{
          await deleteBoard(id, username)
          dispatch({
            type: 'setCurrentBoard',
            payload:{
              currentBoardPayload: Boards[0]
            }
          })
          dispatch({
            type: 'setNoModals'
          })
        }catch (err){
          console.log(err)
        }finally{
            setLoading(false)
        }
      }

      function cancel(){
        dispatch({
            type: 'setNoModals'
        })
      }
    
    return (
        <>
        {
            isOpen && currentBoard &&
            <div ref={modalRef} className={`p-10 rounded-[10px] ${isLightToggled ? 'bg-[#F4F7FD]' : 'bg-[#2B2C37]'}  max-w-[30rem]  fixed top-0 md:top-[30%] z-[99999] h-full md:h-[250px] md:flex md:flex-col md:justify-between`}>
              <button onClick={cancel} className='absolute md:hidden top-[0.5rem] right-[0.3rem] rounded-[4px] p-[0.3rem] bg-[#0808081a] text-white'><FaTimes /></button>
                <h3 className='text-[#ea5555] text-[1.125rem] font-bold mb-6 md:md-0'>Delete this board?</h3>
                <p className='text-[#828fa3] text-[0.8125rem] font-semibold mb-6 md:mb-0'>
                    {`Are you sure you want to delete the '${currentBoard?.name}' board? This action will remove all columns and tasks and cannot be reversed`}
                </p>
                <div className='grid grid-cols-2 gap-5 md:mt-6'>
                    <button disabled={loading} onClick={()=>deleteBoardItem(currentBoard?.id)} className='text-white font-semibold rounded-full py-2 bg-red-400 hover:opacity-60'>
                        Delete
                    </button>
                    <button onClick={cancel} className='text-[#635FC7] font-semibold rounded-full py-2 bg-white hover:opacity-60'>
                        Cancel
                    </button>
                </div>
            </div>
        }
        </>
    )
}
