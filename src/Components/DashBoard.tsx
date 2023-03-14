import { Navigate } from 'react-router-dom'
import {  useEffect, useState } from 'react'
import { useAuth } from '../Contexts/AppContext' 
import { onValue, ref, set, update } from '@firebase/database'
import { db } from '../firebase'
import Loader from './Loader'
import { useLocation } from 'react-router-dom'

import BoardPage from './BoardPage'
import { createBaseBoard } from './Board'

export default function DashBoard() {
    const { currentUser, dispatch , username, Boards, currentBoard } = useAuth()

    const location = useLocation()

    console.log(Boards, currentBoard)
    
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
        if(username!==''){
            const reference = ref(db, 'users/'+username)

            update(reference, {
                tasks: Boards
            })
        }
    },[Boards])

    useEffect(()=>{
        if(username!=='' && Boards.length === 0){

            const reference = ref(db, 'users/'+username+'/tasks')
            onValue(reference, snapshot=>{
                const data = snapshot.val()
               if(data!==null){
                    dispatch({
                        type: 'setBoards',
                        payload:{
                            BoardsPayload: data
                        }
                    })
               } else {
                dispatch({
                    type: 'setBoards',
                    payload:{
                        BoardsPayload: [createBaseBoard()]
                    }
                })
               }
            })

        }
    },[username, Boards])

    
    if(!currentUser){
        return <Navigate to='/login' />
    }
    
    if(currentUser && username === ''){
        return <Loader />
    }
    
    if(username === ''){
        return <Loader />
    }
    
    return (
        <BoardPage />
    )
}
