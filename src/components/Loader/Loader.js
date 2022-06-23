import PropTypes from 'prop-types'
import classnames from 'classnames'

const Loader = ({ className, color = 'primaryYellow', width, height }) => {
  return (
    <svg
      className={classnames(
        'h-4 w-4 animate-spin rounded-full border-t-2',
        color && `border-${color}`,
        width && `w-${width}`,
        height && `w-${height}`,
        className,
      )}
      viewBox="0 0 24 24"
    />
  )
}

Loader.propTypes = {
  className: PropTypes.any,
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
}

export default Loader
