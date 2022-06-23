import React, { forwardRef } from 'react'
import classnames from 'classnames'
import PropsTypes from 'prop-types'

// eslint-disable-next-line react/display-name
const Input = forwardRef(({ containerClassName, inputClassName, id, label, ...rest }, ref) => {
  return (
    <div className={classnames('flex w-full flex-col', containerClassName)}>
      <label className="mb-3 text-lg" htmlFor={id}>
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        className={classnames('rounded-lg border border-white bg-transparent p-3 text-white', inputClassName)}
        {...rest}
      />
    </div>
  )
})

export default Input

Input.propTypes = {
  containerClassName: PropsTypes.string,
  inputClassName: PropsTypes.string,
  id: PropsTypes.string,
  label: PropsTypes.string,
}
