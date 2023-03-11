import { Navigate } from 'react-router-dom'
import {  useEffect } from 'react'
import { useAuth } from '../Contexts/AppContext' 
import { onValue, ref, set } from '@firebase/database'
import { db } from '../firebase'
import Loader from './Loader'
import { useLocation } from 'react-router-dom'
import { createInitialTaskDataOnDatabase, createNewBoard, logout } from '../Functions/Functions'
import { defaultBoard } from '../data'
import { Board } from './Board'

export default function DashBoard() {
    const { currentUser, dispatch , username, Boards} = useAuth()

    console.log(username, Boards)
    const location = useLocation()
    
    useEffect(()=>{
        window.scrollTo(0, 0);
        if(username===''){
            onValue(ref(db, '/users'), snapshot=>{
                const data = snapshot.val()
                if(data !== null){
                    for(let key in data) {
                    if(data[key].email === currentUser?.email && data[key].username){
                        dispatch({
                            type: 'setUsername',
                            payload: {
                                usernamePayload: data[key].username
                            }
                        })
                    }else if(data[key].email === currentUser?.email && !data[key].username){
                       if(currentUser?.displayName){
                            dispatch({
                                type: 'setUsername',
                                payload: {
                                    usernamePayload: currentUser?.displayName
                                }
                            })
                       }
                    }
                    }
                }
            }) 
        }
    },[location.pathname])

    useEffect(()=>{
        if(currentUser?.displayName && username === ''){
            dispatch({
                type: 'setUsername',
                payload: {
                    usernamePayload: currentUser.displayName
                }
            })
        }
    },[])

    useEffect(()=>{
        if(username!=='' && Boards.length === 0){

            const reference = ref(db, 'users/'+username+'/tasks')
            onValue(reference, snapshot=>{
                const data = snapshot.val()
                dispatch({
                    type: 'setBoards',
                    payload:{
                        BoardsPayload: data
                    }
                })
            })

        }
    },[username, Boards])

    function generateBoard(){
        createNewBoard(username, Board)
    }
    
    if(!currentUser){
        return <Navigate to='/login' />
    }
    
    if(username === ''){
        return <Loader />
    }

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
    
    return (
        <div className=''>
            <button className='bg-blue-100 p-2 text-white rounded-sm' onClick={logoutUser}>Logout</button>
            <button className='text-white ml-3 bg-blue-600 rounded-md p-2' onClick={generateBoard}>Create New Board</button>
        </div>
    )
}
