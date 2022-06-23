import React from 'react'
import { FiChevronRight } from 'react-icons/fi'
import classnames from 'classnames'
import Link from 'next/link'

export default function Breadcrum({ data }) {
  return (
    <div className="flex items-center">
      {data.map((item, index) => {
        return (
          <div className="mr-2 flex items-center" key={index}>
            <Link
              href={{
                pathname: item.link,
              }}
            >
              <a className={classnames('mr-2 sm:text-2xl', { 'font-bold text-primaryYellow': item.active })}>
                {item.text}
              </a>
            </Link>
            {!item.active && <FiChevronRight className="sm:text-lg" />}
          </div>
        )
      })}
    </div>
  )
}
