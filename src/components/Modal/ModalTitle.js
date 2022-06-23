import { Dialog } from '@headlessui/react'
import PropTypes from 'prop-types'
import { FiX } from 'react-icons/fi'

const ModalTitle = ({ children, onClose }) => {
  return (
    <Dialog.Title
      as="h3"
      className="mb-3 px-4 text-left text-center text-2xl font-medium  font-bold leading-6 text-white"
    >
      {children}
      <button className="float-right" onClick={onClose}>
        <FiX size={30} />
      </button>
    </Dialog.Title>
  )
}

ModalTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
}

export default ModalTitle
