import React, { useState } from 'react'
import Input from 'components/Input/Input'
import Button from 'components/Button/Button'
import advisoryApi from 'api/advisoryApi'
import { showToastError, showToastSuccess } from 'components/CustomToast/CustomToast'
import { Controller, useForm, FormProvider } from 'react-hook-form'
import CustomUploadFile from 'components/CustomUploadImage/CustomUploadImage'
import { useRouter } from 'next/router'
import TextareaCustom from 'components/Input/TextareaCustom'
import { useDispatch } from 'react-redux'
import { fetchAllAdvisoriesAsync } from '../../store/advisory'

export default function CreateAndEditAdvisory({ advisory, onClose }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const methods = useForm({
    defaultValues: advisory
      ? {
          ...advisory,
          nameEn: advisory.content[0]?.name,
          nameVI: advisory.content[1]?.name,
          descriptionEN: advisory.content[0]?.description,
          descriptionVI: advisory.content[1]?.description,
        }
      : {
          nameEn: '',
          nameVI: '',
          descriptionEN: '',
          descriptionVI: '',
        },
  })

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = methods

  const [image, setImage] = useState(null)

  const onSubmit = async (data) => {
    const formData = new FormData()

    formData.append(
      'data',
      JSON.stringify({
        content: [
          {
            language: 'en',
            name: data.nameEn,
            description: data.descriptionEN,
          },
          {
            language: 'vi',
            name: data.nameVI,
            description: data.descriptionVI,
          },
        ],
      }),
    )

    if (image?.data?.name) {
      const thumbnail = [image?.data]
      formData.append('thumbnail', thumbnail[0])
    } else if (!advisory) {
      return showToastError('Thông báo', 'Vui lòng thêm ảnh')
    }

    try {
      if (advisory) {
        await advisoryApi.edit(advisory._id, formData)
        showToastSuccess('Thông báo', 'Chỉnh sửa thành công')
        dispatch(fetchAllAdvisoriesAsync())
        onClose()
      } else {
        await advisoryApi.create(formData)
        showToastSuccess('Thông báo', 'Thêm advisory thành công')
        router.push('/admin/advisory')
      }
    } catch (error) {
      if (error.response) {
        showToastError('Thông báo', 'Thêm advisory thất bại')
      }
    }
  }

  return (
    <div>
      <FormProvider {...methods}>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="mt-8">
          <div className="mb-5 flex justify-center">
            <div className="mb-7 h-[200px] w-[284px] sm:h-[300px]">
              <CustomUploadFile
                file={advisory?.thumbnail?.url}
                allowedFileTypes={['image/*', '.jpg', '.jpeg', '.png', '.gif']}
                maxNumberOfFiles={1}
                showPreview
                maxSize={20}
                onChange={(file) => {
                  setImage(file)
                }}
              />
              <p className="mt-1 mb-7 text-red-400">Kích thước ảnh: 284x300</p>
            </div>
          </div>

          <p className="mb-1 font-bold text-primaryYellow">Tiếng Anh</p>
          <div className="ml-5">
            <Controller
              control={control}
              rules={{
                required: 'Tên không được để trống',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Tên"
                  onBlur={onBlur}
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value)
                  }}
                  placeholder="Nhập tên..."
                  type="text"
                />
              )}
              name="nameEn"
            />
            <p className="mt-1 mb-7 text-xs text-red-400">
              {errors?.nameEn?.message && `* ${errors?.['nameEn']?.message || 'Invalid'}`}
            </p>

            <Controller
              control={control}
              rules={{
                maxLength: {
                  value: 500,
                  message: 'Nội dung không được vượt quá 500 kí tự',
                },
              }}
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
                  label="Tên"
                  onBlur={onBlur}
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value)
                  }}
                  placeholder="Nhập tên..."
                  type="text"
                />
              )}
              name="nameVI"
            />
            <p className="mt-1 mb-7 text-xs text-red-400">
              {errors?.nameVI?.message && `* ${errors?.['nameVI']?.message || 'Invalid'}`}
            </p>

            <Controller
              control={control}
              rules={{
                maxLength: {
                  value: 500,
                  message: 'Nội dung không được vượt quá 500 kí tự',
                },
              }}
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
          {advisory ? (
            <div className="flex space-x-2">
              <Button size="lg" className="mt-10 px-20" type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
                Xác nhận
              </Button>
              <Button size="lg" className="mt-10 px-5" color="secondary" onClick={onClose} isLoading={isSubmitting}>
                Đóng
              </Button>
            </div>
          ) : (
            <Button size="lg" className="mt-10 px-20" type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
              Xác nhận
            </Button>
          )}
        </form>
      </FormProvider>
    </div>
  )
}
