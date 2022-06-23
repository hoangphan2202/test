import dayjs from 'dayjs'
import PropTypes from 'prop-types'

const TimeCell = ({ className, time }) => {
  return <div className={className}>{time && dayjs(time).format('DD/MM/YYYY HH:mm')}</div>
}

TimeCell.propTypes = {
  className: PropTypes.string,
  time: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default TimeCell
