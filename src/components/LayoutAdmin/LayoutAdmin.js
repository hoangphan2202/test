import React from 'react'
import Container from '../Container/Container'
import HeaderAdmin from '../HeaderAdmin/HeaderAdmin'
import withAuthAdmin from '../../hoc/withAuthAdmin'

const LayoutAdmin = ({ children }) => {
  return (
    <div className="min-h-screen overflow-hidden bg-black3 text-white">
      <Container className="pb-10">
        <HeaderAdmin />
        {children}
      </Container>
    </div>
  )
}

export default withAuthAdmin(LayoutAdmin)
