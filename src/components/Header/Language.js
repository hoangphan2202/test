import React from 'react'
import Dropdown from '../Dropdown/Dropdown'
import useI18n from '../../hooks/use-i18n'
import EN from '../../locales/en.json'
import VI from '../../locales/vi.json'

const Language = () => {
  const i18n = useI18n()

  return (
    <div>
      <Dropdown
        className="hidden md:inline-block"
        bsPrefixMenu="mb-0"
        isArrow
        menu={<p className="font-bold uppercase">{i18n.activeLocale}</p>}
        classNameMenuItem="bg-primaryBlack whitespace-nowrap"
      >
        <a
          className="block h-full w-full cursor-pointer px-4 py-2 hover:bg-primaryBLue"
          onClick={() => {
            i18n.locale('en', EN)
          }}
        >
          EN
        </a>
        <a
          className="block h-full w-full cursor-pointer px-4 py-2 hover:bg-primaryBLue"
          onClick={() => {
            i18n.locale('vi', VI)
          }}
        >
          VI
        </a>
      </Dropdown>
    </div>
  )
}

export default Language
