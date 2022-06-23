import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllVideosAsync } from './index'

export const useAllVideos = () => useSelector((state) => state.video.allVideos)

export const useVideo = () => useSelector((state) => state.video.video)

export const useFetchAllVideos = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllVideosAsync())
  }, [])
}
