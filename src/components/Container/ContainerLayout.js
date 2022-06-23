import React from 'react'
import styles from 'styles/home.module.scss'
import classNames from 'classnames'

const ContainerLayout = ({ children }) => {
  return (
    <div className={classNames('relative overflow-hidden bg-layout text-white', styles.container)}>
      <div className="flex min-h-screen flex-col justify-between">{children}</div>
    </div>
  )
}

export default ContainerLayout
