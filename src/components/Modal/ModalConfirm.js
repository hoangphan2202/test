import PropTypes from 'prop-types'
import Modal from './Modal'
import Button from 'components/Button/Button'

const ModalConfirm = ({
  open,
  onClose,
  onConfirm,
  onCancel,
  title,
  className,
  size,
  classNameModal,
  children,
  message,
}) => {
  return (
    <Modal open={open} onClose={onClose} size={size} className={classNameModal}>
      <h5 className="border-b border-black-2 px-8 py-4 text-xl md:text-2xl">{title || 'Thông báo'}</h5>
      <div className={`animate-fade-in py-8 px-8 ${className}`}>{children || message}</div>

      <div className="flex justify-center space-x-4 border-t border-black-2 py-4">
        <Button onClick={onCancel}>Hủy bỏ</Button>
        <Button className="border-0 bg-primary font-bold text-black" onClick={onConfirm}>
          Xác nhận
        </Button>
      </div>
    </Modal>
  )
}

ModalConfirm.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  title: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.string,
  classNameModal: PropTypes.string,
  children: PropTypes.any,
  message: PropTypes.string,
}

ModalConfirm.defaultProps = {
  open: false,
  onClose: () => {},
  onConfirm: () => {},
  onCancel: () => {},
  title: '',
  className: '',
  size: '',
  classNameModal: '',
  children: '',
  message: '',
}

export default ModalConfirm
