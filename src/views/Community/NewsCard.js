import React from 'react'
import useI18n from '../../hooks/use-i18n'
import classNames from 'classnames'
import { useRouter } from 'next/router'

const NewsCard = ({ post, size = 'sm' }) => {
  const i18n = useI18n()
  const router = useRouter()

  const contentLanguageActive = post?.content?.find((item) => i18n.activeLocale === item.language)

  if (!post) {
    return (
      <div className="cursor-pointer">
        <div
          className={classNames(
            'h-full w-full animate-pulse rounded-full rounded-md bg-gray-700 object-cover',
            size === 'lg' && 'h-[300px] max-w-[600px]',
            size === 'sm' && 'h-[300px] sm:h-[201px] sm:max-w-[301px]',
          )}
        />
        {size === 'lg' ? (
          <div className="mt-3 px-3 ">
            <div className="h-4 animate-pulse rounded bg-gray-700 text-3xl font-bold "></div>
            <div className="mt-2 mb-4 h-4 animate-pulse rounded bg-gray-700 text-gray-500 "></div>
          </div>
        ) : (
          <div className="mt-3 px-1 lg:px-3 ">
            <div className="h-3 animate-pulse truncate rounded bg-gray-700 font-bold lg:text-xl"></div>
            <div className="mt-2 h-3 animate-pulse truncate rounded bg-gray-700 text-sm text-gray-500"></div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className="animate-fade-in cursor-pointer"
      onClick={() => router.push(`/${i18n.activeLocale}/community/${post.slug}`)}
    >
      <div className="relative">
        <div
          className={classNames(
            'border-frame',
            size === 'lg' && 'max-h-[400px] max-w-[600px]',
            size === 'sm' && 'min-h-[300px] sm:min-h-[201px] sm:max-w-[301px]',
          )}
        />
        <img
          src={post.thumbnail.url}
          alt="news"
          className={classNames(
            'h-full  w-full  rounded-md object-cover',
            size === 'lg' && 'max-h-[400px] max-w-[600px]',
            size === 'sm' && 'min-h-[300px] sm:min-h-[201px] sm:max-w-[301px]',
          )}
        />
      </div>
      {size === 'lg' ? (
        <div className="mt-3 px-3">
          <h2 className="truncate-text text-3xl font-bold ">{contentLanguageActive.title}</h2>
          <p className="truncate-text mt-2 mb-4 text-gray-500">{contentLanguageActive.description}</p>
        </div>
      ) : (
        <div className="mt-3 px-1 lg:px-3">
          <h3 className="truncate-text truncate font-bold lg:text-xl">{contentLanguageActive.title}</h3>
          <p className="truncate-text mt-2 truncate text-sm text-gray-500">{contentLanguageActive.description}</p>
        </div>
      )}
    </div>
  )
}

export default NewsCard
