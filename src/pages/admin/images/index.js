import React, { useState, useEffect } from 'react'
import Breadcrum from 'components/Breadcrum/Breadcrum'
import ActionCells from 'components/Table/TableCells/ActionCell'
import { FiEdit, FiPlus } from 'react-icons/fi'
import { useRouter } from 'next/router'
import ModalConfirm from 'components/Modal/ModalConfirm'
import { useDispatch } from 'react-redux'
import { showToastError, showToastSuccess } from 'components/CustomToast/CustomToast'
import Slide from 'components/Slide/Slide'
import { useForm } from 'react-hook-form'
import Button from 'components/Button/Button'
import CustomUploadFile from 'components/CustomUploadImage/CustomUploadImage'
import { MdOutlineDragHandle } from 'react-icons/md'
import { useAllImages, useFetchAllImages, useImage } from '../../../store/images/hook'
import { fetchAllImagesAsync, setAllImages, setImage } from '../../../store/images'
import imagesProjectApi from '../../../api/imagesProjectApi'
import Table from '../../../components/Table/Table'

const MODAL_INIT = {
  isOpen: false,
  children: '',
  title: '',
  data: {},
  onConfirm: () => {},
}

export default function Images() {
  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm()
  const [isBusy, setIsBusy] = useState(false)

  const dispatch = useDispatch()
  const router = useRouter()
  useFetchAllImages()
  const allImages = useAllImages()

  const image = useImage()
  const [modal, setModal] = useState(MODAL_INIT)
  const [openSlide, setOpenSlide] = useState(true)
  const [img, setImg] = useState(null)
  const [showDragAndDrop, setShowDragAndDrop] = useState(false)

  useEffect(() => {
    reset({
      link: image?.link,
    })
  }, [image, reset])

  const resetModal = () => {
    setModal(MODAL_INIT)
  }

  const breadcrum = [
    {
      text: 'Admin',
      link: '/admin',
    },
    {
      text: "Event's Visual",
      active: true,
    },
  ]

  // ----------------
  // RESET DATA

  const getDataApi = async () => {
    try {
      dispatch(fetchAllImagesAsync())
    } catch (err) {
      console.log(err)
    }
  }

  // --------------
  // HANDLE EDIT

  const handleEdit = (item) => {
    setOpenSlide(true)
    dispatch(setImage(item))
  }

  // --------------
  // HANDLE DELETE

  const handleDelete = async (id) => {
    try {
      await imagesProjectApi.delete(id)
      await getDataApi()
      showToastSuccess('', 'Ảnh đã được xóa')
    } catch (e) {
      showToastError('Xóa ảnh thất bại')
    } finally {
      resetModal()
    }
  }

  const onClickDelete = (item) => {
    setModal({
      isOpen: true,
      title: 'Xóa ảnh',
      children: (
        <>
          <p>Bạn có chắc chắn muốn xóa ảnh </p>
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
    formData.append('data', JSON.stringify(data))
    if (img?.data?.name) {
      const thumbnail = [img?.data]
      formData.append('thumbnail', thumbnail[0])
    }

    try {
      await imagesProjectApi.edit(image?._id, formData)
      await getDataApi()
      setImg(null)
      showToastSuccess('', 'Ảnh đã được cập nhật')
    } catch (err) {
      console.log(err)
      showToastError('Cập nhật Ảnh thất bại')
    }
  }

  async function handleUpdateOrders(event) {
    setIsBusy(true)
    try {
      await imagesProjectApi.editOrders(
        allImages
          .map((image, i) => {
            if (i === event.oldIndex) {
              return { id: allImages[event.newIndex]._id, order: allImages[event.oldIndex].order }
            }

            if (i === event.newIndex) {
              return { id: allImages[event.oldIndex]._id, order: allImages[event.newIndex].order }
            }
          })
          .filter((_, i) => i === event.oldIndex || i === event.newIndex),
      )
    } catch (e) {
      setIsBusy(false)
    }
    setIsBusy(false)
  }

  const handleChangeOrders = async (images) => {
    dispatch(setAllImages(images))
  }

  return (
    <div>
      <Breadcrum data={breadcrum} />

      <div className="mt-8 rounded-lg bg-black-2 py-5">
        <div className="px-6 py-4">
          <button
            onClick={() => router.push('/admin/images/create')}
            className="flex items-center rounded-full bg-primary px-5 py-2 text-sm font-bold uppercase text-black1"
          >
            <FiPlus className="mr-2 text-lg" />
            <span>Create</span>
          </button>
        </div>
        <Table
          isLoading={allImages === undefined}
          tableColumns={tableColumns}
          headCellsClassName="bg-primary text-black1 font-bold border border-black1"
          bodyCellsClassName="border-b border-black3"
          data={allImages}
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

      {image && (
        <Slide
          open={openSlide}
          onClose={() => {
            setOpenSlide(false)
            setShowDragAndDrop(false)
          }}
        >
          <h1 className="mb-7 text-center text-3xl font-bold">Chỉnh sửa ảnh</h1>
          <form autoComplete="off" onSubmit={handleSubmit(onHandleUpdate)} className="flex flex-col items-center">
            <div className="relative mb-7 w-2/3">
              <img
                onClick={(e) => {
                  e.preventDefault()
                  setShowDragAndDrop(true)
                }}
                className="cursor-pointer"
                src={image?.thumbnail?.url}
                alt="image"
                width="100%"
                height="100%"
              />
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
                      setImg(file)
                    }}
                  />
                </div>
              )}
            </div>
            <p className="mt-1 mb-7 text-red-400">Kích thước ảnh: 1050x535</p>

            <Button size="lg" className="w-full" type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
              Cập nhật
            </Button>
          </form>
        </Slide>
      )}
    </div>
  )
}
