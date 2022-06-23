import React, { useState } from 'react'
import Breadcrum from 'components/Breadcrum/Breadcrum'
import ActionCells from 'components/Table/TableCells/ActionCell'
import SimpleCell from 'components/Table/TableCells/SimpleCell'
import { FiPlus } from 'react-icons/fi'
import { useFetchAllPosts, useAllPosts } from 'store/post/hook'
import { useRouter } from 'next/router'
import postApi from 'api/postApi'
import ModalConfirm from 'components/Modal/ModalConfirm'
import { useDispatch } from 'react-redux'
import { fetchAllPostsAsync, setAllPosts } from 'store/post'
import { showToastError, showToastSuccess } from 'components/CustomToast/CustomToast'
import { MdOutlineDragHandle } from 'react-icons/md'
import Table from '../../../components/Table/Table'
import Modal from '../../../components/Modal/Modal'
import ModalTitle from '../../../components/Modal/ModalTitle'
import CreateAndEditPost from '../../../views/Post/CreateAndEditPost'

const MODAL_INIT = {
  isOpen: false,
  children: '',
  title: '',
  data: {},
  onConfirm: () => {},
}

export default function Post() {
  const dispatch = useDispatch()
  const router = useRouter()
  useFetchAllPosts()
  const allPosts = useAllPosts()
  const [isBusy, setIsBusy] = useState(false)
  const [openEdit, setOpenEdit] = useState({
    open: false,
    post: undefined,
  })

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
      text: 'Post',
      active: true,
    },
  ]

  // ----------------
  // RESET DATA

  const getDataApi = async () => {
    try {
      dispatch(fetchAllPostsAsync())
    } catch (err) {
      console.log(err)
    }
  }

  // HANDLE DELETE

  const handleDelete = async (id) => {
    try {
      await postApi.delete(id)
      await getDataApi()
      showToastSuccess('', 'Bài đăng đã được xóa')
    } catch (e) {
      showToastError('Xóa bài đăng thất bại')
    } finally {
      resetModal()
    }
  }

  const handleEdit = (post) => {
    setOpenEdit({
      open: true,
      post,
    })
  }

  const onClickDelete = (item) => {
    setModal({
      isOpen: true,
      title: 'Xóa bài bài đăng',
      children: (
        <>
          <p>Bạn có chắc chắn muốn xóa bài bài đăng</p>
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
      Header: 'Slug',
      Cell: (data) => <SimpleCell className="text-center" data={data?.slug} />,
    },
    {
      Header: 'Status',
      Cell: (data) => <SimpleCell className="text-center" data={data?.status} />,
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

  const handleChangeOrders = async (listPosts) => {
    dispatch(setAllPosts(listPosts))
  }

  async function handleUpdateOrders(event) {
    setIsBusy(true)
    try {
      await postApi.editOrders(
        allPosts
          .map((banner, i) => {
            if (i === event.oldIndex) {
              return { id: allPosts[event.newIndex]._id, order: allPosts[event.oldIndex].order }
            }

            if (i === event.newIndex) {
              return { id: allPosts[event.oldIndex]._id, order: allPosts[event.newIndex].order }
            }
          })
          .filter((_, i) => i === event.oldIndex || i === event.newIndex),
      )
    } catch (e) {
      setIsBusy(false)
    }
    setIsBusy(false)
  }

  const onCloseEdit = () => setOpenEdit({ open: false, post: undefined })

  return (
    <div>
      <Breadcrum data={breadcrum} />

      <div className="mt-8 rounded-lg bg-black-2 py-5">
        <div className="px-6 py-4">
          <button
            onClick={() => router.push('/admin/post/create')}
            className="flex items-center rounded-full bg-primary px-5 py-2 text-sm font-bold uppercase text-black1"
          >
            <FiPlus className="mr-2 text-lg" />
            <span>Create</span>
          </button>
        </div>
        <Table
          isLoading={allPosts === undefined}
          tableColumns={tableColumns}
          headCellsClassName="bg-primary text-black1 font-bold border border-black1"
          bodyCellsClassName="border-b border-black3"
          data={allPosts}
          isBusy={isBusy}
          onChangeSort={handleChangeOrders}
          onUpdateSort={handleUpdateOrders}
        />
      </div>
      {openEdit.open && (
        <Modal background="black3" size="lg" open={openEdit.open} onClose={onCloseEdit}>
          <ModalTitle onClose={onCloseEdit}>Chỉnh sửa bài đăng</ModalTitle>
          <div className="text-white">
            <CreateAndEditPost post={openEdit.post} onClose={onCloseEdit} />
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
