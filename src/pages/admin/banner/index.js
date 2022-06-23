import React, { useState } from 'react'
import Breadcrum from 'components/Breadcrum/Breadcrum'
import ActionCells from 'components/Table/TableCells/ActionCell'
import { FiPlus } from 'react-icons/fi'
import { useFetchAllBanners, useAllBanners } from 'store/banner/hook'
import bannerApi from 'api/bannerApi'
import ModalConfirm from 'components/Modal/ModalConfirm'
import { useDispatch } from 'react-redux'
import { fetchAllBannerAsync, setAllBanner } from 'store/banner'
import { showToastError, showToastSuccess } from 'components/CustomToast/CustomToast'
import { MdOutlineDragHandle } from 'react-icons/md'
import Table from '../../../components/Table/Table'
import Modal from '../../../components/Modal/Modal'
import ModalTitle from '../../../components/Modal/ModalTitle'
import CreateAndEditBanner from '../../../views/Banner/CreateAndEditBanner'

const MODAL_INIT = {
  isOpen: false,
  children: '',
  title: '',
  data: {},
  onConfirm: () => {},
}

export default function Banner() {
  const [isBusy, setIsBusy] = useState(false)

  const [openEdit, setOpenEdit] = useState({
    open: false,
    banner: undefined,
  })
  const [openCreate, setOpenCreate] = useState(false)

  const dispatch = useDispatch()
  useFetchAllBanners()
  const allBanners = useAllBanners()

  const [modal, setModal] = useState(MODAL_INIT)

  const resetModal = () => {
    setModal(MODAL_INIT)
  }

  const breadcrum = [
    {
      text: 'Admin',
      link: '/admin',
    },
    {
      text: 'Banner',
      active: true,
    },
  ]

  // ----------------
  // RESET DATA

  const getDataApi = async () => {
    try {
      dispatch(fetchAllBannerAsync())
    } catch (err) {
      console.log(err)
    }
  }

  // --------------
  // HANDLE EDIT

  const handleEdit = (banner) => {
    setOpenEdit({
      open: true,
      banner,
    })
  }

  // --------------
  // HANDLE DELETE

  const handleDelete = async (id) => {
    try {
      await bannerApi.delete(id)
      await getDataApi()
      showToastSuccess('Banner đã được xóa')
    } catch (e) {
      showToastError('Xóa banner thất bại')
    } finally {
      resetModal()
    }
  }

  const onClickDelete = (item) => {
    setModal({
      isOpen: true,
      title: 'Xóa banner',
      children: (
        <>
          <p>Bạn có chắc chắn muốn xóa banner </p>
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

  async function handleUpdateOrders(event) {
    setIsBusy(true)
    try {
      await bannerApi.editOrders(
        allBanners
          .map((banner, i) => {
            if (i === event.oldIndex) {
              return { id: allBanners[event.newIndex]._id, order: allBanners[event.oldIndex].order }
            }

            if (i === event.newIndex) {
              return { id: allBanners[event.oldIndex]._id, order: allBanners[event.newIndex].order }
            }
          })
          .filter((_, i) => i === event.oldIndex || i === event.newIndex),
      )
    } catch (e) {
      setIsBusy(false)
    }
    setIsBusy(false)
  }

  const handleChangeOrders = (banners) => {
    dispatch(setAllBanner(banners))
  }

  const onCloseEdit = () => setOpenEdit({ open: false, banner: undefined })
  const onCloseCreate = () => setOpenCreate(!openCreate)

  return (
    <div>
      <Breadcrum data={breadcrum} />

      <div className="mt-8 rounded-lg bg-black-2 py-5">
        <div className="px-6 py-4">
          <button
            onClick={() => setOpenCreate(true)}
            className="flex items-center rounded-full bg-primary px-5 py-2 text-sm font-bold uppercase text-black1"
          >
            <FiPlus className="mr-2 text-lg" />
            <span>Create</span>
          </button>
        </div>
        <Table
          isLoading={allBanners === undefined}
          tableColumns={tableColumns}
          headCellsClassName="bg-primary text-black1 font-bold border border-black1"
          bodyCellsClassName="border-b border-black3"
          data={allBanners}
          isBusy={isBusy}
          onChangeSort={handleChangeOrders}
          onUpdateSort={handleUpdateOrders}
        />
      </div>

      {openEdit.open && (
        <Modal background="black3" size="lg" open={openEdit.open} onClose={onCloseEdit}>
          <ModalTitle onClose={onCloseEdit}>Chỉnh sửa bài đăng</ModalTitle>
          <div className="text-white">
            <CreateAndEditBanner banner={openEdit.banner} onClose={onCloseEdit} />
          </div>
        </Modal>
      )}
      {openCreate && (
        <Modal background="black3" size="lg" open={openCreate} onClose={onCloseCreate}>
          <ModalTitle onClose={onCloseCreate}>Tạo bài đăng</ModalTitle>
          <div className="text-white">
            <CreateAndEditBanner onClose={onCloseCreate} />
          </div>
        </Modal>
      )}

      <ModalConfirm
        open={modal?.isOpen}
        onClose={resetModal}
        onConfirm={modal?.onConfirm}
        onCancel={resetModal}
        title={modal?.title}
      >
        {modal.children}
      </ModalConfirm>
    </div>
  )
}
