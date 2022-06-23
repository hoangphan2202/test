import React from 'react'
import Breadcrum from 'components/Breadcrum/Breadcrum'
import CreateAndEditAdvisory from '../../../views/Advisory/CreateAndEditAdvisory'

export default function create() {
  const breadcrum = [
    {
      text: 'Admin',
      link: '/admin',
    },
    {
      text: 'Advisory',
      link: '/admin/advisory',
    },
    {
      text: 'Create',
      active: true,
    },
  ]

  return (
    <div>
      <Breadcrum data={breadcrum} />
      <CreateAndEditAdvisory />
    </div>
  )
}
