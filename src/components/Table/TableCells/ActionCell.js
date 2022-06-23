import { FiEdit, FiTrash } from 'react-icons/fi'
import PropTypes from 'prop-types'

const ActionCell = ({ onEdit, onDelete }) => {
  return (
    <div className="flex justify-center space-x-2 text-sm">
      {onEdit && (
        <FiEdit
          data-tip=""
          data-for={`edit-btn-tooltip`}
          size={'1.2rem'}
          className="mx-2 transform cursor-pointer outline-none transition-transform duration-300 hover:-translate-y-1 hover:text-primary"
          onClick={onEdit}
        />
      )}
      {onDelete && (
        <FiTrash
          data-tip=""
          data-for={`delete-btn-tooltip`}
          size={'1.2rem'}
          className="mx-2 transform cursor-pointer outline-none transition-transform duration-300 hover:-translate-y-1 hover:text-primary"
          onClick={onDelete}
        />
      )}
    </div>
  )
}

ActionCell.propTypes = {
  editText: PropTypes.string,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
}

ActionCell.defaultProps = {
  editText: 'Chỉnh sửa',
}

export default ActionCell
