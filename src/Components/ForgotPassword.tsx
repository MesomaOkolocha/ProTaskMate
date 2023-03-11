import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../Contexts/AppContext'
import { forgotPassword } from '../Functions/Functions'
import { useState, useEffect } from 'react'

export default function ForgotPassword() {
    
    const {currentUser, email, dispatch, errorMessage } = useAuth()
    
    const [loading, setLoading] = useState(false)
    
    useEffect(()=>{
        dispatch({
            type: 'setNoParameter'
        })
    },[])
    
    async function handlePasswordReset(e: React.FormEvent<HTMLFormElement>){
       
        e.preventDefault()
        
        if( email === ''){
            return dispatch({
                type: 'setError',
                payload: {
                    errorPayload: 'Input your email'
                }
            })
        }
        
        try{
            setLoading(true)
            await forgotPassword(email)
            dispatch({
                type: 'setError',
                payload: {
                    errorPayload: 'Message Sent to Inbox'
                }
            })
        }catch{
            dispatch({
                type: 'setError',
                payload: {
                    errorPayload: 'Failed to send email'
                }
            })
        }
        setLoading(false)
    }
    
    if(currentUser){
        return <Navigate to ='/' />
    }
    
    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            <h2 className='font-bold text-[2rem] mb-6 text-blue-400'>LOG IN</h2>
            {errorMessage !== '' && <p className={`p-2 w-[300px] ${errorMessage === 'Message Sent to Inbox' ? 'bg-green-400' : 'bg-red-400'} mb-6 text-white`}>{errorMessage}</p>}
            <form className='flex flex-col gap-5' onSubmit={handlePasswordReset}>
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
                
                
                <button disabled={loading} className='text-white w-[300px] p-4 bg-blue-400 rounded-lg text-[1.3rem] font-bold tracking-wide'>Send Email</button>
            </form>
            <p className='mt-6'><Link to='/login' className='text-blue-400 '>Back to Login</Link></p>
        </div>
    )
}
