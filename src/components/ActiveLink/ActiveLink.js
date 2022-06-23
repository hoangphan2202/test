import React from 'react'
import { useRouter } from 'next/router'
import classNames from 'classnames'

function ActiveLink({ children, href, className }) {
  const router = useRouter()

  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a
      className={classNames(className, router.asPath === href ? 'text-primaryYellow' : 'text-current')}
      href={href}
      onClick={handleClick}
    >
      {children}
    </a>
  )
}

export default ActiveLink
