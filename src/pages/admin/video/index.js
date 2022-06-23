import React, { useState, useEffect } from 'react'
import Breadcrum from 'components/Breadcrum/Breadcrum'
import ActionCells from 'components/Table/TableCells/ActionCell'
import SimpleCell from 'components/Table/TableCells/SimpleCell'
import { FiPlus } from 'react-icons/fi'
import { useFetchAllVideos, useAllVideos, useVideo } from 'store/video/hook'
import { useRouter } from 'next/router'
import videoApi from 'api/videoApi'
import ModalConfirm from 'components/Modal/ModalConfirm'
import { useDispatch } from 'react-redux'
import { fetchAllVideosAsync, setAllVideos, setVideo } from 'store/video'
import { showToastError, showToastSuccess } from 'components/CustomToast/CustomToast'
import ToggleChangeMainVideo from 'components/Toggle/ToggleChangeMainVideo'
import Slide from 'components/Slide/Slide'
import { Controller, useForm } from 'react-hook-form'
import Input from 'components/Input/Input'
import Button from 'components/Button/Button'
import Table from '../../../components/Table/Table'

const MODAL_INIT = {
  isOpen: false,
  children: '',
  title: '',
  data: {},
  onConfirm: () => {},
}

export default function Video() {
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm()
  const [isBusy, setIsBusy] = useState(false)

  const dispatch = useDispatch()
  const router = useRouter()
  useFetchAllVideos()
  const allVideos = useAllVideos()
  const video = useVideo()

  const [modal, setModal] = useState(MODAL_INIT)
  const [openSlide, setOpenSlide] = useState(false)

  useEffect(() => {
    reset({
      url: video?.url,
    })
  }, [video, reset])

  const resetModal = () => {
    setModal(MODAL_INIT)
  }

  const breadcrum = [
    {
      text: 'Admin',
      link: '/admin',
    },
    {
      text: 'Video',
      active: true,
    },
  ]

  // ----------------
  // RESET DATA

  const getDataApi = async () => {
    try {
      dispatch(fetchAllVideosAsync())
    } catch (err) {
      console.log(err)
    }
  }

  // --------------
  // HANDLE EDIT

  const handleEdit = (item) => {
    setOpenSlide(true)
    dispatch(setVideo(item))
  }

  const onSubmit = async (data) => {
    data.isMainVideo = video?.isMainVideo
    try {
      await videoApi.edit(video?._id, data)
      showToastSuccess('Thông báo', 'Video đã được cập nhật')
      await getDataApi()
    } catch (error) {
      if (error.response) {
        showToastError('Thông báo', 'Cập nhật video thất bại')
        setError('url', {
          message: error.response.data.errors?.[0].msg,
        })
      }
    }
  }

  // --------------
  // HANDLE DELETE

  const handleDelete = async (id) => {
    try {
      await videoApi.delete(id)
      await getDataApi()
      showToastSuccess('', 'Video đã được xóa')
    } catch (e) {
      showToastError('Xóa video thất bại')
    } finally {
      resetModal()
    }
  }

  const onClickDelete = (item) => {
    setModal({
      isOpen: true,
      title: 'Xóa video',
      children: (
        <>
          <p>Bạn có chắc chắn muốn xóa video</p>
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
      Header: 'Url',
      Cell: (data) => <SimpleCell className="text-center" data={data?.url} />,
    },
    {
      Header: 'Main Video',
      Cell: (data) => (
        <div className="flex justify-center">
          <ToggleChangeMainVideo toggle={data?.isMainVideo} item={data} />
        </div>
      ),
    },
    {
      Header: 'Status',
      Cell: (data) => <SimpleCell className="text-center" data={data?.status} />,
    },
    {
      Header: 'Action',
      Cell: (data) => {
        return (
          <div className="flex space-x-4">
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

  async function handleUpdateOrders(event) {
    setIsBusy(true)
    try {
      await videoApi.editOrders(
        allVideos
          .map((banner, i) => {
            if (i === event.oldIndex) {
              return { id: allVideos[event.newIndex]._id, order: allVideos[event.oldIndex].order }
            }

            if (i === event.newIndex) {
              return { id: allVideos[event.oldIndex]._id, order: allVideos[event.newIndex].order }
            }
          })
          .filter((_, i) => i === event.oldIndex || i === event.newIndex),
      )
    } catch (e) {
      setIsBusy(false)
    }
    setIsBusy(false)
  }

  const handleChangeOrders = async (videos) => {
    dispatch(setAllVideos(videos))
  }

  return (
    <div>
      <Breadcrum data={breadcrum} />

      <div className="mt-8 rounded-lg bg-black-2 py-5">
        <div className="px-6 py-4">
          <button
            onClick={() => router.push('/admin/video/create')}
            className="flex items-center rounded-full bg-primary px-5 py-2 text-sm font-bold uppercase text-black1"
          >
            <FiPlus className="mr-2 text-lg" />
            <span>Create</span>
          </button>
        </div>
        <Table
          isLoading={allVideos === undefined}
          tableColumns={tableColumns}
          headCellsClassName="bg-primary text-black1 font-bold border border-black1"
          bodyCellsClassName="border-b border-black3"
          data={allVideos}
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

      {video && (
        <Slide
          open={openSlide}
          onClose={() => {
            setOpenSlide(false)
          }}
        >
          <h1 className="mb-7 text-center text-3xl font-bold">Chỉnh sửa video</h1>
          <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
            <Controller
              control={control}
              rules={{
                required: 'Url không được để trống',
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
                  defaultValue={video?.url || ''}
                />
              )}
              name="url"
            />
            <p className="mt-1 mb-7 text-xs text-red-400">
              {errors?.url?.message && `* ${errors?.['url']?.message || 'Invalid'}`}
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
