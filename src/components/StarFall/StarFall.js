import React from 'react'
import styles from '../../styles/star.module.scss'
import classNames from 'classnames'

const starFall = [
  { top: 'top-0 ', left: '-left-1/4' },
  { top: ' top-36', left: 'left-36' },
  { top: 'top-1/4  ', left: 'left-1/4' },
  { top: 'top-0 ', left: '-left-1/4' },
  { top: 'top-0 ', left: '-left-2/3 ' },
  { top: 'top-2/4 ', left: '-left-1/4' },
  { top: 'top-0 ', left: '-left-1/2' },
]

const StarFall = () => {
  return (
    <div className="pointer-events-none fixed top-0 left-0 z-0 h-full w-full overflow-hidden">
      <div
        className={classNames('absolute top-0 left-0 z-0 h-full w-full', styles.starLarge)}
        style={{
          backgroundImage: `url(/images/layout/s1.png)`,
          backgroundSize: 'contain',
        }}
      />
      <div
        className={classNames('absolute top-0 left-0 z-0 h-full w-full', styles.starMedium)}
        style={{
          backgroundImage: `url(/images/layout/s2.png)`,
          backgroundSize: 'contain',
        }}
      />
      <div
        className={classNames('absolute top-0 left-0 z-0 h-full w-full', styles.starSmall)}
        style={{
          backgroundImage: `url(/images/layout/s3.png)`,
          backgroundSize: 'contain',
        }}
      />
      {starFall.map((item, index) => (
        <div
          key={`starfall-${index}`}
          className={classNames(`absolute ${item.top} ${item.left} pointer-events-none`, styles.starFall)}
        >
          <img alt="star" src="/images/layout/starfall.png" className="h-20 w-auto" />
        </div>
      ))}
    </div>
  )
}

export default StarFall
