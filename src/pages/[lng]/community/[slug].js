import React, { useEffect } from 'react'
import EN from '../../../locales/en.json'
import VI from '../../../locales/vi.json'
import { useRouter } from 'next/router'
import useI18n from '../../../hooks/use-i18n'
import useSWR from 'swr'
import { postUrlApi } from '../../../api/postApi'
import { fetcher } from '../../../api/axiosClient'
import { RawHTML } from '../../../components/RawHTML/RawHTML'
import Loader from '../../../components/Loader/Loader'
import Container from '../../../components/Container/Container'

const PostDetail = () => {
  const router = useRouter()
  const { query } = router
  const i18n = useI18n()
  const { data: post } = useSWR(router.query.slug ? postUrlApi.getPostBySlug(router.query.slug) : null, fetcher)

  const contentLanguageActive = post?.content?.find((item) => i18n.activeLocale === item.language)

  useEffect(() => {
    if (query.lng === 'en') {
      i18n.locale(query.lng, EN)
    } else {
      i18n.locale(query.lng, VI)
    }
    // eslint-disable-next-line
  }, [query])

  if (!post) return <Loader className="mx-auto h-40 w-40" />

  return (
    <Container>
      <div className="mb-10">
        <h1 className="text-xl font-bold text-primaryYellow sm:text-2xl">{contentLanguageActive.title}</h1>
      </div>
      <RawHTML>{contentLanguageActive?.body}</RawHTML>
    </Container>
  )
}

export default PostDetail
