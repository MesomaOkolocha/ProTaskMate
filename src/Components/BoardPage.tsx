import { useState, useEffect} from 'react'
import { useAuth } from '../Contexts/AppContext'
import Aside from './Aside';
import Body from './Body';
import Header from './Header';

export default function BoardPage() {

    const { Boards, dispatch } = useAuth()
    
  const [currentBoardSet, setCurrentBoardSet] = useState(false);

    useEffect(()=>{
        if(Boards.length>0 && !currentBoardSet){
            dispatch({
                type: 'setCurrentBoard',
                payload:{
                    currentBoardPayload: Boards[0]
                }
            })
            setCurrentBoardSet(true)
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
