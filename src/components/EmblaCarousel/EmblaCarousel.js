import React, { useState, useEffect, useCallback } from 'react'
import { DotButton, PrevButton, NextButton } from './EmblaCarouselButtons'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

const options = { delay: 7000 } // Options
const autoplayRoot = (emblaRoot) => emblaRoot.parentElement // Root node
const autoplay = Autoplay(options, autoplayRoot)

const EmblaCarousel = ({ slides, showDots = true }) => {
  const [viewportRef, embla] = useEmblaCarousel({ skipSnaps: true, loop: true }, [autoplay])
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState([])

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla])
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla])
  const scrollTo = useCallback((index) => embla && embla.scrollTo(index), [embla])

  const onSelect = useCallback(() => {
    if (!embla) return
    setSelectedIndex(embla.selectedScrollSnap())
    setPrevBtnEnabled(embla.canScrollPrev())
    setNextBtnEnabled(embla.canScrollNext())
  }, [embla, setSelectedIndex])

  useEffect(() => {
    if (!embla) return
    onSelect()
    setScrollSnaps(embla.scrollSnapList())
    embla.on('select', onSelect)
  }, [embla, setScrollSnaps, onSelect])

  return (
    <>
      <div className="embla">
        <div className="embla__viewport rounded-xl" ref={viewportRef}>
          <div className="embla__container">{slides}</div>
        </div>
        <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
        <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
      </div>
      {showDots && (
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton key={index} selected={index === selectedIndex} onClick={() => scrollTo(index)} />
          ))}
        </div>
      )}
    </>
  )
}

export default EmblaCarousel
