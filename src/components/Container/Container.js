import React from 'react'
import classNames from 'classnames'

const Container = ({ children, className }) => {
  return <div className={classNames('mx-auto w-full max-w-screen-xl', className)}>{children}</div>
}

export default Container
