import React from 'react'
import classnames from 'classnames'
import PropsTypes from 'prop-types'

export default function TextareaCustom({ containerClassName, textareaClassName, id, label, ...rest }) {
  return (
    <div className={classnames('flex w-full flex-col', containerClassName)}>
      <label className="mb-3 text-lg" htmlFor={id}>
        {label}
      </label>
      <textarea
        id={id}
        className={classnames('rounded-lg border border-white bg-transparent p-3 text-white', textareaClassName)}
        {...rest}
      />
    </div>
  )
}

TextareaCustom.propTypes = {
  containerClassName: PropsTypes.string,
  textareaClassName: PropsTypes.string,
  id: PropsTypes.string,
  label: PropsTypes.string,
}
