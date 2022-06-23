import React from 'react'
import Logo from '../Header/Logo'
import Account from './Account'
import Container from '../Container/Container'

const HeaderAdmin = () => {
  return (
    <header className="relative z-50 flex h-[150px] items-center justify-between">
      <Container>
        <div className="mx-auto flex items-center justify-between">
          <Logo />
          <Account />
        </div>
      </Container>
    </header>
  )
}

export default HeaderAdmin
