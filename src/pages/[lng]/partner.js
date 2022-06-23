import React from 'react'
import Head from 'next/head'
import Projects from '../../views/Partner/Projects/Projects'
import { contentLanguageMap, languages } from '../../locales/i18n'
import useI18n from '../../hooks/use-i18n'
import Partners from '../../views/Home/Partners/Partners'
import Banner from '../../components/Banner/Banner'
import { fetcherSSR } from '../../api/axiosClient'
import { bannerUrlApi } from '../../api/bannerApi'
import { partnersUrlApi } from '../../api/partnersApi'
import { sponsorsUrlApi } from '../../api/sponsorsApi'

const Partner = ({ listBanner, listPartners, listSponsors }) => {
  const i18n = useI18n()

  return (
    <>
      <Head>
        <meta httpEquiv="content-language" content={contentLanguageMap[i18n.activeLocale]} />
      </Head>
      <Banner data={listBanner} />
      <Projects data={listSponsors} />
      <Partners data={listPartners} />
    </>
  )
}

export async function getStaticProps({ params }) {
  let listBanner = []
  try {
    listBanner = await fetcherSSR(bannerUrlApi.getAll)
  } catch (e) {
    console.log(e)
  }

  let listPartners = []
  try {
    listPartners = await fetcherSSR(partnersUrlApi.getAll)
  } catch (e) {
    console.log(e)
  }

  let listSponsors = []
  try {
    listSponsors = await fetcherSSR(sponsorsUrlApi.getAll)
  } catch (e) {
    console.log(e)
  }

  const { default: lngDict = {} } = await import(`../../locales/${params.lng}.json`)

  return {
    props: { lng: params.lng, lngDict, listBanner, listPartners, listSponsors },
    revalidate: 60, // 10 seconds
  }
}

export async function getStaticPaths() {
  return {
    paths: languages.map((l) => ({ params: { lng: l } })),
    fallback: false,
  }
}

export default Partner
