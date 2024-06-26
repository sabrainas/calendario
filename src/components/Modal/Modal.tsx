import React from 'react'
interface iModal{
    children: React.ReactNode;
    closeModal: () => void;
}

export default function Modal({children, closeModal}:iModal) {
  return (
    <>
        <div className='fixed inset-0 bg-[#2f2e2eba] flex justify-center items-center z-50' onClick={closeModal}>
            <div className="flex justify-center items-center" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    </>
  )
}