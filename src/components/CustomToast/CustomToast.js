import { toast } from 'react-toastify'
import { FiCheckCircle, FiXCircle, FiAlertTriangle, FiInfo } from 'react-icons/fi'
import PropTypes from 'prop-types'

const SuccessToast = ({ title, message }) => {
  return (
    <>
      <div className="flex items-center">
        <FiCheckCircle size={20} className="text-green-500" />
        <span className="ml-2">{title || 'Thành công'}</span>
      </div>
      <div className="mt-2">
        <span>{message}</span>
      </div>
    </>
  )
}

SuccessToast.propTypes = {
  title: PropTypes.any,
  message: PropTypes.any,
}

const ErrorToast = ({ title, message }) => {
  return (
    <>
      <div className="flex items-center">
        <FiXCircle size={20} className="text-red-500" />
        <span className="ml-2">{title || 'Lỗi'}</span>
      </div>
      <div className="mt-2 px-2 ">
        <span>{message}</span>
      </div>
    </>
  )
}

ErrorToast.propTypes = {
  title: PropTypes.any,
  message: PropTypes.any,
}

const WarningToast = ({ title, message }) => (
  <>
    <div className="flex items-center">
      <FiAlertTriangle size={20} className="text-yellow" />
      <span className="ml-2">{title || 'Cảnh báo'}</span>
    </div>
    <div className="mt-2">
      <span>{message}</span>
    </div>
  </>
)

WarningToast.propTypes = {
  title: PropTypes.any,
  message: PropTypes.any,
}

const InfoToast = ({ title, message }) => (
  <>
    <div className="flex items-center">
      <FiInfo size={20} className="text-blue" />
      <span className="ml-2">{title || 'Thông tin'}</span>
    </div>
    <div className="mt-2">
      <span>{message}</span>
    </div>
  </>
)

InfoToast.propTypes = {
  title: PropTypes.any,
  message: PropTypes.any,
}

export function showToastSuccess(title, message) {
  toast.dark(<SuccessToast title={title} message={message} />, {
    hideProgressBar: true,
  })
}

export function showToastError(title, message) {
  toast.dark(<ErrorToast title={title} message={message} />, {
    hideProgressBar: true,
  })
}
