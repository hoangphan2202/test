import Providers from '../Providers'
import Head from 'next/head'

import Layout from '../components/Layout/Layout'
import '../styles/globals.scss'
import '../styles/embla.scss'
import { useRouter } from 'next/router'
import LayoutAdmin from '../components/LayoutAdmin/LayoutAdmin'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { DOMAIN_URL } from '../config'

export const ROUTE_AUTH_ADMIN = [
  '/admin',
  '/admin/post',
  '/admin/banner',
  '/admin/banner/create',
  '/admin/images',
  '/admin/images/create',
  '/admin/partners',
  '/admin/partners/create',
  '/admin/video',
  '/admin/video/create',
  '/admin/map',
  '/admin/post',
  '/admin/post/create',
  '/admin/nha-tai-tro',
  '/admin/nha-tai-tro/create',
  '/admin/advisory',
  '/admin/advisory/create',
  '/admin/home-edit',
]

export const ROUTE_NO_LAYOUT = ['/admin/login']

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter()

  const handleLayout = () => {
    if (ROUTE_AUTH_ADMIN.indexOf(pathname) !== -1) {
      return (
        <LayoutAdmin>
          <Component {...pageProps} />
        </LayoutAdmin>
      )
    }

    if (ROUTE_NO_LAYOUT.indexOf(pathname) !== -1) {
      return <Component {...pageProps} />
    }

    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    )
  }

  return (
    <Providers {...pageProps}>
      <Head>
        <title>Blockchain Global Day</title>
        <meta
          name="keywords"
          content="blockchain, blockchainexpo, blockchainglobalday, blockchain expo, blockchain global day"
        />

        <meta charSet="utf-8" />
        <meta name="description" content="Blockchain Global Day: IMMERSE INTO THE INFINITE GAMETECH WORLD" />

        {/*<!-- Google / Search Engine Tags -->*/}
        <meta itemProp="name" content="Blockchain Global Day" />
        <meta itemProp="description" content="Blockchain Global Day: IMMERSE INTO THE INFINITE GAMETECH WORLD" />
        <meta itemProp="image" content={`${DOMAIN_URL}/images/logo-meta.png`} />

        <meta name="title" content="Blockchain Global Day" />
        <meta name="image" content={`${DOMAIN_URL}/images/logo-meta.png`} />
        <meta name="robots" content="index" />

        {/*<!-- Facebook Meta Tags -->*/}
        <meta property="og:title" content="Blockchain Global Day" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={DOMAIN_URL} />
        <meta property="og:site_name" content="Blockchain Global Day" />
        <meta property="og:description" content="Blockchain Global Day: IMMERSE INTO THE INFINITE GAMETECH WORLD" />
        <meta property="og:image" content={`${DOMAIN_URL}/logo-meta.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="628" />
        <meta property="og:image:alt" content="Blockchain Global Day" />
        <meta property="og:locale" content="en_US" />

        {/*<!-- Twitter Meta Tags -->*/}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Blockchain Global Day" />
        <meta property="twitter:site" content="@BlockchainGlobalDay" />
        <meta property="twitter:app:url:ipad" content={DOMAIN_URL} />
        <meta
          property="twitter:description"
          content="Blockchain Global Day: IMMERSE INTO THE INFINITE GAMETECH WORLD"
        />
        <meta property="twitter:image" content={`${DOMAIN_URL}/images/logo-meta.png`} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      {handleLayout()}
      <ToastContainer newestOnTop />
    </Providers>
  )
}

export default MyApp
