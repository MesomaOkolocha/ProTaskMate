import React from 'react'
import {MdWbSunny} from 'react-icons/md'
import {RiMoonClearFill, RiDeleteBin2Fill} from 'react-icons/ri'
import {BiHide} from 'react-icons/bi'
import {TbUserOff} from 'react-icons/tb'
import { useAuth } from '../Contexts/AppContext'
import { deleteUserAccount, logout } from '../Functions/Functions'

export default function AsideFooter() {

    const {dispatch, username} = useAuth()
    async function deleteUser(){
        try{
            await deleteUserAccount(username)
            dispatch({
                type: 'setNoUser'
            })
        } catch (error){
            console.log(error)
        }
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
        <div className='md:absolute md:left-10 md:bottom-0 '>
            <div className='flex rounded-md items-center justify-center w-[220px] bg-[#20212C] py-2 text-[#828fa3] text-[1.3rem] gap-4'>
                <i><RiMoonClearFill /></i>
                <div className='rounded-full w-[45px] h-[23px] p-1 bg-[#635FC7]'>
                    <div className='bg-white rounded-full h-[15px] w-[15px]'></div>
                </div>
                <i><MdWbSunny /></i>
            </div>
            <div className='mt-4 flex justify-center md:justify-between gap-4 md:gap-0 px-4'>
                <div className='hidden md:flex items-center gap-3 text-[0.9rem] font-semibold text-[#828fa3]'>
                    <i className='text-[1.2rem]'><BiHide /></i>
                    <p>Hide Sidebar</p>
                </div>
                <i className='text-[1.1rem] text-[#c22d2d]' onClick={logoutUser}><TbUserOff /></i>
                <i className='text-[1.1rem] text-[#c22d2d]' onClick={deleteUser}><RiDeleteBin2Fill /></i>
            </div>
        </div>
    )
}
