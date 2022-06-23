import { Editor } from '@tinymce/tinymce-react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Controller, useFormContext } from 'react-hook-form'
import { API_BASE_URL, API_TINY } from '../../config'
import { ADMIN_TOKEN } from '../../utils/storage'
// import { API_BASE_URL, API_TINY } from "../../config";
// import { ADMIN_TOKEN } from "../../utils/storage";

const example_image_upload_handler = (blobInfo, progress) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.withCredentials = false
    xhr.open('POST', `${API_BASE_URL}/posts/upload`)
    const token = ADMIN_TOKEN.get()

    xhr.setRequestHeader('Authorization', token)

    xhr.upload.onprogress = (e) => {
      progress((e.loaded / e.total) * 100)
    }

    xhr.onload = () => {
      if (xhr.status === 403) {
        reject({ message: 'HTTP Error: ' + xhr.status, remove: true })
        return
      }

      if (xhr.status < 200 || xhr.status >= 300) {
        reject('HTTP Error: ' + xhr.status)
        return
      }

      const json = JSON.parse(xhr.responseText)

      if (!json || typeof json.payload.url != 'string') {
        reject('Invalid JSON: ' + xhr.responseText)
        return
      }

      resolve(json.payload.url)
    }

    xhr.onerror = () => {
      reject('Image upload failed due to a XHR Transport error. Code: ' + xhr.status)
    }

    const formData = new FormData()
    formData.append('image', blobInfo.blob(), blobInfo.filename())

    xhr.send(formData)
  })

const InputEditor = ({ item }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <div className={item.className}>
      {item.label && (
        <label htmlFor={item?.id}>
          <p className="mb-2">{item.label}</p>
        </label>
      )}
      <div className={item.className}>
        <Controller
          control={control}
          rules={item.rules}
          render={({ field: { onChange, value } }) => (
            <div className={classNames('border', errors?.[item.name]?.message ? 'border-red-400' : 'border-black-1')}>
              <Editor
                apiKey={API_TINY}
                value={value}
                init={{
                  height: 500,
                  menubar: false,
                  directionality: 'ltr',
                  skin: 'oxide-dark',
                  content_css: 'dark',
                  plugins: [
                    'advlist',
                    'autolink',
                    'lists',
                    'link',
                    'image',
                    'media ',
                    'charmap',
                    'preview',
                    'anchor',
                    'searchreplace',
                    'visualblocks',
                    'code',
                    'fullscreen',
                    'insertdatetime',
                    'media',
                    'table',
                    'code',
                    'help',
                    'wordcount',
                  ],
                  toolbar:
                    'undo redo | blocks' +
                    'bold italic forecolor backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    '|link image|' +
                    'removeformat | help',
                  extended_valid_elements: 'iframe[src|frameborder|style|scrolling|class|width|height|name|align]',
                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                  automatic_uploads: true,
                  images_reuse_filename: true,
                  convert_urls: false,
                  images_upload_handler: example_image_upload_handler,
                }}
                onEditorChange={onChange}
              />
            </div>
          )}
          name={item.name}
        />
      </div>
    </div>
  )
}

InputEditor.propTypes = {
  item: PropTypes.any.isRequired,
}

export default InputEditor
