import { useState, useEffect} from 'react'
import { useAuth } from '../Contexts/AppContext'
import Aside from './Aside';
import AsideBoards from './AsideBoards';
import Body from './Body';
import Header from './Header';
import BoardsModal from './Modals/BoardsModal';
import DeleteBoardModal from './Modals/DeleteBoardModal';
import EditBoardModal from './Modals/EditBoardModal';

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

    return (
        <div className=''>
            <Header />
            {modals.boardsModal && <div className='md:hidden relative'><BoardsModal /></div>}
            {modals.editBoardmodal && <div className='relative'><EditBoardModal /></div>}
            {modals.deleteBoardModal && <div className='relative flex items-center justify-center'><DeleteBoardModal /></div>}
            <main className={`flex ${modals.boardsModal || modals.deleteBoardModal ? 'opacity-30 delay-100 transition-all ease-linear' : ' delay-100 transition-all ease-linear'}`}>
                <Aside />
                <Body />
            </main>
            
        </div>
    )
}
