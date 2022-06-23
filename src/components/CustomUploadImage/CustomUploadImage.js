import { useEffect, useState } from 'react'
import Uppy from '@uppy/core'
import thumbnailGenerator from '@uppy/thumbnail-generator'
import { DragDrop } from '@uppy/react'
import PropsTypes from 'prop-types'
import '@uppy/core/dist/style.css'
import '@uppy/drag-drop/dist/style.css'
import { showToastError } from 'components/CustomToast/CustomToast'
import classNames from 'classnames'

const CustomUploadFile = (props) => {
  const { className, file, allowedFileTypes, onChange, showPreview, maxSize, allowMultipleUploads, maxNumberOfFiles } =
    props
  const [img, setImg] = useState(null)

  useEffect(() => {
    if (file) {
      setImg(file)
    }
  }, [])

  const uppy = new Uppy({
    meta: { type: 'avatar' },
    restrictions: {
      maxNumberOfFiles: maxNumberOfFiles || 1,
      allowedFileTypes: allowedFileTypes || null,
    },
    autoProceed: true,
    allowMultipleUploads: allowMultipleUploads,
  })

  uppy.use(thumbnailGenerator)

  uppy.on('file-added', (file) => {
    if (!allowMultipleUploads) {
      if (
        !file?.data?.name?.match(
          /\.(ppt|pptx|doc|docx|xls|xlsx|pdf|gif|jpg|jpeg|png|zip|mp4|webm|ogg|ogv|avi|mpeg|mpg|mov|wmv|3gp|flv|mp3|aac|ogg|wav|mpeg|webm|wave|wma|ra|aif|aiff)$/,
        )
      ) {
        showToastError('', 'Định dạng file không hợp lệ')
        uppy.reset()
        return
      }
      if (maxSize && file?.data?.size / (1024 * 1024) > maxSize) {
        showToastError('', `Ảnh vượt quá giới hạn ${maxSize}MB.`)
        uppy.reset()
        return
      }
      onChange(file)
    }
  })

  uppy.on('files-added', (files) => {
    if (allowMultipleUploads) {
      if (maxSize) {
        files?.map((file) => {
          if (maxSize && file?.data?.size / (1024 * 1024) > maxSize) {
            showToastError('', `Ảnh vượt quá giới hạn ${maxSize}MB.`)
          }
        })
        files = files.filter((file) => file?.data?.size / (1024 * 1024) <= maxSize)
      }
      onChange(files)
    }
  })

  uppy.on('error', (error) => {
    console.error(error.stack)
  })

  uppy.on('thumbnail:generated', (file, preview) => {
    if (maxSize && file?.data?.size / (1024 * 1024) > maxSize) {
      return
    }
    setImg(preview)
  })

  return (
    <div className={classNames('relative h-full w-full overflow-hidden', className)} id="inputDnD">
      <div className="absolute top-0 left-0 z-1 h-full w-full">
        <DragDrop uppy={uppy} width="100%" height="100%" />
      </div>
      {img !== null && showPreview ? <img className="h-full w-full object-cover" src={img} alt="banner" /> : null}
    </div>
  )
}

CustomUploadFile.propTypes = {
  showPreview: PropsTypes.bool,
  allowedFileTypes: PropsTypes.array,
  onChange: PropsTypes.func,
  maxSize: PropsTypes.number,
  maxNumberOfFiles: PropsTypes.number,
}

export default CustomUploadFile
