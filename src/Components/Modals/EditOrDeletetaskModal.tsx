import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../Contexts/AppContext';
import { deleteBoard } from '../../Functions/Functions';

export default function EditOrDeleteTaskModal() {
  
  const { modals, dispatch, isLightToggled, currentBoard, Boards } = useAuth()

  const modalRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  function deleteTaskOpen(){
    dispatch({
      type: 'setDeleteTaskModalTrue'
    })
    dispatch({
      type: 'setShowTaskModalFalse'
    })
  }

  function editTask(){
    dispatch({
      type: 'setEditTaskModalTrue'
    })
    dispatch({
      type: 'setShowTaskModalFalse'
    })
  }

  return (
    <>
    {
      currentBoard && 
      <div className={`${isLightToggled ? 'bg-[#F4F7FD]' : 'bg-[#20212C]'} z-[9999] flex flex-col gap-3 p-4 rounded-md`} ref={modalRef}>
        <button onClick={editTask} className='hover:opacity-70 font-semibold text-[#88899b] text-left pr-10'>Edit Task</button>
        <button onClick={deleteTaskOpen} className='hover:opacity-70 font-semibold text-[#c22d2d] pr-10 text-left'>Delete Task</button>
      </div>
    }
    </>
  )
}