import React, { useState } from 'react'
import Input from 'components/Input/Input'
import Button from 'components/Button/Button'
import { showToastError, showToastSuccess } from 'components/CustomToast/CustomToast'
import { Controller, useForm, FormProvider } from 'react-hook-form'
import CustomUploadFile from 'components/CustomUploadImage/CustomUploadImage'
import { useRouter } from 'next/router'
import sponsorsApi from '../../api/sponsorsApi'
import { fetchAllSponsorsAsync } from '../../store/sponsors'
import { useDispatch } from 'react-redux'
import SelectMenu from '../../components/SelectMenu/SelectMenu'
import { lINK_STATUS_LIST } from '../../constants'

export default function CreateAndEditSponsor({ sponsor, onClose }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const methods = useForm({
    defaultValues: sponsor
      ? {
          ...sponsor,
          descriptionEN: sponsor.content[0]?.description,
          descriptionVI: sponsor.content[1]?.description,
          openInNewTab: lINK_STATUS_LIST.find((item) => sponsor.openInNewTab === item.value),
        }
      : {
          link: '',
          name: '',
          openInNewTab: lINK_STATUS_LIST[0],
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
    let dataFormat = {
      openInNewTab: data.openInNewTab.value,
      name: data.name,
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
    }

    if (data.link) {
      dataFormat = { ...dataFormat, link: data.link }
    }

    formData.append('data', JSON.stringify(dataFormat))

    if (image?.data?.name) {
      const thumbnail = [image?.data]
      formData.append('thumbnail', thumbnail[0])
    } else if (!sponsor) {
      return showToastError('Thông báo', 'Vui lòng thêm ảnh nhà tài trợ')
    }

    try {
      if (sponsor) {
        await sponsorsApi.edit(sponsor._id, formData)
        showToastSuccess('Thông báo', 'Chỉnh sửa thành công')
        dispatch(fetchAllSponsorsAsync())
        onClose()
      } else {
        await sponsorsApi.create(formData)
        showToastSuccess('Thông báo', 'Thêm nhà tài trợ thành công')
        router.push('/admin/nha-tai-tro')
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response)
        showToastError('Thông báo', 'Thêm nhà tài trợ thất bại')
        showToastError('Thông báo', error.response.data.errors?.[0].msg)
      }
    }
  }

  return (
    <div>
      <FormProvider {...methods}>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="mt-8">
          <div className="mb-7 h-96 w-full">
            <CustomUploadFile
              file={sponsor?.thumbnail?.url}
              allowedFileTypes={['image/*', '.jpg', '.jpeg', '.png', '.gif']}
              maxNumberOfFiles={1}
              showPreview
              maxSize={4}
              onChange={(file) => {
                setImage(file)
              }}
            />
          </div>

          <Controller
            control={control}
            rules={{
              required: 'Tiêu đề không được để trống',
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
            name="name"
          />
          <p className="mt-1 mb-7 text-xs text-red-400">
            {errors?.titleEN?.message && `* ${errors?.['name']?.message || 'Invalid'}`}
          </p>

          <p className="mb-1 font-bold text-primaryYellow">Tiếng Anh</p>
          <div className="ml-5">
            <label className="mb-3 text-lg">Mô tả</label>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <textarea
                  onBlur={onBlur}
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value)
                  }}
                  placeholder="Nhập mô tả..."
                  className="w-full rounded-xl border bg-transparent p-4 focus:outline-none"
                  rows={10}
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
            <label className="mb-3 text-lg">Mô tả</label>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <textarea
                  onBlur={onBlur}
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value)
                  }}
                  placeholder="Nhập mô tả..."
                  className="w-full rounded-xl border bg-transparent p-4 focus:outline-none"
                  rows={10}
                />
              )}
              name="descriptionVI"
            />
            <p className="mt-1 mb-7 text-xs text-red-400">
              {errors?.descriptionVI?.message && `* ${errors?.['descriptionVI']?.message || 'Invalid'}`}
            </p>
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
          </p>

          <div className="mt-5">
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
          {sponsor ? (
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
