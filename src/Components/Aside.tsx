import {useState} from 'react'
import { useAuth } from '../Contexts/AppContext'
import { createNewBoard, deleteUserAccount, logout } from '../Functions/Functions'
import { Board } from './Board'
import useWindowDimensions from '../Hooks/windowDimensions'
import { TbLayoutBoardSplit } from 'react-icons/tb'
import { GoPlus } from 'react-icons/go'

export default function Aside() {

    const [loading, setLoading] = useState(false)
    const {dispatch, username, Boards} = useAuth()

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

    async function deleteAccount(){
        setLoading(true)
        try{
            await deleteUserAccount(username)
            dispatch({
                type: 'setNoUser'
            })
        } catch (error){
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    function changeBoard(id: string | number){
        const currentBoard = Boards.find(item=>item.id===id) || Boards[0]
        const newBoards = Boards.map(board=>{
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
    }
    const { height } = useWindowDimensions()

    const newHeight = height - 96
    
    const style = {
        height: newHeight
    }

    return (
        <div className='fixed bg-[#2B2C37] w-[18.75rem] hidden md:flex gap-2 px-4 py-6 md:px-10 border-b-[1px] border-r-[1px] border-[#8686861a]' style={style}>
            <div>
                <h3 className='font-semibold text-[#828fa3] text-[0.75rem] mb-4 tracking-[2.4px]'>{`ALL BOARDS (${Boards.length})`}</h3>
                <div>
                    {Boards.map(board=>{
                        //Aside Boards
                        return (
                            <div key={board.id} onClick={()=>changeBoard(board.id)} className='flex items-center gap-2 text-left pb-2 min-h-[2.8rem] h-fit mb-[0.2rem] relative bg-transparent cursor-pointer transition-colors delay-200 ease-in'>
                                <i className='text-[#828fa3] text-[1.5rem]'><TbLayoutBoardSplit /></i>
                                <p className='text-[1rem] text-[#828fa3] font-semibold'>{board.name}</p>          
                            </div>
                        )
                    })}
                    <div className='flex items-center gap-2 text-left pb-2 min-h-[2.8rem] h-fit mb-[0.2rem] cursor-pointer relative bg-transparent transition-colors delay-200 ease-in'>
                        <i className='text-[#635fc7] text-[1.5rem]'><TbLayoutBoardSplit /></i>
                       <div onClick={generateBoard} className='flex items-center gap-1 text-[1rem] text-[#635fc7] font-semibold'>
                            <i className='text-[0.6rem]'><GoPlus /></i>
                            <p>Create New board</p>
                        </div>       
                    </div>
                    <div className='flex items-center gap-2 text-left pb-2 min-h-[2.8rem] h-fit mb-[0.2rem] cursor-pointer relative bg-transparent transition-colors delay-200 ease-in'>
                        <i className='text-[#ba3232] text-[1.5rem]'><TbLayoutBoardSplit /></i>
                       <div onClick={deleteAccount} className='flex items-center gap-1 text-[1rem] text-[#ba3232] font-semibold'>
                            <i className='text-[0.6rem]'><GoPlus /></i>
                            <p>Delete Account</p>
                        </div>       
                    </div>
                </div>
            </div>
        </div>

    )
}
