import React from 'react'

export default function EditBoardModal() {
  return (
    <div className='bg-[#20212C] absolute right-6 md:right-12 md:-top-3 -top-6 z-[9999] flex flex-col gap-3 p-4 rounded-md'>
        <p className='hover:opacity-70 font-semibold text-[#88899b] pr-10'>Edit Board</p>
        <p className='hover:opacity-70 font-semibold text-[#c22d2d] pr-10'>Delete Board</p>
    </div>
  )
}