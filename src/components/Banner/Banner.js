import EmblaCarousel from '../../components/EmblaCarousel/EmblaCarousel'
import Container from '../../components/Container/Container'
import classNames from 'classnames'
import Image from 'next/image'

const Banner = ({ data }) => {
  return (
    <Container>
      {data ? (
        <EmblaCarousel
          showDots={false}
          slides={data.map((banner) => (
            <div className="embla__slide" key={banner._id}>
              <div
                className={classNames('h-full px-10', banner?.link && 'cursor-pointer')}
                onClick={() => {
                  if (banner?.link) {
                    window.open(banner.link, banner.openInNewTab ? '_blank' : '_self')
                  }
                }}
              >
                <div className="relative mx-auto block h-full max-h-[536px] min-h-full w-full max-w-[1440px] animate-fade-in">
                  <div className="border-frame-banner mx-auto " />
                  <Image
                    priority
                    className="-z-1"
                    src={banner.thumbnail.url}
                    alt="banner"
                    width={1238}
                    height={536}
                    objectFit="cover"
                  />
                  {/*<img*/}
                  {/*  src={banner.thumbnail.url}*/}
                  {/*  alt="banner"*/}
                  {/*  className="mx-auto h-full max-h-[536px] w-full object-cover sm:min-h-[536px] sm:p-4 "*/}
                  {/*/>*/}
                </div>
              </div>
            </div>
          ))}
        />
      ) : (
        <div className="embla__slide">
          <div className="px-10">
            <div className="relative mx-auto h-full max-h-[536px] w-full max-w-[1440px] bg-transparent sm:min-h-[536px]">
              <div className="border-frame-banner mx-auto " />
            </div>
          </div>
        </div>
      )}
    </Container>
  )
}

export default Banner
