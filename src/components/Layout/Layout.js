import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import StarFall from '../StarFall/StarFall'
import ContainerLayout from '../Container/ContainerLayout'

const Layout = ({ children }) => {
  return (
    <ContainerLayout>
      <div>
        <Header />
        {children}
      </div>
      <StarFall />
      <Footer />
    </ContainerLayout>
  )
}

export default Layout
