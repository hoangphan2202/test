import React from 'react'
import Breadcrum from 'components/Breadcrum/Breadcrum'
import { Controller, useForm } from 'react-hook-form'
import videoApi from 'api/videoApi'
import Input from 'components/Input/Input'
import Button from 'components/Button/Button'
import { showToastError, showToastSuccess } from 'components/CustomToast/CustomToast'
import { MAIN_VIDEO_OPTION } from 'constants/index'
import SelectMenu from 'components/SelectMenu/SelectMenu'
import { useRouter } from 'next/router'
const Create = () => {
  const router = useRouter()

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm()

  const breadcrum = [
    {
      text: 'Admin',
      link: '/admin',
    },
    {
      text: 'Video',
      link: '/admin/video',
    },
    {
      text: 'Create',
      active: true,
    },
  ]

  const handleCreate = async (data) => {
    data.isMainVideo = data?.isMainVideo?.value
    try {
      await videoApi.create(data)
      showToastSuccess('Thông báo', 'Thêm video thành công')
      router.push('/admin/video')
    } catch (error) {
      if (error.response) {
        showToastError('Thông báo', 'Thêm video thất bại')
        setError('url', {
          message: error.response.data.errors?.[0].msg,
        })
      }
    }
  }

  return (
    <div>
      <Breadcrum data={breadcrum} />
      <form autoComplete="off" onSubmit={handleSubmit(handleCreate)} className="mt-8">
        <Controller
          control={control}
          rules={{
            required: 'Nhập thông tin',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Url"
              onBlur={onBlur}
              value={value}
              onChange={(e) => {
                onChange(e.target.value.trim())
              }}
              placeholder="Nhập url..."
              type="text"
            />
          )}
          name="url"
        />

        <p className="mt-1 mb-7 text-xs text-red-400">
          {errors?.url?.message && `* ${errors?.['url']?.message || 'Invalid'}`}
        </p>

        {/* <p className="mb-3 text-lg">Main Video</p>

        <div className="mb-7">
          <label className="mr-3 text-lg" htmlFor="isMainVideoYes">
            Yes
          </label>
          <input
            {...register('isMainVideo')}
            type="radio"
            name="isMainVideo"
            id="isMainVideoYes"
            className="mr-10"
            value={true}
            checked={true}
          />

          <label className="mr-3 text-lg" htmlFor="isMainVideoNo">
            No
          </label>
          <input {...register('isMainVideo')} type="radio" name="isMainVideo" id="isMainVideoNo" value={false} />
        </div> */}

        <div className="mt-5">
          <p className="mb-3 text-lg">Is Main Video</p>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <SelectMenu
                className="max-w-[100px]"
                classNameButton="p-4 flex items-center"
                menuList={MAIN_VIDEO_OPTION}
                iconAppend
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                size="lg"
              />
            )}
            name="isMainVideo"
            autoComplete="off"
            defaultValue={MAIN_VIDEO_OPTION[0]}
          />
        </div>

        <Button size="lg" className="mt-10 px-20" type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
          Thêm
        </Button>
      </form>
    </div>
  )
}

export default Create
