import {useState} from 'react'
import { useAuth } from '../Contexts/AppContext'
import { createNewBoard, logout } from '../Functions/Functions'
import { Board } from './Board'

export default function Aside() {

    const [loading, setLoading] = useState(false)
    const {dispatch, username} = useAuth()

    function logoutUser(){
        logout()
        dispatch({
            type: 'setNoUser'
        })
        dispatch({
            type: 'setNoParameter'
        })

        dispatch({
            type: 'setNoBoards'
        })
    }

    async function generateBoard(){
        setLoading(true)
        await createNewBoard(username, Board)
        setLoading(false)
    }

    return (
        <div className='fixed bg-[#2B2C37] w-[18.75rem] h-[86vh] hidden md:flex items-center gap-2 px-4 py-6 md:px-10 border-b-[1px] border-r-[1px] border-[#8686861a]'>
             <button disabled={loading} className='text-white ml-3 bg-blue-600 rounded-md p-2' onClick={generateBoard}>Create New Board</button>
            <button className='bg-blue-100 p-2 text-white rounded-sm' onClick={logoutUser}>Logout</button>
        </div>
    )
}
