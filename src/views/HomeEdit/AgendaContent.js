import React from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import Button from '../../components/Button/Button'
import { showToastError, showToastSuccess } from '../../components/CustomToast/CustomToast'
import TextareaCustom from '../../components/Input/TextareaCustom'
import { useSWRConfig } from 'swr'
import homeDescriptionApi from '../../api/homeDescriptionApi'
import Input from '../../components/Input/Input'
import { FiMinusCircle, FiPlusCircle } from 'react-icons/fi'

const AgendaContent = ({ data }) => {
  const { mutate } = useSWRConfig()

  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      ...data,
      descriptionEN: data.content[0]?.description,
      descriptionVI: data.content[1]?.description,
    },
  })

  const { fields, remove, insert } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'agenda', // unique name for your Field Array
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
        agenda: data.agenda,
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

  const handleAddAgenda = () => {
    if (fields.length === 10) return
    insert(fields.length + 1, {
      airdrop: '',
      speech: '',
    })
  }

  const handleRemoveAgenda = (removeIndex) => {
    remove(removeIndex)
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
                label="Mô tả"
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

        <div className="mt-5 flex items-center space-x-4">
          <p className="font-bold">Lịch</p>
          <FiPlusCircle className="hover-primary cursor-pointer " size={30} onClick={handleAddAgenda} />
        </div>
        <p className="mt-1 mb-2 text-red-400">Tối đa 10 sự kiện</p>
        {fields.map((item, index) => (
          <div key={item.id}>
            <p className="mb-1 mt-5 font-bold text-primaryYellow">Tiếng Anh</p>
            <div className="grid grid-cols-5 gap-4">
              <div className="col-span-2">
                <div>
                  <Input
                    label="Tiêu đề"
                    {...register(`agenda.[${index}].airdropEN`, {
                      ...(index !== 0 && {
                        required: 'This field is required',
                      }),
                    })}
                  />
                  <p className="mt-1 mb-7 text-xs text-red-400">
                    {errors?.agenda?.[index]?.airdropEN?.message &&
                      `* ${errors?.portfolio?.[index]?.airdropEN?.message || 'Invalid'}`}
                  </p>
                </div>
              </div>
              <div className="col-span-2">
                <div>
                  <Input label="Mô tả" {...register(`agenda.[${index}].speechEN`)} />
                </div>
              </div>
              <div className="flex items-center">
                {index !== 0 && (
                  <FiMinusCircle
                    className="hover-primary cursor-pointer"
                    size={30}
                    onClick={() => handleRemoveAgenda(index)}
                  />
                )}
              </div>
            </div>
            <p className="font-bold text-primaryYellow">Tiếng Việt</p>
            <div className="grid grid-cols-5 gap-4">
              <div className="col-span-2">
                <div>
                  <Input
                    label="Tiêu đề"
                    {...register(`agenda.[${index}].airdropVI`, {
                      ...(index !== 0 && {
                        required: 'This field is required',
                      }),
                    })}
                  />
                  <p className="mt-1 mb-7 text-xs text-red-400">
                    {errors?.agenda?.[index]?.airdropVI?.message &&
                      `* ${errors?.portfolio?.[index]?.airdropVI?.message || 'Invalid'}`}
                  </p>
                </div>
              </div>
              <div className="col-span-2">
                <div>
                  <Input label="Mô tả" {...register(`agenda.[${index}].speechVI`)} />
                </div>
              </div>
              <div className="flex items-center">
                {index !== 0 && (
                  <FiMinusCircle
                    className="hover-primary cursor-pointer"
                    size={30}
                    onClick={() => handleRemoveAgenda(index)}
                  />
                )}
              </div>
            </div>
          </div>
        ))}

        <Button size="lg" className="px-20" type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
          Xác nhận
        </Button>
      </form>
    </div>
  )
}

export default AgendaContent
