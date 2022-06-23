import PropTypes from 'prop-types'

const NumberCell = ({ className, data, currency }) => {
  return (
    <div className={className}>
      {data?.toLocaleString('vi')} {currency}
    </div>
  )
}

NumberCell.propTypes = {
  className: PropTypes.string,
  currency: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

NumberCell.defaultProps = {
  className: 'text-right',
  currency: 'VND',
  data: 0,
}

export default NumberCell
