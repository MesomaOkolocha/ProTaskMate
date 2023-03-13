import { useState, useEffect} from 'react'
import { useAuth } from '../Contexts/AppContext'
import Aside from './Aside';
import Body from './Body';
import Header from './Header';

export default function BoardPage() {

    const { Boards, dispatch } = useAuth()
    
  const [currentBoardSet, setCurrentBoardSet] = useState(false);

    useEffect(()=>{
        if (Boards.length > 0 && !currentBoardSet) {
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
            }
        }
    },[Boards])

    return (
        <div>
            <Header />
            <main className='flex'>
                <Aside />
                <Body />
            </main>
            
        </div>
    )
}
