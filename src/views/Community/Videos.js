import React from 'react'
import useI18n from '../../hooks/use-i18n'
import VideoCustom from '../../components/VideoCustom/VideoCustom'
import { getYouTubeIdFromLink } from 'utils'

const Videos = ({ data }) => {
  const i18n = useI18n()

  return (
    <div className="mt-16">
      <div className="relative ml-[4%] ">
        <img
          alt="bg-title"
          src="/images/layout/bg-only-title.png"
          className="mx-auto h-full w-full max-w-[100%] object-contain object-fill sm:max-w-[60%]"
        />
        <h2 className="absolute top-[30%] ml-[3%] w-full transform text-center text-xl font-bold uppercase text-primaryYellow  lg:text-4xl">
          {i18n.t('videos')}
        </h2>
      </div>
      <div className="mt-10">
        {data.length > 0 ? (
          <>
            {data?.map((video) => {
              if (video?.isMainVideo) {
                return (
                  <div className="relative" key={video?._id}>
                    <div className="border-frame max-h-[720px]" />
                    <VideoCustom
                      width="100%"
                      height="720"
                      // controls
                      // poster="/images/community/event.png"
                      className="max-h-[720px] object-fill"
                      src={`https://www.youtube.com/embed/${getYouTubeIdFromLink(video?.url)}?rel=0`}
                    >
                      Your browser does not support the video tag.
                    </VideoCustom>
                  </div>
                )
              }
            })}
            <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {data?.map((video) => {
                if (video?.isMainVideo) return
                return (
                  <div className="relative" key={video?._id}>
                    <div className="border-frame max-h-[348px]" />
                    <VideoCustom
                      width="100%"
                      height="348"
                      // controls
                      // poster="/images/community/news4.png"
                      src={`https://www.youtube.com/embed/${getYouTubeIdFromLink(video?.url)}?rel=0`}
                      className="max-h-[348px] object-fill"
                    ></VideoCustom>
                  </div>
                )
              })}
            </div>
          </>
        ) : (
          <p className="text-center">{i18n.t('noDataVideo')}</p>
        )}
      </div>
    </div>
  )
}

export default Videos
