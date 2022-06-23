import React, { useState } from 'react'
import Breadcrum from 'components/Breadcrum/Breadcrum'
import Table from 'components/Table/Table'
import ActionCells from 'components/Table/TableCells/ActionCell'
import SimpleCell from 'components/Table/TableCells/SimpleCell'
import { FiPlus } from 'react-icons/fi'
import { useFetchAllAdvisories, useAllAdvisories } from 'store/advisory/hook'
import { useRouter } from 'next/router'
import ModalConfirm from 'components/Modal/ModalConfirm'
import { useDispatch } from 'react-redux'
import { fetchAllAdvisoriesAsync, setAllAdvisories } from 'store/advisory'
import advisoryApi from 'api/advisoryApi'
import { showToastError, showToastSuccess } from 'components/CustomToast/CustomToast'
import useI18n from 'hooks/use-i18n'
import Modal from '../../../components/Modal/Modal'
import ModalTitle from '../../../components/Modal/ModalTitle'
import CreateAndEditAdvisory from '../../../views/Advisory/CreateAndEditAdvisory'

const MODAL_INIT = {
  isOpen: false,
  children: '',
  title: '',
  data: {},
  onConfirm: () => {},
}

export default function Advisory() {
  const i18n = useI18n()
  const dispatch = useDispatch()
  const router = useRouter()
  useFetchAllAdvisories()
  const allAdvisories = useAllAdvisories()
  const [isBusy, setIsBusy] = useState(false)
  const [openEdit, setOpenEdit] = useState({
    open: false,
    advisory: undefined,
  })
  const [modal, setModal] = useState(MODAL_INIT)

  //   useEffect(() => {
  //     reset({
  //       url: video?.url,
  //     })
  //   }, [video, reset])

  const resetModal = () => {
    setModal(MODAL_INIT)
  }

  const breadcrum = [
    {
      text: 'Admin',
      link: '/admin',
    },
    {
      text: 'Advisory',
      active: true,
    },
  ]

  // ----------------
  // RESET DATA

  const getDataApi = async () => {
    try {
      dispatch(fetchAllAdvisoriesAsync())
    } catch (err) {
      console.log(err)
    }
  }

  // --------------
  // HANDLE EDIT

  const handleEdit = (advisory) => {
    setOpenEdit({
      open: true,
      advisory,
    })
  }

  // --------------
  // HANDLE DELETE

  const handleDelete = async (id) => {
    try {
      await advisoryApi.delete(id)
      await getDataApi()
      showToastSuccess('', 'Advisory đã được xóa')
    } catch (e) {
      showToastError('Xóa advisory thất bại')
    } finally {
      resetModal()
    }
  }

  const onClickDelete = (item) => {
    setModal({
      isOpen: true,
      title: 'Xóa advisory',
      children: (
        <>
          <p>Bạn có chắc chắn muốn xóa advisory</p>
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
      Header: '#',
      Cell: (data) => <SimpleCell className="text-center" data={data?.order} />,
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
      Header: 'Name',
      Cell: (data) => {
        const contentLanguageActive = data?.content?.find((item) => i18n.activeLocale === item.language)

        return <SimpleCell className="text-center" data={contentLanguageActive?.name} />
      },
    },
    {
      Header: 'Mô tả',
      Cell: (data) => {
        const contentLanguageActive = data?.content?.find((item) => i18n.activeLocale === item.language)

        return <SimpleCell className="whitespace-pre-line text-center" data={contentLanguageActive?.description} />
      },
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

  const handleChangeOrders = (list) => {
    dispatch(setAllAdvisories(list))
  }

  async function handleUpdateOrders(event) {
    setIsBusy(true)
    try {
      await advisoryApi.editOrders(
        allAdvisories
          .map((banner, i) => {
            if (i === event.oldIndex) {
              return { id: allAdvisories[event.newIndex]._id, order: allAdvisories[event.oldIndex].order }
            }

            if (i === event.newIndex) {
              return { id: allAdvisories[event.oldIndex]._id, order: allAdvisories[event.newIndex].order }
            }
          })
          .filter((_, i) => i === event.oldIndex || i === event.newIndex),
      )
    } catch (e) {
      setIsBusy(false)
    }
    setIsBusy(false)
  }

  const onCloseEdit = () => setOpenEdit({ open: false, advisory: undefined })

  return (
    <div>
      <Breadcrum data={breadcrum} />

      <div className="mt-8 rounded-lg bg-black-2 py-5">
        <div className="px-6 py-4">
          <button
            onClick={() => router.push('/admin/advisory/create')}
            className="flex items-center rounded-full bg-primary px-5 py-2 text-sm font-bold uppercase text-black1"
          >
            <FiPlus className="mr-2 text-lg" />
            <span>Create</span>
          </button>
        </div>
        <Table
          isLoading={allAdvisories === undefined}
          tableColumns={tableColumns}
          headCellsClassName="bg-primary text-black1 font-bold border border-black1"
          bodyCellsClassName="border-b border-black3"
          data={allAdvisories}
          isBusy={isBusy}
          onChangeSort={handleChangeOrders}
          onUpdateSort={handleUpdateOrders}
        />
      </div>
      {openEdit.open && (
        <Modal background="black3" size="lg" open={openEdit.open} onClose={onCloseEdit}>
          <ModalTitle onClose={onCloseEdit}>Chỉnh sửa bài đăng</ModalTitle>
          <div className="text-white">
            <CreateAndEditAdvisory advisory={openEdit.advisory} onClose={onCloseEdit} />
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
