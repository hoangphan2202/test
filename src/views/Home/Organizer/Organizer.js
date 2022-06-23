import React from 'react'
import useI18n from '../../../hooks/use-i18n'
import Container from '../../../components/Container/Container'
import OrganizerCard from './OrganizerCard'

const Organizer = () => {
  const i18n = useI18n()

  return (
    <Container className="mt-16 text-center">
      <div className="relative ml-[4%]">
        <img
          alt="bg-title"
          src="/images/layout/bg-only-title.png"
          className="mx-auto h-full w-full max-w-[100%] object-contain sm:max-w-[60%]"
        />
        <h2 className="absolute top-[30%] ml-[3%] w-full transform text-center text-xl font-bold uppercase text-primaryYellow lg:text-4xl">
          {i18n.t('home.organizerTitle')}
        </h2>
      </div>
      <div className="mt-10">
        <div className="flex flex-wrap items-center justify-center">
          {['/images/layout/s3s.png', '/images/layout/ygg.png', '/images/layout/saigon-innovation-hub.png'].map(
            (img, i) => (
              <OrganizerCard key={i} src={img} id={i} />
            ),
          )}
        </div>

        {/*{data ? (*/}
        {/*  <div className="flex flex-wrap items-center justify-center">*/}
        {/*    {data.map((partner) => (*/}
        {/*      <PartnerCard partner={partner} key={partner._id} />*/}
        {/*    ))}*/}
        {/*  </div>*/}
        {/*) : (*/}
        {/*  <div className="sm: grid grid-cols-1 grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">*/}
        {/*    {listSponsor.map((item, i) => (*/}
        {/*      <div*/}
        {/*        key={i}*/}
        {/*        alt={item}*/}
        {/*        className="h-[100px] h-full w-full max-w-[200px] max-w-full animate-pulse rounded-3xl bg-gray-700"*/}
        {/*      />*/}
        {/*    ))}*/}
        {/*  </div>*/}
        {/*)}*/}
      </div>
    </Container>
  )
}

export default Organizer
