import PropTypes from 'prop-types'
import classNames from 'classnames'
import Loader from 'components/Loader/Loader'

const Button = ({
  children,
  onClick,
  color = 'primary',
  outline = false,
  className,
  disabled,
  isLoading,
  size = 'md',
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={disabled}
      className={classNames(
        'flex items-center justify-center whitespace-nowrap rounded-3xl',
        size === 'md' && 'py-2 px-5',
        size === 'sm' && 'h-10 p-2',
        size === 'lg' && 'p-3',
        color === 'primary' && 'hover:bg-hoverPrimary bg-primaryBLue',
        color === 'secondary' && 'hover:bg-hoverSecondary bg-secondary text-white',
        color === 'danger' && 'hover:bg-hoverDanger bg-red-600 text-white',
        color === 'white' && 'bg-white text-white hover:bg-gray-400',
        disabled && 'cursor-default !bg-disabled text-black hover:opacity-100',
        outline && 'text-primary border-primary border-2 bg-transparent',
        outline && color === 'white' && 'border-2 border-white !bg-transparent !text-white',
        className,
      )}
      onClick={onClick}
    >
      {children} {isLoading && <Loader className="ml-2" size="sm" color="white" />}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  color: PropTypes.string,
  outline: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
}

export default Button
