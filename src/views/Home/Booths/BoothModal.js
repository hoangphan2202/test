import React, { Fragment, useState } from 'react'
import useI18n from '../../../hooks/use-i18n'
import ModalTitleLayout from '../../../components/Modal/ModalTitleLayout'
import { mapList, STT_COR } from '../../../constants'
import Container from '../../../components/Container/Container'
import EmblaCarousel from '../../../components/EmblaCarousel/EmblaCarousel'
import ModalMap from '../../../components/Modal/ModalMap'
import Modal from '../../../components/Modal/Modal'
import ModalClose from '../../../components/Modal/ModalClose'
import Image from 'next/image'

const BoothModal = ({ openModal, booth, dataCoordinate, onClose }) => {
  const [showMap, setShowMap] = useState(false)
  const i18n = useI18n()

  const toggleShowMap = () => setShowMap(!showMap)

  return (
    <Modal open={openModal} size="md" onClose={onClose} classNameContainer="bg-booth">
      <ModalClose onClose={onClose} />
      <Container className="mt-10 mb-2 sm:my-2">
        {showMap && (
          <ModalMap open={showMap} onClose={toggleShowMap} size="lg">
            <ModalTitleLayout
              className="absolute !top-4 !right-4 z-20 rounded-full bg-white opacity-50 sm:top-1 sm:right-0 sm:opacity-100"
              onClose={toggleShowMap}
            />
            <div className="relative overflow-auto">
              <svg width="1240" height="903">
                <image href="/images/layout/layout.jpg" x="0" y="0" className="w-full" width="1240" />
                <filter x="0" y="0" width="1" height="1" id="solid">
                  <feFlood floodColor="black" result="bg" />
                  <feMerge>
                    <feMergeNode in="bg" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                {mapList(i18n).map((map, i) => {
                  return (
                    <Fragment key={i}>
                      <g>
                        <circle className="z-10" cx={map.x} cy={map.y} r="25" opacity="0.6" fill="black" />
                        <text
                          fill="white"
                          filter="url(#solid)"
                          x={map.content.x}
                          y={map.content.y}
                          className="z-20 font-bold"
                        >
                          {map.content.text}
                        </text>
                      </g>
                      <text fill="white" x={map.x - STT_COR[`${map.stt}`.length]} y={map.y + 5} className="font-bold ">
                        {map.stt}
                      </text>
                    </Fragment>
                  )
                })}

                {dataCoordinate.map((coords, i) => {
                  if (!coords.available) {
                    return (
                      <g key={i}>
                        <rect
                          x={coords.x}
                          y={coords.y}
                          width={coords.width}
                          height={coords.height}
                          opacity="0.6"
                          fill="red"
                        />

                        <text fill="white" filter="url(#solid)" x={coords.x + 50} y={coords.y} className="font-bold">
                          {i18n.t('map.outOfStock')}
                        </text>
                      </g>
                    )
                  }

                  return (
                    <g key={i}>
                      <rect
                        className="cursor-pointer"
                        x={coords.x}
                        y={coords.y}
                        width={coords.width}
                        height={coords.height}
                        fill="transparent"
                        onClick={() =>
                          window.open(
                            'https://docs.google.com/forms/d/e/1FAIpQLSc5WpFgAT0KnSGf_LnuslCxKvdPVnFaSq_TlgM2IhQRvOkcqg/viewform',
                            '_blank',
                          )
                        }
                      />
                      <text
                        fill="white"
                        filter="url(#solid)"
                        x={coords.x + 50}
                        y={coords.y}
                        className="bg-black1 font-bold"
                      >
                        {i18n.t('map.available')}
                      </text>
                    </g>
                  )
                })}
              </svg>
            </div>
          </ModalMap>
        )}
        <div className="grid grid-cols-1 gap-8 text-white sm:grid-cols-2">
          <div className="flex items-center">
            <div className="w-full">
              {booth.listImgSlide.length > 1 ? (
                <EmblaCarousel
                  showDots={false}
                  slides={booth.listImgSlide.map((img, i) => {
                    return (
                      <div className="embla__slide" key={i}>
                        <div className="relative mx-auto h-full  w-full max-w-[380px] ">
                          <div className="border-frame max-h-[300px] max-w-[380px]" />
                          <Image
                            className="-z-1"
                            objectFit="cover"
                            width={380}
                            height={300}
                            // className="mx-auto h-full max-h-[300px] w-full max-w-[380px] rounded-lg object-cover shadow-xl "
                            alt="booth"
                            src={`/images/booth/${img}`}
                          />
                        </div>
                      </div>
                    )
                  })}
                />
              ) : (
                <div className="flex w-full justify-center">
                  <div className="relative mx-auto h-full min-h-[300px] w-full max-w-[380px]  ">
                    <div className="border-frame max-h-[300px] max-w-[380px]" />
                    <Image
                      className="-z-1"
                      objectFit="cover"
                      width={380}
                      height={300}
                      // className="mx-auto h-full max-h-[300px] w-full max-w-[380px] rounded-lg object-cover shadow-xl "
                      alt="booth"
                      src={`/images/booth/${booth.listImgSlide[0]}`}
                    />
                    {/*<img*/}
                    {/*  className="mx-auto  h-full max-h-[300px] min-h-[300px] w-full max-w-[380px] rounded-lg object-cover shadow-xl "*/}
                    {/*  alt="booth"*/}
                    {/*  src={`/images/booth/${booth.listImgSlide[0]}`}*/}
                    {/*/>*/}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="mt-5 sm:mt-0">
            <h1 className="text-4xl font-bold text-white">
              {booth.title}
              {booth.name && ':'}
            </h1>
            <p className="mb-8 text-4xl font-bold text-white">{booth.name}</p>
            <div>
              {booth &&
                booth.info.map((item, i) => {
                  if (item.style) {
                    return (
                      <div className="mb-1 text-white" key={i}>
                        <p>
                          <strong>{item.name}:</strong>
                        </p>
                        <p className="break-before-all whitespace-pre text-gray-300">{item.value}</p>
                      </div>
                    )
                  }

                  return (
                    <p className="mb-1 text-white" key={i}>
                      <strong>{item.name}:</strong>
                      <span className="ml-1 text-gray-300">{item.value}</span>
                    </p>
                  )
                })}
            </div>
            <button onClick={toggleShowMap} className="mt-8 rounded-full bg-white py-3 px-6 text-primaryViolet">
              {i18n.t('checkAvailable')}
            </button>
          </div>
        </div>
      </Container>
    </Modal>
  )
}

export default BoothModal
