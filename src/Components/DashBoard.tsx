import { Navigate } from 'react-router-dom'
import {  useEffect } from 'react'
import { useAuth } from '../Contexts/AppContext' 
import { onValue, ref, set } from '@firebase/database'
import { db } from '../firebase'
import Loader from './Loader'
import { useLocation } from 'react-router-dom'
import { logout } from '../Functions/Functions'

export default function DashBoard() {
    const { currentUser, dispatch , username} = useAuth()

    console.log({'username': username, 'currentUser': currentUser})
    const location = useLocation()
    
    useEffect(()=>{
        window.scrollTo(0, 0);
        if(username===''){
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
        
    },[])
    
    if(!currentUser){
        return <Navigate to='/login' />
    }
    
    if(username === ''){
        return <Loader />
    }
    
    return (
        <div className=''>
            <button className='bg-blue-100 p-2 text-white rounded-sm' onClick={logout}>Logout</button>
        </div>
    )
}
