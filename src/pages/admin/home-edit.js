import React, { useState } from 'react'
import useSWR from 'swr'
import { fetcher } from '../../api/axiosClient'
import { homeDescriptionUrlApi } from '../../api/homeDescriptionApi'
import SectionTop from '../../views/HomeEdit/SectionTop'
import { HOME_DESCRIPTION_TYPE } from '../../constants'
import Loader from '../../components/Loader/Loader'
import classNames from 'classnames'
import SectionBottom from '../../views/HomeEdit/SectionBottom'
import BoothContent from '../../views/HomeEdit/BoothContent'
import AgendaContent from '../../views/HomeEdit/AgendaContent'
import Breadcrum from '../../components/Breadcrum/Breadcrum'

const BLOCKS = {
  'Section 1': 'Section 1',
  'Section 2': 'Section 2',
  Booth: 'Booth',
  Agenda: 'Agenda',
}

const HomeEdit = () => {
  const [showBlock, setShowBlock] = useState(BLOCKS['Section 1'])
  const { data } = useSWR(homeDescriptionUrlApi.getAll, fetcher)

  if (!data) return <Loader className="mx-auto h-40 w-40" />

  const dataSection1 = data.find((block) => block.type === HOME_DESCRIPTION_TYPE.BLOCK1)
  const dataSection2 = data.find((block) => block.type === HOME_DESCRIPTION_TYPE.BLOCK2)
  const dataBoothContent = data.find((block) => block.type === HOME_DESCRIPTION_TYPE.BLOCK3)
  const dataAgendaContent = data.find((block) => block.type === HOME_DESCRIPTION_TYPE.BLOCK4)

  const breadcrum = [
    {
      text: 'Admin',
      link: '/admin',
    },
    {
      text: 'Setting homepage',
      active: true,
    },
  ]

  return (
    <div>
      <Breadcrum data={breadcrum} />

      <div className="mt-10 grid max-w-screen-xl grid-cols-4 gap-5">
        {Object.keys(BLOCKS).map((block, i) => (
          <div key={i} className="cursor-pointer rounded-lg bg-black-2 p-4">
            <div
              onClick={() => {
                if (showBlock === block) {
                  return setShowBlock(null)
                }
                setShowBlock(block)
              }}
            >
              <p
                className={classNames(
                  'text-2xl font-bold text-white hover:text-primaryYellow',
                  showBlock === block && 'text-primaryYellow',
                )}
              >
                {block}
              </p>
            </div>
          </div>
        ))}
      </div>
      {showBlock === BLOCKS['Section 1'] && <SectionTop data={dataSection1} />}

      {showBlock === BLOCKS['Section 2'] && <SectionBottom data={dataSection2} />}

      {showBlock === BLOCKS.Booth && <BoothContent data={dataBoothContent} />}

      {showBlock === BLOCKS.Agenda && <AgendaContent data={dataAgendaContent} />}
    </div>
  )
}

export default HomeEdit
