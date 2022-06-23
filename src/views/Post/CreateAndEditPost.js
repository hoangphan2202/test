import React, { useState } from 'react'
import Input from 'components/Input/Input'
import Button from 'components/Button/Button'
import postApi from 'api/postApi'
import { showToastError, showToastSuccess } from 'components/CustomToast/CustomToast'
import { Controller, useForm, FormProvider } from 'react-hook-form'
import CustomUploadFile from 'components/CustomUploadImage/CustomUploadImage'
import InputEditor from '../../components/InputEditor/InputEditor'
import { POST_STATUS } from '../../config'
import SelectMenu from '../../components/SelectMenu/SelectMenu'
import { useRouter } from 'next/router'
import { fetchAllPostsAsync } from '../../store/post'
import { useDispatch } from 'react-redux'

const POOL_LIST = [
  {
    name: 'NEW',
    value: 'NEW',
  },
  {
    name: 'DRAFT',
    value: 'DRAFT',
  },
  {
    name: 'PUBLISHED',
    value: 'PUBLISHED',
  },
  {
    name: 'INACTIVE',
    value: 'INACTIVE',
  },
]

export default function CreateAndEditPost({ post, onClose }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const methods = useForm({
    defaultValues: post
      ? {
          ...post,
          titleEN: post.content[0]?.title,
          titleVI: post.content[1]?.title,
          descriptionEN: post.content[0]?.description,
          descriptionVI: post.content[1]?.description,
          bodyEN: post.content[0]?.body,
          bodyVI: post.content[1]?.body,
          status: POOL_LIST.find((item) => post.status === item.value),
        }
      : {
          slug: '',
          titleEN: '',
          titleVI: '',
          descriptionEN: '',
          descriptionVI: '',
          bodyEN: '',
          bodyVI: '',
          status: POOL_LIST[2],
        },
  })

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = methods

  const [image, setImage] = useState(null)

  const onSubmit = async (data) => {
    const formData = new FormData()

    formData.append(
      'data',
      JSON.stringify({
        slug: data.slug,
        content: [
          {
            language: 'en',
            title: data.titleEN,
            description: data.descriptionEN,
            body: data.bodyEN,
          },
          {
            language: 'vi',
            title: data.titleVI,
            description: data.descriptionVI,
            body: data.bodyVI,
          },
        ],
        status: POST_STATUS.PUBLISHED,
      }),
    )

    if (image?.data?.name) {
      const thumbnail = [image?.data]
      formData.append('thumbnail', thumbnail[0])
    } else if (!post) {
      return showToastError('Thông báo', 'Vui lòng thêm ảnh bài đăng')
    }

    try {
      if (post) {
        await postApi.edit(post._id, formData)
        showToastSuccess('Thông báo', 'Chỉnh sửa thành công')
        dispatch(fetchAllPostsAsync())
        onClose()
      } else {
        await postApi.create(formData)
        showToastSuccess('Thông báo', 'Thêm bài đăng thành công')
        router.push('/admin/post')
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response)
        // setError(error.response.data.errors?.[0].msg)
        showToastError('Thông báo', 'Thêm bài đăng thất bại')
        setError('slug', {
          message: error.response.data.errors?.[0].msg,
        })
      }
    }
  }

  return (
    <div>
      <FormProvider {...methods}>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="mt-8">
          <div className="mb-7 h-96 w-full">
            <CustomUploadFile
              file={post?.thumbnail?.url}
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
              required: 'Slug không được để trống',
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Slug"
                onBlur={onBlur}
                value={value}
                onChange={(e) => {
                  onChange(
                    e.target.value
                      .toLowerCase()
                      .replace(/ /g, '-')
                      .replace(/[^\w-]+/g, ''),
                  )
                }}
                placeholder="Nhập slug..."
                type="text"
              />
            )}
            name="slug"
          />
          <p className="mt-1 mb-7 text-xs text-red-400">
            {errors?.slug?.message && `* ${errors?.['slug']?.message || 'Invalid'}`}
          </p>

          <p className="mb-1 font-bold text-primaryYellow">Tiếng Anh</p>
          <div className="ml-5">
            <Controller
              control={control}
              rules={{
                required: 'Tiêu đề không được để trống',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Tiêu đề"
                  onBlur={onBlur}
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value)
                  }}
                  placeholder="Nhập tiêu đề..."
                  type="text"
                />
              )}
              name="titleEN"
            />
            <p className="mt-1 mb-7 text-xs text-red-400">
              {errors?.titleEN?.message && `* ${errors?.['titleEN']?.message || 'Invalid'}`}
            </p>

            <Controller
              control={control}
              rules={{
                required: 'Mô tả không được để trống',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
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

            <InputEditor
              key="bodyEN"
              item={{
                id: 'bodyEN',
                name: 'bodyEN',
                label: 'Nội dung',
                rules: {
                  required: 'Nhập thông tin',
                },
                className: '',
                placeholder: 'Nội dung bài viết ...',
                type: 'texteditor',
              }}
            />
          </div>

          <p className="mb-1 mt-5 font-bold text-primaryYellow">Tiếng Việt</p>
          <div className="ml-5">
            <Controller
              control={control}
              rules={{
                required: 'Tiêu đề không được để trống',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Tiêu đề"
                  onBlur={onBlur}
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value)
                  }}
                  placeholder="Nhập tiêu đề..."
                  type="text"
                />
              )}
              name="titleVI"
            />
            <p className="mt-1 mb-7 text-xs text-red-400">
              {errors?.titleVI?.message && `* ${errors?.['titleVI']?.message || 'Invalid'}`}
            </p>

            <Controller
              control={control}
              rules={{
                required: 'Mô tả không được để trống',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
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
              name="descriptionVI"
            />
            <p className="mt-1 mb-7 text-xs text-red-400">
              {errors?.descriptionVI?.message && `* ${errors?.['descriptionVI']?.message || 'Invalid'}`}
            </p>

            <InputEditor
              key="bodyVI"
              item={{
                id: 'bodyVI',
                name: 'bodyVI',
                label: 'Nội dung',
                rules: {
                  required: 'Nhập thông tin',
                },
                className: '',
                placeholder: 'Nội dung bài viết ...',
                type: 'texteditor',
              }}
            />
          </div>

          <div className="mt-5">
            <label className="mb-3 text-lg">Trạng thái</label>
            <Controller
              control={control}
              // rules={item.rules}
              render={({ field: { onChange, onBlur, value } }) => {
                return (
                  <SelectMenu
                    className="max-w-xs"
                    iconAppend
                    classNameButton="p-4 flex items-center"
                    menuList={POOL_LIST}
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    size="lg"
                    // placeholder={item?.placeholder}
                    // disabled={item?.disabled}
                  />
                )
              }}
              name="status"
              autoComplete="off"
            />
          </div>
          {post ? (
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
