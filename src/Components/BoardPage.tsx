import { useState, useEffect} from 'react'
import { useAuth } from '../Contexts/AppContext'
import Aside from './Aside';
import AsideBoards from './AsideBoards';
import Body from './Body';
import Header from './Header';
import EditBoardModal from './Modals/EditBoardModal';

export default function BoardPage() {

    const { Boards, dispatch, modals, currentBoard } = useAuth()
    
    const [currentBoardSet, setCurrentBoardSet] = useState(false);

    useEffect(()=>{
        if (Boards.length > 0) {
            const mainboard = Boards.find((item) => {
                return item.isActive === true
            })
            console.log(mainboard)
            if (mainboard) {
                dispatch({
                    type: 'setCurrentBoard',
                    payload: {
                        currentBoardPayload: mainboard
                    }
                })
                setCurrentBoardSet(true)
            }
        }
    },[Boards, currentBoard])

    return (
        <div className=''>
            <Header />
            {modals.boardsModal && <div className='md:hidden relative'><AsideBoards /></div>}
            {modals.editBoardmodal && <div className='relative'><EditBoardModal /></div>}
            <main className={`flex ${modals.boardsModal ? 'opacity-40 delay-100 transition-all ease-linear' : ' delay-100 transition-all ease-linear'}`}>
                <Aside />
                <Body />
            </main>
            
        </div>
    )
}
