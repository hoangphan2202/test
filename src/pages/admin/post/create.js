import React from 'react'
import Breadcrum from 'components/Breadcrum/Breadcrum'
import CreateAndEditPost from '../../../views/Post/CreateAndEditPost'

export default function Create() {
  const breadcrum = [
    {
      text: 'Admin',
      link: '/admin',
    },
    {
      text: 'Post',
      link: '/admin/post',
    },
    {
      text: 'Create',
      active: true,
    },
  ]

  return (
    <div>
      <Breadcrum data={breadcrum} />
      <CreateAndEditPost />
    </div>
  )
}
