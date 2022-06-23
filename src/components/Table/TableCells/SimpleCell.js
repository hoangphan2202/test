import PropTypes from 'prop-types'

const SimpleCell = ({ className, data }) => {
  return <div className={className}>{data}</div>
}

SimpleCell.propTypes = {
  className: PropTypes.string,
  data: PropTypes.any,
}

export default SimpleCell
