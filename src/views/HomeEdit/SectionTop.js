import React, { useState } from 'react'
import CustomUploadFile from '../../components/CustomUploadImage/CustomUploadImage'
import { Controller, useForm } from 'react-hook-form'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import { showToastError, showToastSuccess } from '../../components/CustomToast/CustomToast'
import TextareaCustom from '../../components/Input/TextareaCustom'
import { useSWRConfig } from 'swr'
import homeDescriptionApi from '../../api/homeDescriptionApi'

const SectionTop = ({ data }) => {
  const { mutate } = useSWRConfig()

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      ...data,
      titleEn: data.content[0]?.title,
      titleVI: data.content[1]?.title,
      descriptionEN: data.content[0]?.description,
      descriptionVI: data.content[1]?.description,
    },
  })

  const [image, setImage] = useState(null)

  const handleCreate = async (data) => {
    const formData = new FormData()

    formData.append(
      'data',
      JSON.stringify({
        content: [
          {
            language: 'en',
            title: data.titleEn,
            description: data.descriptionEN,
          },
          {
            language: 'vi',
            title: data.titleVI,
            description: data.descriptionVI,
          },
        ],
      }),
    )

    if (image?.data?.name) {
      const thumbnail = [image?.data]
      formData.append('thumbnail', thumbnail[0])
    }
    try {
      if (data) {
        await homeDescriptionApi.edit(data._id, formData)
        showToastSuccess('Thông báo', 'Chỉnh sửa thành công')
        mutate()
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response)
        // setError(error.response.data.errors?.[0].msg)
        showToastError('Thông báo', 'Chỉnh sửa thất bại')
      }
    }
  }

  return (
    <div>
      <form autoComplete="off" onSubmit={handleSubmit(handleCreate)} className="mt-8">
        <div className="max-w mx-auto mb-7 w-full max-w-[472px]">
          <CustomUploadFile
            file={data?.thumbnail?.url}
            className="h-full max-h-[477px] sm:min-h-[477px]"
            allowedFileTypes={['image/*', '.jpg', '.jpeg', '.png', '.gif']}
            showPreview
            maxSize={4}
            onChange={(file) => {
              setImage(file)
            }}
          />
        </div>
        <p className="mt-1 mb-7 text-red-400">Kích thước ảnh: 472x477</p>
        <p className="mb-1 font-bold text-primaryYellow">Tiếng Anh</p>
        <div className="ml-5">
          <Controller
            control={control}
            rules={{
              required: 'Tên không được để trống',
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Tiêu đề"
                onBlur={onBlur}
                value={value}
                onChange={(e) => {
                  onChange(e.target.value)
                }}
                placeholder="Nhập tên..."
                type="text"
              />
            )}
            name="titleEn"
          />
          <p className="mt-1 mb-7 text-xs text-red-400">
            {errors?.nameEn?.message && `* ${errors?.['nameEn']?.message || 'Invalid'}`}
          </p>

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextareaCustom
                textareaClassName="h-40"
                label="Mô tả"
                onBlur={onBlur}
                value={value}
                onChange={(e) => {
                  onChange(e.target.value)
                }}
                placeholder="Nhập mô tả..."
                type="text"
              />
            )}
            name="descriptionEN"
          />
          <p className="mt-1 mb-7 text-xs text-red-400">
            {errors?.descriptionEN?.message && `* ${errors?.['descriptionEN']?.message || 'Invalid'}`}
          </p>
        </div>

        <p className="mb-1 mt-5 font-bold text-primaryYellow">Tiếng Việt</p>
        <div className="ml-5">
          <Controller
            control={control}
            rules={{
              required: 'Tên không được để trống',
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Tiêu đề"
                onBlur={onBlur}
                value={value}
                onChange={(e) => {
                  onChange(e.target.value)
                }}
                placeholder="Nhập tên..."
                type="text"
              />
            )}
            name="titleVI"
          />
          <p className="mt-1 mb-7 text-xs text-red-400">
            {errors?.nameVI?.message && `* ${errors?.['nameVI']?.message || 'Invalid'}`}
          </p>

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextareaCustom
                textareaClassName="h-40"
                onBlur={onBlur}
                value={value}
                onChange={(e) => {
                  onChange(e.target.value)
                }}
                placeholder="Nhập mô tả..."
                type="text"
              />
            )}
            name="descriptionVI"
          />
          <p className="mt-1 mb-7 text-xs text-red-400">
            {errors?.descriptionVI?.message && `* ${errors?.['descriptionVI']?.message || 'Invalid'}`}
          </p>
        </div>

        <Button size="lg" className="px-20" type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
          Xác nhận
        </Button>
      </form>
    </div>
  )
}

export default SectionTop
