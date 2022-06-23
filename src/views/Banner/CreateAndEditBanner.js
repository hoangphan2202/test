import React, { useState } from 'react'
import Button from 'components/Button/Button'
import CustomUploadFile from 'components/CustomUploadImage/CustomUploadImage'
import Input from 'components/Input/Input'
import { showToastError, showToastSuccess } from 'components/CustomToast/CustomToast'
import bannerApi from 'api/bannerApi'
import { Controller, useForm } from 'react-hook-form'
import { fetchAllBannerAsync } from '../../store/banner'
import { useDispatch } from 'react-redux'
import SelectMenu from '../../components/SelectMenu/SelectMenu'
import { lINK_STATUS_LIST } from '../../constants'

export default function CreateAndEditBanner({ banner, onClose }) {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: banner
      ? {
          link: banner.link,
          openInNewTab: lINK_STATUS_LIST.find((item) => banner.openInNewTab === item.value),
        }
      : {
          Link: '',
          openInNewTab: lINK_STATUS_LIST[0],
        },
  })
  const dispatch = useDispatch()
  const [image, setImage] = useState(null)
  const [error, setError] = useState('')

  const onSubmit = async (data) => {
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
      if (banner) {
        await bannerApi.edit(banner?._id, formData)
        showToastSuccess('Thông báo', 'Banner đã được cập nhật')
      } else {
        await bannerApi.create(formData)
        showToastSuccess('Thông báo', 'Thêm banner thành công')
      }
      await dispatch(fetchAllBannerAsync())
      onClose()
    } catch (error) {
      if (error.response) {
        setError(error.response.data.errors?.[0].msg)
        if (banner) {
          showToastError('Cập nhật banner thất bại')
        } else {
          showToastError('Thông báo', 'Thêm banner thất bại')
        }
      }
    }
  }

  return (
    <div>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <div className="max-w mx-auto mb-7 w-full max-w-[1238px]">
          <CustomUploadFile
            file={banner?.thumbnail?.url}
            className="h-full max-h-[536px] sm:min-h-[536px]"
            allowedFileTypes={['image/*', '.jpg', '.jpeg', '.png', '.gif']}
            showPreview
            maxSize={4}
            onChange={(file) => {
              setImage(file)
            }}
          />
          <p className="mt-1 mb-7 text-red-400">Kích thước ảnh: 1238x536</p>
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
        <div className="flex space-x-2">
          <Button size="lg" className="mt-10 px-20" type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
            Xác nhận
          </Button>
          <Button size="lg" className="mt-10 px-5" color="secondary" onClick={onClose} isLoading={isSubmitting}>
            Đóng
          </Button>
        </div>
      </form>
    </div>
  )
}
