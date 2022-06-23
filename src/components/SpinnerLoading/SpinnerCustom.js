import classNames from 'classnames'
import { ImSpinner2 } from 'react-icons/im'
import PropTypes from 'prop-types'

const SpinnerCustom = ({ color, size }) => {
  const type = {
    primary: 'text-primary',
    secondary: 'text-gray-1',
    white: 'text-white',
  }

  return <ImSpinner2 size={size} className={classNames('mx-auto animate-spin', type[color])} />
}

SpinnerCustom.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default SpinnerCustom
