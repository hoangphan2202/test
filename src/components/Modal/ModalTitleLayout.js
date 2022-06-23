import { Dialog } from '@headlessui/react'
import PropTypes from 'prop-types'
import { FiX } from 'react-icons/fi'
import classNames from 'classnames'

const ModalTitleLayout = ({ children, onClose, className }) => {
  return (
    <Dialog.Title
      as="h3"
      className={classNames(
        className,
        'absolute top-1 right-0 z-20 mb-3 text-left text-lg font-medium leading-6 text-gray-900',
      )}
    >
      {children}
      <button className="float-right" onClick={onClose}>
        <FiX size={30} />
      </button>
    </Dialog.Title>
  )
}

ModalTitleLayout.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
}

export default ModalTitleLayout
