import React from 'react'
import classnames from 'classnames'
import { FiX } from 'react-icons/fi'

export default function Slide({ children, open, onClose }) {
  const closeSlide = () => {
    onClose()
  }

  return (
    <>
      {open && <div className="fixed top-0 left-0 z-60 h-full w-full bg-[#000000cc]" onClick={closeSlide} />}
      <div
        className={classnames(
          'absolute left-full z-70 h-screen w-1/2 bg-black-2 px-5 py-4 shadow-lg transition-transform duration-200',
          open && '-translate-x-full transform',
          !open && '-translate-x-0 transform',
        )}
        style={{
          top: '0',
          position: 'fixed',
          overflowY: 'auto',
        }}
      >
        <div className="flex flex-row justify-end">
          <div className="mr-4 cursor-pointer rounded p-3" onClick={closeSlide}>
            <FiX color="white" />
          </div>
        </div>
        {children}
      </div>
    </>
  )
}
