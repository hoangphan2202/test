import React from 'react'
import useI18n from '../../hooks/use-i18n'
import Container from '../../components/Container/Container'
import classNames from 'classnames'
import { HOME_DESCRIPTION_TYPE } from '../../constants'
import styles from 'styles/home.module.scss'

const Agenda = ({ data }) => {
  const i18n = useI18n()

  if (!data) return <div />

  const dataAgendaContent = data.find((block) => block.type === HOME_DESCRIPTION_TYPE.BLOCK4)
  const contentLanguageActive = dataAgendaContent?.content?.find((item) => i18n.activeLocale === item.language)

  return (
    <Container className="mt-16">
      <div className="relative ml-[4%]">
        <img alt="bg-title" src="/images/layout/bg-title.png" className="h-full w-full max-w-[80%] object-contain" />
        <h2 className="absolute top-[20%] ml-[5%] w-full transform text-center text-xl font-bold uppercase text-primaryYellow  sm:top-[25%] lg:text-4xl">
          {i18n.t('home.agendaTitle')}
        </h2>
      </div>
      <div className="relative">
        <img alt="bg-content" src="/images/layout/bg-content.png" className="h-[106px] w-full object-fill" />
        <span className="absolute top-1/2 left-1/2 mx-auto w-full max-w-prose max-w-[975px] -translate-x-1/2 -translate-y-1/2 transform px-5 text-center text-xs font-bold uppercase sm:text-md lg:max-w-full lg:text-xl">
          {contentLanguageActive?.description}
        </span>
      </div>
      <div className="relative mx-auto mt-10 hidden md:block">
        <img
          className="md:min-h-[700px] lg:min-h-[1000px] xl:min-h-full"
          alt="bg-agenda"
          src="/images/home/bg-agenda.png"
        />
        <div className="absolute top-[8%] left-[6%]">
          <p className=" text-4xl font-bold text-primaryYellow lg:mb-[5%] lg:mb-5">{i18n.t('agenda.agendaDay')}</p>
          <div className="xl::text-base grid grid-cols-1 gap-4 text-xs uppercase sm:grid-cols-7 sm:gap-6 lg:text-[15px]">
            <div className="col-span-2 font-bold">
              <div className="flex space-x-4">
                <div>
                  <p className="mb-2 whitespace-nowrap lg:mb-[5%]">09:00</p>
                  <p className="mb-2 whitespace-nowrap lg:mb-[5%]">10:00 - 10:10</p>
                </div>
                <div>
                  <p className="mb-2 lg:mb-[5%]">{i18n.t('agenda.1')}</p>
                  <p className="mb-2 lg:mb-[5%]">{i18n.t('agenda.2')}</p>
                </div>
              </div>
              <div className="mb-2 flex space-x-4 lg:mb-[5%]">
                <p className="whitespace-nowrap font-bold">10:10 - 12:00</p>
                <p>{i18n.t('agenda.3')}</p>
              </div>
              <div className="mb-2 flex space-x-4 lg:mb-[5%]">
                <p className="whitespace-nowrap font-bold">12:00 - 13:00</p>
                <p>{i18n.t('agenda.4')}</p>
              </div>
              <div className="mb-2 flex space-x-4 lg:mb-[5%]">
                <p className="whitespace-nowrap font-bold">13:00 - 13:10</p>
                <p>{i18n.t('agenda.5')}</p>
              </div>
              <div className="mb-2 flex space-x-4 lg:mb-[5%]">
                <p className="whitespace-nowrap font-bold">13:10 - 15:00</p>
                <p>{i18n.t('agenda.6')}</p>
              </div>
            </div>
            <div className="col-span-3 border-l-2 pl-[5%] font-bold">
              <div className="mb-2 flex space-x-4 lg:mb-[5%]">
                <p className="whitespace-nowrap font-bold">15:00 - 15:05</p>
                <p>{i18n.t('agenda.7')}</p>
              </div>
              <div className="col-span-3 grid grid-cols-2 gap-6">
                <div>
                  {dataAgendaContent.agenda.slice(0, 12).map((event) => {
                    const title = event?.[`airdrop${i18n.activeLocale.toUpperCase()}`]
                    const speech = event?.[`speech${i18n.activeLocale.toUpperCase()}`]

                    return (
                      <div className="flex space-x-3" key={event._id}>
                        <p className="mb-[4%] whitespace-nowrap">{title}</p>
                        {speech && <p className="mb-[4%]">{speech}</p>}
                      </div>
                    )
                  })}
                </div>
                <div>
                  {dataAgendaContent.agenda.slice(12).map((event) => {
                    const title = event?.[`airdrop${i18n.activeLocale.toUpperCase()}`]
                    const speech = event?.[`speech${i18n.activeLocale.toUpperCase()}`]

                    return (
                      <div className="flex space-x-3" key={event._id}>
                        <p className="mb-[4%] whitespace-nowrap">{title}</p>
                        {speech && <p className="mb-[4%]">{speech}</p>}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className="col-span-2 mr-12 border-l-2 pl-[7%] font-bold">
              <div className="mb-2 flex space-x-4 lg:mb-[5%]">
                <p className="whitespace-nowrap">19:00 - 19:05</p>
                <p className="break-words">{i18n.t('agenda.10')}</p>
              </div>
              <div className="mb-2 flex space-x-4 lg:mb-[5%]">
                <p className="whitespace-nowrap">19:05 - 19:20</p>
                <p className="break-words">{i18n.t('agenda.11')}</p>
              </div>
              <div className="mb-2 flex space-x-4 lg:mb-[5%]">
                <p className="whitespace-nowrap">19:20 - 19:30</p>
                <p className="break-words">{i18n.t('agenda.12')}</p>
              </div>
              <div className="mb-2 flex space-x-4 lg:mb-[5%]">
                <p className="whitespace-nowrap">19:30 - 20:00 </p>
                <p className="break-words">{i18n.t('agenda.13')}</p>
              </div>
              <div className="mb-2 flex space-x-4 lg:mb-[5%]">
                <p className="whitespace-nowrap">20:00 - 20:05</p>
                <p className="break-words">{i18n.t('agenda.14')}</p>
              </div>
              <div className="mb-2 flex space-x-4 lg:mb-[5%]">
                <p className="whitespace-nowrap">20:05 - 20:20</p>
                <p className="break-words">{i18n.t('agenda.15')}</p>
              </div>
              <div className="mb-2 flex space-x-4 lg:mb-[5%]">
                <p className="whitespace-nowrap">20:20 - 20:50</p>
                <p className="break-words">{i18n.t('agenda.16')}</p>
              </div>
              <div className="flex space-x-4">
                <p className="whitespace-nowrap">20:50 - 21:35</p>
                <p className="break-words">{i18n.t('agenda.17')}</p>
              </div>
            </div>
          </div>
        </div>
        <p
          className={classNames(
            'absolute bottom-[8%] left-0 w-full text-center text-2xl text-primaryYellow lg:text-4xl',
          )}
        >
          {i18n.t('agenda.agendaEvent')}
        </p>
      </div>
      <div className="relative mx-auto mt-10 block md:hidden">
        <img alt="bg-agenda" src="/images/home/bg-agenda-mobile.png" className={styles.imgBgAgendaMobile} />
        <div className="absolute top-[6%] left-0 w-full">
          <p className="mx-auto max-w-[180px] text-center font-bold uppercase text-primaryYellow">
            {i18n.t('agenda.agendaDay')}
          </p>
          <div className="mx-auto mt-1 max-w-sm px-[5%] text-xs uppercase">
            <div className="max-w-xs font-bold">
              <div className="mb-5 flex space-x-4">
                <p className="whitespace-nowrap font-bold">09:00 - 10:00</p>
                <p>{i18n.t('agenda.1')}</p>
              </div>
              <div className="mb-5 flex space-x-4">
                <p className="whitespace-nowrap font-bold">10:00 - 10:10</p>
                <p>{i18n.t('agenda.2')}</p>
              </div>
              <div className="mb-5 flex space-x-4">
                <p className="whitespace-nowrap font-bold">10:10 - 12:00</p>
                <p>{i18n.t('agenda.3')}</p>
              </div>
              <div className="mb-5 flex space-x-4">
                <p className="whitespace-nowrap font-bold">12:00 - 13:00</p>
                <p>{i18n.t('agenda.4')}</p>
              </div>
              <div className="mb-5 flex space-x-4">
                <p className="whitespace-nowrap font-bold">13:00 - 13:10</p>
                <p>{i18n.t('agenda.5')}</p>
              </div>
              <div className="mb-5 flex space-x-4">
                <p className="whitespace-nowrap font-bold">13:10 - 15:00</p>
                <p>{i18n.t('agenda.6')}</p>
              </div>
              <div className="mb-5 flex space-x-4">
                <p className="whitespace-nowrap font-bold">15:00 - 15:05</p>
                <p>{i18n.t('agenda.7')}</p>
              </div>
            </div>
            <div className={classNames(i18n.activeLocale === 'en' ? 'mt-5' : 'mt-2', 'grid grid-cols-2 gap-4')}>
              <div className="border-l-2 pl-[7%] font-bold">
                {dataAgendaContent.agenda.map((event) => {
                  const title = event?.[`airdrop${i18n.activeLocale.toUpperCase()}`]
                  const speech = event?.[`speech${i18n.activeLocale.toUpperCase()}`]

                  if (speech) {
                    return (
                      <div className="flex space-x-8 text-[9px]" key={event._id}>
                        <p className="mb-[4%] whitespace-nowrap">{title}</p>
                        {speech && <p className="mb-[4%]">{speech}</p>}
                      </div>
                    )
                  }
                })}
              </div>
              <div className="border-l-2 pl-[7%] font-bold">
                <div className={classNames(i18n.activeLocale === 'en' && 'mb-5', 'flex space-x-2')}>
                  <p className="whitespace-nowrap">19:00 - 19:05</p>
                  <p className="break-words">{i18n.t('agenda.10')}</p>
                </div>
                <div className={classNames(i18n.activeLocale === 'en' && 'mb-5', 'flex space-x-2')}>
                  <p className="whitespace-nowrap">19:05 - 19:20</p>
                  <p className="break-words">{i18n.t('agenda.11')}</p>
                </div>
                <div className={classNames(i18n.activeLocale === 'en' && 'mb-5', 'flex space-x-2')}>
                  <p className="whitespace-nowrap">19:20 - 19:30</p>
                  <p className="break-words">{i18n.t('agenda.12')}</p>
                </div>
                <div className={classNames(i18n.activeLocale === 'en' && 'mb-5', 'flex space-x-2')}>
                  <p className="whitespace-nowrap">19:30 - 20:00 </p>
                  <p className="break-words">{i18n.t('agenda.13')}</p>
                </div>
                <div className={classNames(i18n.activeLocale === 'en' && 'mb-5', 'flex space-x-2')}>
                  <p className="whitespace-nowrap">20:00 - 20:05</p>
                  <p className="break-words">{i18n.t('agenda.14')}</p>
                </div>
                <div className={classNames(i18n.activeLocale === 'en' && 'mb-5', 'flex space-x-2')}>
                  <p className="whitespace-nowrap">20:05 - 20:20</p>
                  <p className="break-words">{i18n.t('agenda.15')}</p>
                </div>
                <div className={classNames(i18n.activeLocale === 'en' && 'mb-5', 'flex space-x-2')}>
                  <p className="whitespace-nowrap">20:20 - 20:50</p>
                  <p className="break-words">{i18n.t('agenda.16')}</p>
                </div>
                <div className="flex space-x-4">
                  <p className="whitespace-nowrap">20:50 - 21:35</p>
                  <p className="break-words">{i18n.t('agenda.17')}</p>
                </div>
                {/*<div className={classNames(i18n.activeLocale === 'en' && 'mb-5', 'flex space-x-2')}>*/}
                {/*  <p className="whitespace-nowrap">17:40 - 18:30</p>*/}
                {/*  <p className="break-words">{i18n.t('agenda.10')}</p>*/}
                {/*</div>*/}
                {/*<div className={classNames(i18n.activeLocale === 'en' && 'mb-5', 'flex space-x-2')}>*/}
                {/*  <p className="whitespace-nowrap">18:30 - 20:30</p>*/}
                {/*  <p className="break-words">{i18n.t('agenda.11')}</p>*/}
                {/*</div>*/}
                {/*<div className="flex space-x-2">*/}
                {/*  <p className="whitespace-nowrap">20:30 - 21:15</p>*/}
                {/*  <p className="break-words">{i18n.t('agenda.12')}</p>*/}
                {/*</div>*/}
              </div>
            </div>
          </div>
        </div>
        <p
          className={classNames(
            'absolute bottom-[8%] left-0 hidden w-full text-center text-2xl text-primaryYellow md:block lg:text-4xl',
          )}
        >
          {i18n.t('agenda.agendaEvent')}
        </p>
      </div>
    </Container>
  )
}

export default Agenda
