import React, { useState } from 'react'
import classnames from 'classnames'
import { FiChevronRight } from 'react-icons/fi'

const Collapse = ({ prefix, append, title, children, headerClassName, className, defaultExtend }) => {
  const [toggle, setToggle] = useState(!!defaultExtend)
  const onToggle = () => setToggle(!toggle)
  return (
    <div className={className}>
      <div
        className={classnames('mb-3 flex cursor-pointer flex-row justify-between', headerClassName)}
        onClick={onToggle}
      >
        <div className={classnames('flex flex-row text-white')}>
          {prefix}
          <span>{title}</span>
          {append}
        </div>
        <div>
          <FiChevronRight
            color="white"
            className={classnames('rotate-0 transform transition duration-100', {
              'rotate-90 transform transition duration-100': toggle,
            })}
          />
        </div>
      </div>
      <div
        className={classnames('h-0 overflow-y-hidden transition duration-700', {
          'h-auto transition duration-700': toggle,
        })}
      >
        {children}
      </div>
    </div>
  )
}

export default Collapse
