import React, { useState } from 'react'
import Breadcrum from 'components/Breadcrum/Breadcrum'
import Button from 'components/Button/Button'
import CustomUploadFile from 'components/CustomUploadImage/CustomUploadImage'
import { showToastError, showToastSuccess } from 'components/CustomToast/CustomToast'
import { useForm } from 'react-hook-form'
import imagesProjectApi from '../../../api/imagesProjectApi'
import { useRouter } from 'next/router'

export default function Create() {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm()
  const router = useRouter()

  const [image, setImage] = useState(null)

  const handleCreate = async () => {
    const formData = new FormData()
    if (image?.data?.name) {
      const thumbnail = [image?.data]
      formData.append('thumbnail', thumbnail[0])
    }
    try {
      await imagesProjectApi.create(formData)
      showToastSuccess('Thông báo', 'Thêm ảnh thành công')
      router.push('/admin/images')
    } catch (error) {
      if (error.response) {
        showToastError('Thông báo', 'Thêm ảnh thất bại')
      }
    }
  }

  const breadcrum = [
    {
      text: 'Admin',
      link: '/admin',
    },
    {
      text: "Event's Visual",
      link: '/admin/images',
    },
    {
      text: 'Create',
      active: true,
    },
  ]

  return (
    <div>
      <Breadcrum data={breadcrum} />

      <form autoComplete="off" onSubmit={handleSubmit(handleCreate)} className="mt-8">
        <div className="max-w mx-auto mb-7 w-full max-w-[1050px]">
          <CustomUploadFile
            className="h-full max-h-[535px] sm:min-h-[535px]"
            allowedFileTypes={['image/*', '.jpg', '.jpeg', '.png', '.gif']}
            showPreview
            maxSize={4}
            onChange={(file) => {
              setImage(file)
            }}
          />
        </div>
        <p className="mt-1 mb-7 text-red-400">Kích thước ảnh: 1050x535</p>

        <Button size="lg" className="px-20" type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
          Thêm
        </Button>
      </form>
    </div>
  )
}
