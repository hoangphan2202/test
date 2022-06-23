import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllImagesAsync } from './index'

export const useAllImages = () => useSelector((state) => state.images.allImages)

export const useImage = () => useSelector((state) => state.images.image)

export const useFetchAllImages = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllImagesAsync())
  }, [])
}
