import PropTypes from 'prop-types'
import { MdUpload } from 'react-icons/md'

const ActivateCell = ({ id, onActive, isActive, ...props }) => {
  return (
    <div className="flex justify-center space-x-2 text-sm">
      {onActive && !isActive && (
        <div
          className="bg-white-1 text-black-1 cursor-pointer rounded-full border p-1 hover:border-primary hover:bg-primary hover:opacity-100"
          onClick={onActive}
          data-tip=""
          data-for={id}
          {...props}
        >
          <MdUpload size="1rem" className="" />
        </div>
      )}
      {onActive && isActive && (
        <div data-tip="" data-for={id} className="p-1 text-primary">
          <MdUpload size="1rem" />
        </div>
      )}
    </div>
  )
}

ActivateCell.propTypes = {
  onActive: PropTypes.func,
  isActive: PropTypes.bool,
  id: PropTypes.string.isRequired,
}

export default ActivateCell
