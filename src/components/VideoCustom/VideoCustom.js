import React, { useRef } from 'react'
// import { MdArrowRight } from 'react-icons/md'

const VideoCustom = ({ children, ...props }) => {
  const videoRef = useRef()
  // const btnPlayRef = useRef()

  return (
    <div className="relative">
      <iframe ref={videoRef} {...props}>
        {children}
      </iframe>
      {/* <div ref={btnPlayRef}>
        <MdArrowRight
          onClick={() => {
            if (videoRef.current !== null) {
              videoRef.current.play()
              btnPlayRef.current.style.display = 'none'
            }
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer rounded-full bg-white text-black opacity-70"
          size={80}
        />
      </div> */}
    </div>
  )
}

export default VideoCustom
