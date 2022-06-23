import React from 'react'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { TiArrowSortedDown } from 'react-icons/ti'
import useI18n from '../../hooks/use-i18n'
import Link from 'next/link'

const Menu = ({ className, listMenu }) => {
  const router = useRouter()
  const i18n = useI18n()

  return (
    <div className={className}>
      {listMenu.map((item, i) => (
        <Link key={i} href={item.path}>
          <a
            key={i}
            className={classNames(
              'relative mx-5 cursor-pointer text-xl font-bold capitalize hover:text-primaryYellow lg:mx-10',
              router.pathname.replace('[lng]', i18n.activeLocale) === item.path && 'text-primaryYellow',
            )}
          >
            {router.pathname.replace('[lng]', i18n.activeLocale) === item.path && (
              <TiArrowSortedDown className="absolute left-0 -top-5 h-full w-full" />
            )}
            {item.name}
          </a>
        </Link>
      ))}
    </div>
  )
}

export default Menu
