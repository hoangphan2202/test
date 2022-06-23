import Intro from '../../views/Home/Intro'
import Booths from '../../views/Home/Booths/Booths'
import Agenda from '../../views/Home/Agenda'
import About from '../../views/Home/About'
import Partners from '../../views/Home/Partners/Partners'
import { contentLanguageMap, languages } from '../../locales/i18n'
import Head from 'next/head'
import useI18n from '../../hooks/use-i18n'
import Members from '../../views/Home/Members'
import Banner from '../../components/Banner/Banner'
import Projects from '../../views/Partner/Projects/Projects'
import { homeDescriptionUrlApi } from '../../api/homeDescriptionApi'
import { fetcherSSR } from '../../api/axiosClient'
import { bannerUrlApi } from '../../api/bannerApi'
import { imagesProjectUrlApi } from '../../api/imagesProjectApi'
import { partnersUrlApi } from '../../api/partnersApi'
import { sponsorsUrlApi } from '../../api/sponsorsApi'
import { advisoryUrlApi } from '../../api/advisoryApi'
import Organizer from '../../views/Home/Organizer/Organizer'
// import ReactFullpage from "@fullpage/react-fullpage";
// import "fullpage.js/vendors/scrolloverflow"; // Optional. When using scrollOverflow:true

export default function Home({ dataHome, listBanner, listPartners, listImagesProject, listSponsors, listAdvisories }) {
  const i18n = useI18n()

  return (
    // <ReactFullpage
    //   licenseKey={"YOUR_LICENSE_KEY"}
    //   // scrollOverflow={true}
    //   sectionsColor={["orange", "purple", "green"]}
    //   // onLeave={this.onLeave.bind(this)}
    //   // afterLoad={this.afterLoad.bind(this)}
    //   render={({ state, fullpageApi }) => {
    //     return (
    //       <div className="h-full">
    //         <div className="section section1">
    //           <h3>Section 1</h3>
    //         </div>
    //         <div className="section">
    //           <h3>Section 2</h3>
    //         </div>
    //         <div className="section">
    //           <h3>Section 3</h3>
    //           <button onClick={() => fullpageApi.moveTo(1, 0)}>
    //             Move top
    //           </button>
    //         </div>
    //       </div>
    //     );
    //   }}
    // />
    <div>
      <Head>
        <meta httpEquiv="content-language" content={contentLanguageMap[i18n.activeLocale]} />
      </Head>
      <Banner data={listBanner} />
      <Intro data={dataHome} />
      <Booths data={dataHome} />
      <Agenda data={dataHome} />
      <About data={listImagesProject} />
      <Organizer />
      <Members data={listAdvisories} />
      <Projects data={listSponsors} />
      <Partners data={listPartners} />
    </div>
  )
}

export async function getStaticProps({ params }) {
  let dataHome = null
  try {
    dataHome = await fetcherSSR(homeDescriptionUrlApi.getAll)
  } catch (e) {
    console.log(e)
  }

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

  let listImagesProject = []
  try {
    listImagesProject = await fetcherSSR(imagesProjectUrlApi.getAll)
  } catch (e) {
    console.log(e)
  }

  let listSponsors = []
  try {
    listSponsors = await fetcherSSR(sponsorsUrlApi.getAll)
  } catch (e) {
    console.log(e)
  }

  let listAdvisories = []
  try {
    listAdvisories = await fetcherSSR(advisoryUrlApi.getAllAdvisories)
  } catch (e) {
    console.log(e)
  }

  const { default: lngDict = {} } = await import(`../../locales/${params.lng}.json`)

  return {
    props: {
      lng: params.lng,
      lngDict,
      dataHome,
      listBanner,
      listPartners,
      listImagesProject,
      listSponsors,
      listAdvisories: listAdvisories?.data,
    },
    revalidate: 60, // 10 seconds
  }
}

export async function getStaticPaths() {
  return {
    paths: languages.map((l) => ({ params: { lng: l } })),
    fallback: false,
  }
}
