import Badge from 'components/Badge/Badge'
import PropTypes from 'prop-types'

const BadgeCell = ({ data, color }) => {
  return (
    <div className="text-center">
      <Badge color={color}>{data}</Badge>
    </div>
  )
}

BadgeCell.propTypes = {
  data: PropTypes.any,
}

export default BadgeCell
