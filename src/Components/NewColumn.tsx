import React from 'react'
import { useAuth } from '../Contexts/AppContext'

export default function NewColumn() {
    
    const { dispatch } = useAuth()

    function setAddColumnShow(){
        dispatch({
            type: 'setAddColumnModalTrue'
        })
    }
    return (
        <div className='min-w-[17.5rem] flex flex-col mr-8 h-full text-white overflow-y-scroll no-scrollbar'>
        <div className='flex items-center gap-2 tracking-[2.4px] font-semibold text-[0.75rem] text-[#828fa3]'>
            <div className='h-[15px] w-[15px]  rounded-full'></div>
            <h3></h3>
        </div>
        <button onClick={setAddColumnShow} className='mt-6 flex bg-gradient-to-b from-[#7b849333] via-[#828fa31a] to-[#828fa300] items-center justify-center text-[#828fa3] text-[1.3rem] font-bold hover:text-[#635FC7] transition-color ease-linear delay-100 h-full rounded-lg'>
            + New Column
        </button>
    </div>
    )
}
