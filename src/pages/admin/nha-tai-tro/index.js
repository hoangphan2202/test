import React, { useState } from 'react'
import Breadcrum from 'components/Breadcrum/Breadcrum'
import ActionCells from 'components/Table/TableCells/ActionCell'
import { FiPlus } from 'react-icons/fi'
import { useRouter } from 'next/router'
import ModalConfirm from 'components/Modal/ModalConfirm'
import { useDispatch } from 'react-redux'
import ToggleChangeOpenInNewTab from 'components/Toggle/ToggleChangeOpenInNewTab'
import { showToastError, showToastSuccess } from 'components/CustomToast/CustomToast'
import { MdOutlineDragHandle } from 'react-icons/md'
import { useAllSponsors, useFetchAllSponsors } from '../../../store/sponsors/hook'
import { fetchAllSponsorsAsync, setAllSponsors } from '../../../store/sponsors'
import sponsorsApi from '../../../api/sponsorsApi'
import Table from '../../../components/Table/Table'
import Modal from '../../../components/Modal/Modal'
import ModalTitle from '../../../components/Modal/ModalTitle'
import CreateAndEditSponsor from '../../../views/Sponsors/CreateAndEditSponsor'
import SimpleCell from '../../../components/Table/TableCells/SimpleCell'

const MODAL_INIT = {
  isOpen: false,
  children: '',
  title: '',
  data: {},
  onConfirm: () => {},
}

export default function Sponsors() {
  const [isBusy, setIsBusy] = useState(false)
  const [openEdit, setOpenEdit] = useState({
    open: false,
    sponsor: undefined,
  })
  const dispatch = useDispatch()
  const router = useRouter()
  useFetchAllSponsors()
  const allSponsors = useAllSponsors()

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
      text: 'Sponsors',
      active: true,
    },
  ]

  // ----------------
  // RESET DATA

  const getDataApi = async () => {
    try {
      dispatch(fetchAllSponsorsAsync())
    } catch (err) {
      console.log(err)
    }
  }

  // --------------
  // HANDLE EDIT

  const handleEdit = (sponsor) => {
    setOpenEdit({
      open: true,
      sponsor,
    })
  }

  // --------------
  // HANDLE DELETE

  const handleDelete = async (id) => {
    try {
      await sponsorsApi.delete(id)
      await getDataApi()
      showToastSuccess('', 'Nhà tài trợ đã được xóa')
    } catch (e) {
      console.log(e)
      showToastError('Xóa nhà tài trợ thất bại')
    } finally {
      resetModal()
    }
  }

  const onClickDelete = (item) => {
    setModal({
      isOpen: true,
      title: 'Xóa nhà tài trợ',
      children: (
        <>
          <p>Bạn có chắc chắn muốn xóa nhà tài trợ </p>
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
      Header: 'Name',
      Cell: (data) => <SimpleCell data={data?.name} />,
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
          <ToggleChangeOpenInNewTab toggle={data?.openInNewTab} item={data} api={sponsorsApi} />
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

  async function handleUpdateOrders(event) {
    setIsBusy(true)
    try {
      await sponsorsApi.editOrders(
        allSponsors
          .map((sponsor, i) => {
            if (i === event.oldIndex) {
              return { id: allSponsors[event.newIndex]._id, order: allSponsors[event.oldIndex].order }
            }

            if (i === event.newIndex) {
              return { id: allSponsors[event.oldIndex]._id, order: allSponsors[event.newIndex].order }
            }
          })
          .filter((_, i) => i === event.oldIndex || i === event.newIndex),
      )
    } catch (e) {
      setIsBusy(false)
    }
    setIsBusy(false)
  }

  const handleChangeOrders = async (sponsors) => {
    dispatch(setAllSponsors(sponsors))
  }

  const onCloseEdit = () => setOpenEdit({ open: false, sponsor: undefined })

  return (
    <div>
      <Breadcrum data={breadcrum} />

      <div className="mt-8 rounded-lg bg-black-2 py-5">
        <div className="px-6 py-4">
          <button
            onClick={() => router.push('/admin/nha-tai-tro/create')}
            className="flex items-center rounded-full bg-primary px-5 py-2 text-sm font-bold uppercase text-black1"
          >
            <FiPlus className="mr-2 text-lg" />
            <span>Create</span>
          </button>
        </div>
        <Table
          isLoading={allSponsors === undefined}
          tableColumns={tableColumns}
          headCellsClassName="bg-primary text-black1 font-bold border border-black1"
          bodyCellsClassName="border-b border-black3"
          data={allSponsors}
          isBusy={isBusy}
          onChangeSort={handleChangeOrders}
          onUpdateSort={handleUpdateOrders}
        />
      </div>
      {openEdit.open && (
        <Modal background="black3" size="lg" open={openEdit.open} onClose={onCloseEdit}>
          <ModalTitle onClose={onCloseEdit}>Chỉnh sửa nhà tài trợ</ModalTitle>
          <div className="text-white">
            <CreateAndEditSponsor sponsor={openEdit.sponsor} onClose={onCloseEdit} />
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
