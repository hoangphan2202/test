import React, { useState, useEffect } from 'react'
import Breadcrum from 'components/Breadcrum/Breadcrum'
import ActionCells from 'components/Table/TableCells/ActionCell'
import { FiEdit, FiPlus } from 'react-icons/fi'
import { useRouter } from 'next/router'
import partnersApi from 'api/partnersApi'
import ModalConfirm from 'components/Modal/ModalConfirm'
import { useDispatch } from 'react-redux'
import ToggleChangeOpenInNewTab from 'components/Toggle/ToggleChangeOpenInNewTab'
import { showToastError, showToastSuccess } from 'components/CustomToast/CustomToast'
import Slide from 'components/Slide/Slide'
import { Controller, useForm } from 'react-hook-form'
import Button from 'components/Button/Button'
import Input from 'components/Input/Input'
import CustomUploadFile from 'components/CustomUploadImage/CustomUploadImage'
import { MdOutlineDragHandle } from 'react-icons/md'
import { useAllPartners, useFetchAllPartners, usePartner } from '../../../store/partners/hook'
import { fetchAllPartnersAsync, setAllPartners, setPartner } from '../../../store/partners'
import Table from '../../../components/Table/Table'

const MODAL_INIT = {
  isOpen: false,
  children: '',
  title: '',
  data: {},
  onConfirm: () => {},
}

export default function Partners() {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm()
  const [isBusy, setIsBusy] = useState(false)

  const dispatch = useDispatch()
  const router = useRouter()
  useFetchAllPartners()
  const allPartners = useAllPartners()

  const partner = usePartner()
  const [modal, setModal] = useState(MODAL_INIT)
  const [openSlide, setOpenSlide] = useState(true)
  const [image, setImage] = useState(null)
  const [showDragAndDrop, setShowDragAndDrop] = useState(false)

  useEffect(() => {
    reset({
      link: partner?.link,
    })
  }, [partner, reset])

  const resetModal = () => {
    setModal(MODAL_INIT)
  }

  const breadcrum = [
    {
      text: 'Admin',
      link: '/admin',
    },
    {
      text: 'Media Sponsors',
      active: true,
    },
  ]

  // ----------------
  // RESET DATA

  const getDataApi = async () => {
    try {
      dispatch(fetchAllPartnersAsync())
    } catch (err) {
      console.log(err)
    }
  }

  // --------------
  // HANDLE EDIT

  const handleEdit = (item) => {
    setOpenSlide(true)
    dispatch(setPartner(item))
  }

  // --------------
  // HANDLE DELETE

  const handleDelete = async (id) => {
    try {
      await partnersApi.delete(id)
      await getDataApi()
      showToastSuccess('', 'Xóa thành công')
    } catch (e) {
      console.log(e)
      showToastError('Xóa thất bại')
    } finally {
      resetModal()
    }
  }

  const onClickDelete = (item) => {
    setModal({
      isOpen: true,
      title: 'Xóa',
      children: (
        <>
          <p>Bạn có chắc chắn muốn xóa </p>
        </>
      ),
      onConfirm: () => {
        handleDelete(item?._id)
      },
    })
  }

  // ---------------------
  // TABLE COLUMNS

  const tableColumns = [
    {
      Header: '',
      Cell: () => (
        <div className="flex items-center justify-center">
          <MdOutlineDragHandle size={24} />
        </div>
      ),
    },
    {
      Header: 'Thumbnail',
      Cell: (data) => (
        <div className="flex items-center justify-center">
          <img src={data?.thumbnail?.url} className="h-12 w-20 object-cover" alt="thumbnail" />
        </div>
      ),
    },
    {
      Header: 'Link',
      Cell: (data) => <a href={data?.link}>{data?.link}</a>,
    },
    {
      Header: 'Open in new tab',
      Cell: (data) => (
        <div className="flex justify-center">
          <ToggleChangeOpenInNewTab toggle={data?.openInNewTab} item={data} api={partnersApi} />
        </div>
      ),
    },
    {
      Header: 'Action',
      Cell: (data) => {
        return (
          <div className="flex justify-center space-x-4">
            <ActionCells
              onEdit={() => {
                handleEdit(data)
              }}
              onDelete={() => {
                onClickDelete(data)
              }}
            />
          </div>
        )
      },
    },
  ]

  // ---------------
  // HANDLE EDIT

  const onHandleUpdate = async (data) => {
    const formData = new FormData()
    if (data.link) {
      formData.append('data', JSON.stringify(data))
    }
    if (image?.data?.name) {
      const thumbnail = [image?.data]
      formData.append('thumbnail', thumbnail[0])
    }

    try {
      await partnersApi.edit(partner?._id, formData)
      await getDataApi()
      setImage(null)
      showToastSuccess('', 'Cập nhật thành công')
    } catch (err) {
      showToastError('Cập nhật thất bại')
    }
  }

  async function handleUpdateOrders(event) {
    setIsBusy(true)
    try {
      await partnersApi.editOrders(
        allPartners
          .map((partner, i) => {
            if (i === event.oldIndex) {
              return { id: allPartners[event.newIndex]._id, order: allPartners[event.oldIndex].order }
            }

            if (i === event.newIndex) {
              return { id: allPartners[event.oldIndex]._id, order: allPartners[event.newIndex].order }
            }
          })
          .filter((_, i) => i === event.oldIndex || i === event.newIndex),
      )
    } catch (e) {
      setIsBusy(false)
    }
    setIsBusy(false)
  }

  const handleChangeOrders = async (partners) => {
    dispatch(setAllPartners(partners))
  }

  return (
    <div>
      <Breadcrum data={breadcrum} />

      <div className="mt-8 rounded-lg bg-black-2 py-5">
        <div className="px-6 py-4">
          <button
            onClick={() => router.push('/admin/partners/create')}
            className="flex items-center rounded-full bg-primary px-5 py-2 text-sm font-bold uppercase text-black1"
          >
            <FiPlus className="mr-2 text-lg" />
            <span>Create</span>
          </button>
        </div>
        <Table
          isLoading={allPartners === undefined}
          tableColumns={tableColumns}
          headCellsClassName="bg-primary text-black1 font-bold border border-black1"
          bodyCellsClassName="border-b border-black3"
          data={allPartners}
          isBusy={isBusy}
          onChangeSort={handleChangeOrders}
          onUpdateSort={handleUpdateOrders}
        />
      </div>

      <ModalConfirm
        open={modal?.isOpen}
        onClose={resetModal}
        onConfirm={modal?.onConfirm}
        onCancel={resetModal}
        title={modal?.title}
      >
        {modal.children}
      </ModalConfirm>

      {partner && (
        <Slide
          open={openSlide}
          onClose={() => {
            setOpenSlide(false)
            setShowDragAndDrop(false)
          }}
        >
          <h1 className="mb-7 text-center text-3xl font-bold">Chỉnh sửa</h1>
          <form autoComplete="off" onSubmit={handleSubmit(onHandleUpdate)} className="flex flex-col items-center">
            <div className="relative mb-7 w-2/3">
              <img src={partner?.thumbnail?.url} alt="banner" width="100%" height="100%" />
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setShowDragAndDrop(true)
                }}
                className="absolute top-3 right-3 z-2 rounded-full bg-primary py-1 px-5 text-white"
              >
                <FiEdit />
              </button>
              {showDragAndDrop && (
                <div className="absolute bottom-0 left-0 h-full w-full">
                  <CustomUploadFile
                    allowedFileTypes={['image/*', '.jpg', '.jpeg', '.png', '.gif']}
                    showPreview
                    maxSize={4}
                    onChange={(file) => {
                      setImage(file)
                    }}
                  />
                </div>
              )}
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
              defaultValue={partner?.link || ''}
            />
            <p className="mt-1 mb-7 text-xs text-red-400">
              {errors?.link?.message && `* ${errors?.['link']?.message || 'Invalid'}`}
            </p>

            <Button size="lg" className="w-full" type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
              Cập nhật
            </Button>
          </form>
        </Slide>
      )}
    </div>
  )
}
