import { useState, useEffect} from 'react'
import { useAuth } from '../Contexts/AppContext'
import Aside from './Aside';
import AsideBoards from './AsideBoards';
import Body from './Body';
import Header from './Header';
import AddColumnModal from './Modals/AddColumnModal';
import BoardsModal from './Modals/BoardsModal';
import DeleteBoardModal from './Modals/DeleteBoardModal';
import EditBoardModal from './Modals/EditBoardModal';
import EditModal from './Modals/EditModal';

export default function BoardPage() {

    const { Boards, dispatch, modals, currentBoard } = useAuth()
    
    const [currentBoardSet, setCurrentBoardSet] = useState(false);

    useEffect(()=>{
        if (Boards.length > 0) {
            const mainboard = Boards.find((item) => {
                return item.isActive === true
            })
            if (mainboard) {
                dispatch({
                    type: 'setCurrentBoard',
                    payload: {
                        currentBoardPayload: mainboard
                    }
                })
                setCurrentBoardSet(true)
            }else {
                const newMainBoard = Boards[0]
                newMainBoard.isActive = true
                dispatch({
                    type: 'setCurrentBoard',
                    payload: {
                        currentBoardPayload: newMainBoard
                    }
                })
            }
        }
    },[Boards, currentBoard])

    
  useEffect(()=>{
    dispatch({
      type: 'setCurrentBoardCopy',
      payload: {
        currentBoardCopyPayload: currentBoard
      }
    })
  }, [currentBoard])

    const {editBoardmodal, editModal, boardsModal, deleteBoardModal, addColumnModal} = modals
    console.log(addColumnModal)
    return (
        <div className=''>
            <Header />
            {boardsModal && <div className='md:hidden relative'><BoardsModal /></div>}
            {editBoardmodal && <div className='relative'><EditBoardModal /></div>}
            {deleteBoardModal && <div className='relative flex items-center justify-center'><DeleteBoardModal /></div>}
            {addColumnModal && <div className='relative flex items-center justify-center'><AddColumnModal /></div>}
            {editModal && <div className='relative flex items-center justify-center'><EditModal /></div>}
            <main className={`flex ${boardsModal || deleteBoardModal || addColumnModal || editModal ? 'opacity-30 delay-100 transition-all ease-linear' : ' delay-100 transition-all ease-linear'}`}>
                <Aside />
                <Body />
            </main>
            
        </div>
    )
}
