import React from 'react'
import Logo from './Logo'
import Menu from './Menu'
import Language from './Language'
import MenuMobile from './MenuMobile'
import { listMenu } from '../../constants'
import useI18n from '../../hooks/use-i18n'
import Container from '../Container/Container'

const Header = () => {
  const i18n = useI18n()

  return (
    <header className="relative z-70 flex h-[150px] w-full animate-fade-in items-center justify-between">
      <Container className="px-3">
        <div className="flex flex-1 items-center justify-between">
          <Logo />
          <div className="flex items-center">
            <Menu className="hidden flex-wrap md:flex" listMenu={listMenu(i18n)} />
            <Language />
            <MenuMobile listMenu={listMenu(i18n)} />
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Header
