import React, { useState } from 'react'
import Breadcrum from 'components/Breadcrum/Breadcrum'
import Button from 'components/Button/Button'
import CustomUploadFile from 'components/CustomUploadImage/CustomUploadImage'
import Input from 'components/Input/Input'
import { showToastError, showToastSuccess } from 'components/CustomToast/CustomToast'
import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import partnersApi from '../../../api/partnersApi'
import SelectMenu from '../../../components/SelectMenu/SelectMenu'
import { lINK_STATUS_LIST } from '../../../constants'

export default function Create() {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      Link: '',
      openInNewTab: lINK_STATUS_LIST[0],
    },
  })

  const router = useRouter()

  const [image, setImage] = useState(null)
  const [error, setError] = useState('')

  const handleCreate = async (data) => {
    const formData = new FormData()

    let formatData = {
      openInNewTab: data.openInNewTab.value,
    }

    if (data.link) {
      formatData = { ...formatData, link: data.link }
    }

    formData.append('data', JSON.stringify(formatData))

    if (image?.data?.name) {
      const thumbnail = [image?.data]
      formData.append('thumbnail', thumbnail[0])
    }

    try {
      await partnersApi.create(formData)
      showToastSuccess('Thông báo', 'Thêm thành công')
      router.push('/admin/partners')
    } catch (error) {
      if (error.response) {
        setError(error.response.data.errors?.[0].msg)
        showToastError('Thông báo', 'Thêm thất bại')
      }
    }
  }

  const breadcrum = [
    {
      text: 'Admin',
      link: '/admin',
    },
    {
      text: 'Media Sponsors',
      link: '/admin/partners',
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
        <div className="mb-7 h-96 w-full">
          <CustomUploadFile
            allowedFileTypes={['image/*', '.jpg', '.jpeg', '.png', '.gif']}
            showPreview
            maxSize={4}
            onChange={(file) => {
              setImage(file)
            }}
          />
        </div>

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Link"
              onBlur={onBlur}
              value={value}
              onChange={(e) => {
                onChange(e.target.value.trim())
              }}
              placeholder="Nhập link..."
              type="text"
            />
          )}
          name="link"
        />
        <p className="mt-1 mb-7 text-xs text-red-400">
          {errors?.link?.message && `* ${errors?.['link']?.message || 'Invalid'}`}
          {error}
        </p>

        <div className="my-5">
          <label className="mb-3 text-lg">Mở link ở tab mới</label>
          <Controller
            control={control}
            // rules={item.rules}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <SelectMenu
                  className="max-w-[100px]"
                  iconAppend
                  classNameButton="p-4 flex items-center"
                  menuList={lINK_STATUS_LIST}
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  size="lg"
                />
              )
            }}
            name="openInNewTab"
            autoComplete="off"
          />
        </div>

        <Button size="lg" className="px-20" type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
          Thêm
        </Button>
      </form>
    </div>
  )
}
