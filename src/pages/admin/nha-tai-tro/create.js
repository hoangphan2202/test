import React from 'react'
import Breadcrum from 'components/Breadcrum/Breadcrum'
import CreateAndEditSponsor from '../../../views/Sponsors/CreateAndEditSponsor'

export default function Create() {
  const breadcrum = [
    {
      text: 'Admin',
      link: '/admin',
    },
    {
      text: 'Sponsors',
      link: '/admin/nha-tai-tro',
    },
    {
      text: 'Create',
      active: true,
    },
  ]

  return (
    <div>
      <Breadcrum data={breadcrum} />
      <CreateAndEditSponsor />
    </div>
  )
}
