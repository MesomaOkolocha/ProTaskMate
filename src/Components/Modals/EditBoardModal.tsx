import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../Contexts/AppContext';
import { deleteBoard } from '../../Functions/Functions';

export default function EditBoardModal() {
  
  const { modals, dispatch, isLightToggled, currentBoard, Boards } = useAuth()

  const modalRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        dispatch({
          type: 'setEditBoardsModalFalse'
        })
        setIsOpen(false)
      }
    }
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [modalRef]);

  useEffect(() => {
    if (modals.editBoardmodal) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [modals]);

  function deleteBoardOpen(){
    dispatch({
      type: 'setDeleteBoardModalTrue'
    })
    dispatch({
      type: 'setEditBoardsModalFalse'
    })
  }

  function editBoard(){
    dispatch({
      type: 'setEditModalTrue'
    })
    dispatch({
      type: 'setEditBoardsModalFalse'
    })
  }

  return (
    <>
    {
      isOpen && currentBoard &&
      <div className={`${isLightToggled ? 'bg-[#F4F7FD]' : 'bg-[#20212C]'} absolute right-6 md:right-12 md:-top-3 -top-6 z-[9999] flex flex-col gap-3 p-4 rounded-md`} ref={modalRef}>
        <button onClick={editBoard} className='hover:opacity-70 font-semibold text-[#88899b] text-left pr-10'>Edit Board</button>
        <button onClick={deleteBoardOpen} className='hover:opacity-70 font-semibold text-[#c22d2d] pr-10 text-left'>Delete Board</button>
      </div>
    }
    </>
  )
}