import React from 'react'
import Modal from '../../../components/Modal/Modal'
import ModalClose from '../../../components/Modal/ModalClose'
import useI18n from '../../../hooks/use-i18n'

const ModalProjectDetail = ({ open, project, onClose }) => {
  const i18n = useI18n()

  if (!project) return <div />

  const contentLanguageActive = project?.content?.find((item) => i18n.activeLocale === item.language)

  return (
    <Modal open={open} onClose={onClose} background="primaryBLue">
      <ModalClose onClose={onClose} />
      <img
        className="mx-auto block max-h-[200px] w-full max-w-[200px] cursor-pointer"
        src={project.thumbnail.url}
        alt={project.thumbnail.filename}
      />
      <p className="mt-5 text-center">{contentLanguageActive?.description}</p>
    </Modal>
  )
}

export default ModalProjectDetail
