import React, { useState } from 'react'
import { fetcher } from '../../api/axiosClient'
import { postUrlApi } from '../../api/postApi'
import NewsCard from './NewsCard'
import useSWRInfinite from 'swr/infinite'
import useI18n from '../../hooks/use-i18n'

const News = ({ data: payload }) => {
  const i18n = useI18n()
  const [viewMore, setViewMore] = useState(false)
  const {
    data: listPostViewMore,
    size,
    setSize,
  } = useSWRInfinite((index) => `${postUrlApi.getAllPost}?page=${index + 2}&rowPerPage=${5}`, fetcher)
  const data = payload?.data

  const postMain = data?.[0]
  const listPostSub = data?.slice(1, 5)

  if (!postMain) return <div className="text-center">{i18n.t('noDataPost')}</div>

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <NewsCard post={postMain} size="lg" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-6">
          {listPostSub
            ? listPostSub.map((news) => <NewsCard key={news._id} post={news} />)
            : [1, 2, 3, 4].map((news, i) => <NewsCard key={i} />)}
        </div>
      </div>
      {viewMore && (
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {listPostViewMore?.map((item) => {
            return item.data.map((news) => <NewsCard key={news._id} post={news} />)
          })}
        </div>
      )}
      {listPostViewMore?.[0].data.length > 0 && (
        <a
          onClick={() => {
            if (size === 1) {
              setViewMore(!viewMore)
              setSize(size + 1)
            }
            setSize(size + 1)
          }}
          className="mt-5 mb-5 block cursor-pointer text-center text-primaryYellow hover:underline sm:text-xl"
        >
          View More &gt;&gt;
        </a>
      )}
    </>
  )
}

export default News
