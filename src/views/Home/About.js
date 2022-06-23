import React from 'react'
import useI18n from '../../hooks/use-i18n'
import EmblaCarousel from '../../components/EmblaCarousel/EmblaCarousel'
import Container from '../../components/Container/Container'
import Image from 'next/image'
import classNames from 'classnames'

const About = ({ data }) => {
  const i18n = useI18n()

  return (
    <Container className="mt-16 text-center">
      <div className="relative ml-[4%]">
        <img
          alt="bg-title"
          src="/images/layout/bg-only-title.png"
          className="mx-auto h-full w-full max-w-[100%] object-contain sm:max-w-[60%]"
        />
        <h2 className="absolute top-[30%] ml-[3%] w-full transform text-center text-xl font-bold uppercase text-primaryYellow  lg:text-4xl">
          {i18n.t('home.aboutTitle')}
        </h2>
      </div>
      <div className="mt-10">
        {data ? (
          <EmblaCarousel
            showDots={false}
            slides={data.map((banner) => (
              <div className="embla__slide" key={banner._id}>
                <div
                  className={classNames(
                    'mx-auto w-full max-w-[400px] animate-fade-in object-cover px-10 sm:h-[535px] sm:h-full sm:max-w-[1050px] sm:max-w-screen-lg',
                    banner.link && 'cursor-pointer',
                  )}
                  onClick={() => {
                    if (banner.link) {
                      window.open(banner.link, banner.openInNewTab ? '_blank' : '_self')
                    }
                  }}
                >
                  <Image
                    priority
                    className="-z-1"
                    src={banner.thumbnail.url}
                    alt="banner"
                    width={1024}
                    height={521}
                    objectFit="cover"
                  />
                  {/*<img*/}
                  {/*  src={banner?.thumbnail?.url}*/}
                  {/*  alt="banner"*/}
                  {/*  className="mx-auto w-full max-w-[400px] animate-fade-in object-cover sm:h-[535px] sm:h-full sm:max-w-[1050px] sm:max-w-screen-lg"*/}
                  {/*/>*/}
                </div>
              </div>
            ))}
          />
        ) : (
          <div className="embla__slide">
            <div className="px-10">
              <div className="relative mx-auto h-full max-h-[369px] w-full max-w-[251px] bg-transparent sm:max-w-screen-lg ">
                <div className="border-frame-banner mx-auto " />
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}

export default About
