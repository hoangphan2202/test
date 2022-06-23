import PropTypes from 'prop-types'

const TruncateCell = ({ className, data, image, ...props }) => {
  return (
    <div className={className} {...props}>
      <img src={image} alt={image} className="mr-2 h-12 w-20 object-cover" />
      <p className="truncate">{data}</p>
    </div>
  )
}

TruncateCell.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string,
  data: PropTypes.any,
}

export default TruncateCell
