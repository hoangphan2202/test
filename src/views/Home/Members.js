import React from 'react'
import useI18n from '../../hooks/use-i18n'
import Container from '../../components/Container/Container'

const Members = ({ data }) => {
  const i18n = useI18n()

  return (
    <Container className="mt-16">
      <div className="relative ml-[4%]">
        <img
          alt="bg-title"
          src="/images/layout/bg-only-title.png"
          className="mx-auto h-full w-full max-w-[100%] object-contain sm:max-w-[60%]"
        />
        <h2 className="absolute top-[30%] ml-[3%] w-full transform text-center text-xl font-bold uppercase text-primaryYellow  lg:text-4xl">
          {i18n.t('list.advisoryBoard')}
        </h2>
      </div>
      <div className="mt-10 flex flex-wrap justify-center ">
        {data?.map((mem, i) => {
          const contentLanguageActive = mem?.content?.find((item) => i18n.activeLocale === item.language)
          return (
            <div key={i} className="m-3 h-full max-w-[160px] sm:m-5 sm:max-w-[280px]">
              <div className="flex flex-col">
                <div className="relative h-full w-full max-w-[160px] sm:max-w-[280px]">
                  <div className="border-frame-2 mx-auto" />
                  {/*<img*/}
                  {/*  className="-z-1"*/}
                  {/*  src={mem?.thumbnail?.url}*/}
                  {/*  alt={contentLanguageActive?.name}*/}
                  {/*  width={280}*/}
                  {/*  height={280}*/}
                  {/*  objectFit="cover"*/}
                  {/*/>*/}
                  <img
                    alt={contentLanguageActive?.name}
                    className="mx-auto h-full w-full rounded-xl object-cover"
                    src={mem?.thumbnail?.url}
                  />
                </div>
                <div className="mt-5 text-center">
                  <p className="md:text2xl text-sm font-bold text-primaryYellow sm:text-xl">
                    {contentLanguageActive?.name}
                  </p>
                  <p className="mt-2 whitespace-pre-line text-center text-xs md:text-sm-md lg:text-md">
                    {contentLanguageActive?.description}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Container>
  )
}

export default Members
