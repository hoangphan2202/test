import React from 'react'
import { FiX } from 'react-icons/fi'

const ModalClose = ({ onClose }) => {
  return (
    <div className="relative">
      <button className="absolute right-0 top-0" onClick={onClose}>
        <FiX size={30} className="text-gray-600" />
      </button>
    </div>
  )
}

export default ModalClose
