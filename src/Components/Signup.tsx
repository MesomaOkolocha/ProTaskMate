import { Link } from 'react-router-dom'
import { useAuth } from '../Contexts/AppContext'
import {  signUpUser } from '../Functions/Functions'
import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import Loader from './Loader'
import GoogleSignIn from './GoogleSignIn'
import { defaultBoard } from '../data'

export default function Signup() {
    
    const { currentUser, username, password, email, dispatch, errorMessage } = useAuth()

    const [loading, setLoading] = useState(false)
    useEffect(()=>{
        dispatch({
            type: 'setNoParameter'
        })
    },[])
    
    async function handleSignUp(e: React.FormEvent<HTMLFormElement>){
       
        e.preventDefault()
        if(username === '' || password === '' || email === ''){
            return dispatch({
                type: 'setError',
                payload: {
                    errorPayload: 'Complete the form'
                }
            })
        }
        
        try{
            setLoading(true)
            await signUpUser(email, password, username, defaultBoard)
        }catch{
            dispatch({
                type: 'setError',
                payload: {
                    errorPayload: 'Failed to sign Up'
                }
            })
        }
        setLoading(false)
    }
    
    if(currentUser){
        return <Navigate to='/' />
    }
    
    if(loading){
        return <Loader />
    }
    
    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            <h2 className='font-bold text-[2rem] mb-6 text-blue-400'>SIGN UP</h2>
            {errorMessage !== '' && <p className='w-[300px] p-2 text-white bg-red-400 mb-6'>{errorMessage}</p>}
            <form className='flex flex-col gap-5' onSubmit={handleSignUp}>
                <input 
                    type='email'
                    value={email}
                    name='Email'
                    onChange={e => {
                       return dispatch({
                            type: 'setEmail',
                            payload: {
                                emailPayload: e.target.value
                            }
                        })
                    }}
                    className='p-2 border-[2px] w-[300px] border-[#808080] focus:border-blue-400 outline-none rounded-md'
                    placeholder='Email'
                />
                <input 
                    type='text'
                    value={username}
                    name='Username'
                    onChange={e => {
                        dispatch({
                            type: 'setUsername',
                            payload: {
                                usernamePayload: e.target.value
                            }
                        })
                    }}
                    className='p-2 border-[2px] w-[300px] focus:border-blue-400 outline-none border-[#808080] rounded-md'
                    placeholder='Username'
                />
                <input 
                    type='password'
                    value={password}
                    name='Password'
                    onChange={e => {
                        dispatch({
                            type: 'setPassword',
                            payload: {
                                passwordPayload: e.target.value
                            }
                        })
                    }}
                    className='p-2 border-[2px] w-[300px] focus:border-blue-400 outline-none border-[#808080] rounded-md'
                    placeholder='Password'
                />
                
                <button disabled={loading} type='submit' className='text-white w-[300px] p-4 bg-blue-500 rounded-lg text-[1.3rem] font-bold tracking-wide mt-6'>Sign Up</button>
            </form>
            <GoogleSignIn />
            <p className='mt-6 text-white'>Already have an account? <Link to='/login' className='text-blue-400 '>Log In</Link></p>
        </div>
    )
}
