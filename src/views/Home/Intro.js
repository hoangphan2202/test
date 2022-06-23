import React from 'react'
import useI18n from '../../hooks/use-i18n'
import Container from '../../components/Container/Container'
import { HOME_DESCRIPTION_TYPE } from '../../constants'
import Image from 'next/image'

const Intro = ({ data }) => {
  const i18n = useI18n()

  if (!data) return <div />

  const dataSection1 = data.find((block) => block.type === HOME_DESCRIPTION_TYPE.BLOCK1)
  const dataSection2 = data.find((block) => block.type === HOME_DESCRIPTION_TYPE.BLOCK2)

  const contentLanguageActive1 = dataSection1?.content?.find((item) => i18n.activeLocale === item.language)
  const contentLanguageActive2 = dataSection2?.content?.find((item) => i18n.activeLocale === item.language)

  return (
    <Container className="mt-16 animate-fade-in">
      <ul className="flex flex-col md:flex-row">
        <li className="relative grow">
          <img
            alt="bg-intro-1"
            src="/images/home/bg-intro1.png"
            className="mx-auto max-h-[535px] w-full max-w-[679px] object-fill align-bottom sm:max-w-[500px] lg:max-w-[679px]"
          />
          <div className="absolute top-0 left-0 ml-[10%] mt-[10%] w-full sm:ml-[20%] sm:mt-[8%]">
            <p className="max-w-xs text-3xl font-bold text-primaryYellow sm:max-w-full lg:text-4xl">
              {contentLanguageActive1?.title}
            </p>
            <p className="mt-5 mb-3 max-w-[280px] text-sm font-medium uppercase sm:mt-10 sm:mb-5 sm:max-w-xs sm:text-md md:mt-5 lg:mt-10 lg:mb-5 lg:max-w-sm lg:text-xl">
              {contentLanguageActive1?.description}
            </p>
          </div>
        </li>
        <li className="mx-auto max-w-[340px] grow-0 md:max-w-[350px] xl:max-w-[472px]">
          <Image alt="intro" src={dataSection1?.thumbnail?.url} width={472} height={477} objectFit="cover" />
          {/*<img*/}
          {/*  alt="intro"*/}
          {/*  src={dataSection1?.thumbnail?.url}*/}
          {/*  className="mx-auto max-w-[340px] object-cover align-bottom md:max-w-[350px] xl:max-w-[472px]"*/}
          {/*/>*/}
        </li>
      </ul>
      <div className="relative hidden sm:block">
        <img
          alt="intro2"
          className="relative hidden object-cover sm:z-20 lg:block xl:max-w-[595px]"
          src={dataSection2?.thumbnail?.url}
        />
        <div className="top-0 right-0 z-30 h-full w-full max-w-[787px] lg:absolute xl:z-10">
          <img alt="bg-intro-2" src="/images/home/bg-intro2.png" className="object-fill " />
          <div className="absolute left-32 top-10 max-w-prose ">
            <p className="ml-10 whitespace-nowrap text-3xl font-bold text-primaryYellow lg:text-4xl">
              {contentLanguageActive2?.title}
            </p>
            <p className="mt-10 max-w-md text-sm font-medium sm:text-md lg:text-xl xl:max-w-prose">
              {contentLanguageActive2?.description}
            </p>
          </div>
        </div>
      </div>
      <div className="relative block sm:hidden">
        <img alt="bg-intro-2" src="/images/home/bg-intro2-mobile.png" className="min-h-[445px] w-full object-cover" />
        <div className="absolute left-[20%] top-0 top-10 max-w-prose">
          <p className="max-w-[200px] text-3xl font-bold text-primaryYellow">{contentLanguageActive2?.title}</p>
          <p className="mt-3 max-w-[200px] text-sm font-medium uppercase sm:text-md">
            {contentLanguageActive2?.description}
          </p>
        </div>
        <div className="absolute -bottom-16 right-0 z-20 max-w-[178px]">
          <div className="relative">
            <Image alt="intro2" src={dataSection2?.thumbnail?.url} width={472} height={477} objectFit="cover" />
          </div>
        </div>
        {/*<img*/}
        {/*  alt="intro2"*/}
        {/*  className="absolute -bottom-16 right-0 z-20 max-w-[178px] object-cover"*/}
        {/*  src={dataSection2?.thumbnail?.url}*/}
        {/*/>*/}
        <div className="absolute -bottom-20 left-0 max-w-[100px] origin-top-right translate-x-[25px] rotate-45 transform object-cover">
          <div className="relative">
            <Image alt="intro2-mobile" src={dataSection2?.thumbnail?.url} width={472} height={477} objectFit="cover" />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Intro
