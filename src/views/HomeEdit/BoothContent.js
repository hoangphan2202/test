import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import Button from '../../components/Button/Button'
import { showToastError, showToastSuccess } from '../../components/CustomToast/CustomToast'
import TextareaCustom from '../../components/Input/TextareaCustom'
import { useSWRConfig } from 'swr'
import homeDescriptionApi from '../../api/homeDescriptionApi'

const BoothContent = ({ data }) => {
  const { mutate } = useSWRConfig()

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      ...data,
      descriptionEN: data.content[0]?.description,
      descriptionVI: data.content[1]?.description,
    },
  })

  const handleCreate = async (data) => {
    const formData = new FormData()

    formData.append(
      'data',
      JSON.stringify({
        content: [
          {
            language: 'en',
            description: data.descriptionEN,
          },
          {
            language: 'vi',
            description: data.descriptionVI,
          },
        ],
      }),
    )

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
        <p className="mb-1 font-bold text-primaryYellow">Tiếng Anh</p>
        <div className="ml-5">
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

export default BoothContent
