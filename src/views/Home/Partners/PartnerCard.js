import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { useMediaQuery } from 'react-responsive'

const PartnerCard = ({ partner }) => {
  const [addClass, setAddClass] = useState(false)
  const isSM = useMediaQuery({
    query: '(min-width: 640px)',
  })

  useEffect(() => {
    const img = document.getElementById(partner._id)
    const height = img.clientHeight

    if (height > 90 && !isSM) {
      setAddClass(true)
    } else {
      setAddClass(false)
    }
  }, [isSM, partner])

  return (
    <img
      id={partner._id}
      onClick={() => {
        if (partner?.link) {
          window.open(partner.link, partner.openInNewTab ? '_blank' : '_self')
        }
      }}
      className={classNames(
        addClass && '!max-h-[50px]',
        'mx-3 block max-h-[200px] max-w-[100px] object-cover sm:mx-10 sm:my-5 sm:max-w-[200px] sm:max-w-xs',
        partner?.link && 'cursor-pointer',
      )}
      src={partner.thumbnail.url}
      alt={partner.thumbnail.filename}
    />
  )
}

export default PartnerCard
