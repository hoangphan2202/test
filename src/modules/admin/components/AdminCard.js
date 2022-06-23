import React from 'react'
import Link from 'next/link'

export default function AdminCard({ title, hrefTitle, subTitle, hrefSubTitle }) {
  return (
    <div className="rounded-lg bg-black-2 p-4">
      <div className="mb-2">
        {hrefTitle ? (
          <Link href={hrefTitle}>
            <a className="text-2xl font-bold text-white hover:text-primaryYellow">{title}</a>
          </Link>
        ) : (
          <a className="text-2xl font-bold text-white hover:text-primaryYellow">{title}</a>
        )}
      </div>

      <div>
        {hrefSubTitle ? (
          <Link href={hrefSubTitle}>
            <a className="text-lg text-white hover:text-primaryYellow hover:underline hover:underline-offset-2">
              {subTitle}
            </a>
          </Link>
        ) : (
          <a className="text-lg text-white hover:text-primaryYellow hover:underline hover:underline-offset-2">
            {subTitle}
          </a>
        )}
      </div>
    </div>
  )
}
