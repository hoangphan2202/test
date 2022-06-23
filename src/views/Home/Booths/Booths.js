import React, { useState } from 'react'
import useI18n from '../../../hooks/use-i18n'
import { HOME_DESCRIPTION_TYPE, listBooths } from '../../../constants'
import Container from '../../../components/Container/Container'
import EmblaCarousel from '../../../components/EmblaCarousel/EmblaCarousel'
import useSWR from 'swr'
import { boothCoordinateUrlApi } from '../../../api/boothCoordinateApi'
import { fetcher } from '../../../api/axiosClient'
import BoothModal from './BoothModal'
import Image from 'next/image'

const defaultOpenDetail = {
  open: false,
  booth: undefined,
}

const Booths = ({ data }) => {
  const i18n = useI18n()
  const { data: dataCoordinate } = useSWR(boothCoordinateUrlApi.getAll, fetcher)
  const [openDetailModal, setOpenDetailModal] = useState(defaultOpenDetail)

  const handleCloseDetailModal = () => setOpenDetailModal(defaultOpenDetail)

  const handleOpenDetailModal = (booth) =>
    setOpenDetailModal({
      open: true,
      booth,
    })

  if (!data) return <div />

  const dataBoothContent = data.find((block) => block.type === HOME_DESCRIPTION_TYPE.BLOCK3)
  const contentLanguageActive = dataBoothContent?.content?.find((item) => i18n.activeLocale === item.language)

  return (
    <Container className="mt-16 ">
      {openDetailModal.open && (
        <BoothModal
          openModal={openDetailModal.open}
          booth={openDetailModal.booth}
          dataCoordinate={dataCoordinate}
          onClose={handleCloseDetailModal}
        />
      )}
      <div className="relative ml-[4%]">
        <img alt="bg-title" src="/images/layout/bg-title.png" className="h-full w-full max-w-[80%] object-contain" />
        <h2 className="absolute top-[20%] ml-[5%] w-full transform text-center text-xl font-bold uppercase  text-primaryYellow  sm:top-[25%] lg:text-4xl">
          {i18n.t('booths')}
        </h2>
      </div>
      <div className="relative">
        <img alt="bg-content" src="/images/layout/bg-content.png" className="h-[106px] w-full object-fill" />
        <span className="absolute top-1/2 left-1/2 w-full max-w-prose max-w-[975px] -translate-x-1/2 -translate-y-1/2 transform px-5 text-center text-xs font-bold uppercase sm:mx-auto sm:text-md lg:max-w-full lg:text-xl">
          {contentLanguageActive?.description}
        </span>
      </div>
      <div className="booths mt-10">
        <EmblaCarousel
          showDots={false}
          slides={listBooths(i18n).map((booth, i) => (
            <div className="embla__slide" key={i}>
              <div
                className="relative mx-10 h-full cursor-pointer lg:mx-0"
                key={i}
                onClick={() => handleOpenDetailModal(booth)}
              >
                <div className="relative mx-auto max-h-[688px] w-full max-w-[290px] sm:max-w-[1036px] ">
                  <div className="border-booth" />
                  <Image
                    className="-z-1"
                    src={`/images/booth/${booth.img}`}
                    alt="banner"
                    width={1036}
                    height={688}
                    objectFit="fill"
                  />
                  {/*<img*/}
                  {/*  alt={booth.title}*/}
                  {/*  className="h-full max-h-[149px] min-h-[149px] w-full object-fill sm:max-h-[400px] sm:max-h-[688px] sm:min-h-[400px] sm:min-h-[688px] "*/}
                  {/*  src={`/images/booth/${booth.img}`}*/}
                  {/*/>*/}
                </div>
                <div className="relative w-full">
                  <div className="relative mt-5">
                    <img alt="title" src="/images/home/bg-title-booth.png" className="mx-auto w-full max-w-[359px]" />
                    <h4 className="absolute top-[1%] left-[2%] flex h-full w-full items-center justify-center whitespace-nowrap text-center font-bold">
                      {booth.title}
                      {booth.name && (
                        <>
                          : <span className="ml-1">{booth.name}</span>
                        </>
                      )}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          ))}
        />
      </div>
    </Container>
  )
}

export default Booths
