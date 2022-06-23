import React from 'react'
import { MdArrowRight, MdArrowLeft } from 'react-icons/md'
import classNames from 'classnames'

export const DotButton = ({ selected, onClick }) => (
  <button className={`embla__dot ${selected ? 'is-selected' : ''}`} type="button" onClick={onClick} />
)

export const PrevButton = ({ enabled, onClick }) => (
  <button
    className={classNames('embla__button embla__button--prev', !enabled && 'hidden')}
    onClick={onClick}
    disabled={!enabled}
  >
    <div className="relative">
      <div>
        <img
          className="max-h-[150px] sm:max-h-[220px] sm:w-full sm:max-w-full"
          alt="bg-arrow-left"
          src="/images/layout/bg-arrow-left.png"
        />
        <MdArrowLeft
          size={32}
          className="absolute top-1/2 left-1/2 right-0 -translate-x-1/2 -translate-y-1/2 transform"
        />
      </div>
    </div>
  </button>
)

export const NextButton = ({ enabled, onClick }) => (
  <button
    className={classNames('embla__button embla__button--next', !enabled && 'hidden')}
    onClick={onClick}
    disabled={!enabled}
  >
    <div className="relative">
      <img
        className="max-h-[150px] sm:max-h-[220px] sm:w-full sm:max-w-full"
        alt="bg-arrow-right"
        src="/images/layout/bg-arrow-right.png"
      />
      <MdArrowRight
        size={32}
        className="absolute top-1/2 left-1/2 right-0 -translate-x-1/2 -translate-y-1/2 transform"
      />
    </div>
  </button>
)
