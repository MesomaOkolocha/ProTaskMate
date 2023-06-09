import {useState, useEffect, useRef} from 'react'
import { GoPlus } from 'react-icons/go'
import { TbLayoutBoardSplit } from 'react-icons/tb'
import { useAuth } from '../../Contexts/AppContext'
import AsideFooter from '../AsideFooter'

export default function BoardsModal() {
    const {dispatch, isLightToggled, Boards, modals} = useAuth()
    
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
        if (modals.boardsModal) {
          setIsOpen(true);
        } else {
          setIsOpen(false);
        }
    }, [modals]);

    function changeBoard(id: string | number){
        if(Boards){
            const currentBoard = Boards?.find(item=>item.id===id) || Boards[0]
        const newBoards = Boards?.map(board=>{
            if(board.id===id){
                return {
                    ...board,
                    isActive: true
                }
            }else {
                return {
                    ...board,
                    isActive: false
                }
            }
        })

        console.log(currentBoard)
        
        dispatch({
            type: 'setBoards',
            payload: {
                BoardsPayload: newBoards
            }
        })
        dispatch({
            type: 'setCurrentBoard',
            payload: {
                currentBoardPayload: currentBoard
            }
        })
        dispatch({
            type: 'setBoardsModalFalse'
        })
        }
    }
    

    async function generateBoard(){
        dispatch({
            type: 'setCreateBoardModalTrue'
        })
        dispatch({
            type: 'setBoardsModalFalse'
        })
    }

    
    return (
        <>
        {
            isOpen &&
            <div ref={modalRef} className={`fixed top-20 z-[9999] left-[15%] px-6 sm:px-10 md:px-0 ${isLightToggled? 'bg-white' : 'bg-[#2b2c37]'} md:bg-transparent md:relative md:top-0 md:left-[0] py-6 rounded-lg md:rounded-none transition-all delay-50 ease-linear`}>
                <h3 className='font-semibold text-[#828fa3] text-[0.75rem] mb-4 tracking-[2.4px] px-4 md:px-10'>{`ALL BOARDS (${Boards?.length || 0})`}</h3>
                <div className='max-h-[200px] overflow-y-scroll no-scrollbar'>
                    {Boards?.map(board=>{
                        //Aside Boards
                        return (
                            <div key={board.id} onClick={()=>changeBoard(board.id)} className={`flex ${board.isActive ? 'text-white bg-[#635FC7]': 'text-[#828fa3] md:bg-transparent hover:bg-[#635FC7] hover:opacity-70 hover:text-white'} px-4 rounded-r-full items-center gap-2 text-left min-h-[2.8rem] h-fit mb-[0.2rem] relative cursor-pointer transition-all delay-50 ease-linear`}>
                                <i className='text-[1.5rem]'><TbLayoutBoardSplit /></i>
                                <p className='text-[1rem] font-semibold'>{board.name}</p>          
                            </div>
                        )
                    })}
                </div>
                <div>
                    <div className='flex px-4 md:px-10 hover:opacity-70 items-center gap-2 text-left pb-2 min-h-[2.8rem] h-fit mb-[0.2rem] cursor-pointer relative bg-transparent transition-colors delay-200 ease-in'>
                        <i className='text-[#635fc7] text-[1.5rem]'><TbLayoutBoardSplit /></i>
                        <div onClick={generateBoard} className='flex items-center gap-1 text-[1rem] text-[#635fc7] font-semibold'>
                            <i className='text-[0.6rem]'><GoPlus /></i>
                            <p>Create New board</p>
                        </div>       
                    </div>
                </div>
                <AsideFooter />
            </div>
        }
        </>
    )
}
