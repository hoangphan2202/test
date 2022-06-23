import { Fragment, useEffect } from 'react'
import { mapList, STT_COR } from '../../constants'
import useI18n from '../../hooks/use-i18n'
import VI from 'locales/vi.json'
import { fetcher } from '../../api/axiosClient'
import useSWR, { useSWRConfig } from 'swr'
import Loader from '../../components/Loader/Loader'
import boothCoordinateApi, { boothCoordinateUrlApi } from '../../api/boothCoordinateApi'
import Breadcrum from '../../components/Breadcrum/Breadcrum'

const Map = () => {
  const { mutate } = useSWRConfig()
  const { data } = useSWR(boothCoordinateUrlApi.getAll, fetcher)

  const i18n = useI18n()

  useEffect(() => {
    i18n.locale('vi', VI)
  }, [])

  const handleChangeStatusBooth = async (_id, status) => {
    const options = { rollbackOnError: true }

    mutate(
      boothCoordinateUrlApi.getAll,
      async () => {
        const coor = await boothCoordinateApi.editCoordinate(_id, {
          available: status,
        })

        // filter the list, and return it with the updated item
        const filteredData = data.filter((coor) => coor._id !== _id)
        return [...filteredData, coor]
      },
      options,
    )
  }

  const breadcrum = [
    {
      text: 'Admin',
      link: '/admin',
    },
    {
      text: 'Map',
      active: true,
    },
  ]

  return (
    <div>
      <Breadcrum data={breadcrum} />
      {data ? (
        <div className="relative mt-10 overflow-auto">
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
            {data.map((coords) => {
              if (!coords.available) {
                return (
                  <g key={coords._id}>
                    <rect
                      x={coords.x}
                      y={coords.y}
                      width={coords.width}
                      height={coords.height}
                      opacity="0.6"
                      fill="red"
                      className="cursor-pointer"
                      onClick={() => handleChangeStatusBooth(coords._id, true)}
                    />

                    <text fill="white" filter="url(#solid)" x={coords.x + 50} y={coords.y} className="font-bold">
                      {i18n.t('map.outOfStock')}
                    </text>
                  </g>
                )
              }

              return (
                <g key={coords._id}>
                  <rect
                    className="cursor-pointer"
                    x={coords.x}
                    y={coords.y}
                    width={coords.width}
                    height={coords.height}
                    fill="transparent"
                    onClick={() => handleChangeStatusBooth(coords._id, false)}
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
      ) : (
        <Loader className="mx-auto mt-10 h-40 w-40" />
      )}
    </div>
  )
}

export default Map
