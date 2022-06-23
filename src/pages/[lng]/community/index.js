import React from 'react'
import Head from 'next/head'
import Container from '../../../components/Container/Container'
import News from '../../../views/Community/News'
import Videos from '../../../views/Community/Videos'
import { contentLanguageMap, languages } from '../../../locales/i18n'
import useI18n from '../../../hooks/use-i18n'
import { fetcherSSR } from '../../../api/axiosClient'
import { postUrlApi } from '../../../api/postApi'
import { videoUrlApi } from '../../../api/videoApi'

const Community = ({ listVideo, listNews }) => {
  const i18n = useI18n()

  return (
    <Container className="px-3">
      <Head>
        <meta httpEquiv="content-language" content={contentLanguageMap[i18n.activeLocale]} />
      </Head>
      {/* <p className="text-center text-4xl font-bold text-primaryYellow">{i18n.t('comingSoon')}</p> */}
      <News data={listNews} />
      <Videos data={listVideo} />
    </Container>
  )
}

export async function getStaticProps({ params }) {
  let listNews = []
  try {
    listNews = await fetcherSSR(postUrlApi.getAllPost)
  } catch (e) {
    console.log(e)
  }

  let listVideo = []
  try {
    listVideo = await fetcherSSR(videoUrlApi.getAll)
  } catch (e) {
    console.log(e)
  }
  const { default: lngDict = {} } = await import(`../../../locales/${params.lng}.json`)

  return {
    props: { lng: params.lng, lngDict, listNews, listVideo },
    revalidate: 60, // 10 seconds
  }
}

export async function getStaticPaths() {
  return {
    paths: languages.map((l) => ({ params: { lng: l } })),
    fallback: false,
  }
}

export default Community
