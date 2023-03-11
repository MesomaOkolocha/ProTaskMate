import { Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../Contexts/AppContext' 
import { onValue, ref, set } from '@firebase/database'
import { db } from '../firebase'
import Loader from './Loader'
import { useLocation } from 'react-router-dom'

export default function DashBoard() {
    const { currentUser, dispatch , username} = useAuth()

    const location = useLocation()
    
    useEffect(()=>{
        window.scrollTo(0, 0);
        onValue(ref(db, '/users'), snapshot=>{
         const data = snapshot.val()
         if(data !== null){
            for(let key in data) {
               if(data[key].email === currentUser?.email){
                    dispatch({
                        type: 'setUsername',
                        payload: {
                            usernamePayload: data[key].username
                        }
                    })
               }
            }
        }
        }) 
    },[location.pathname])
    
    if(!currentUser){
        return <Navigate to='/login' />
    }
    
    if(username === ''){
        return <Loader />
    }
    
    return (
        <div className=''>
            
        </div>
    )
}
