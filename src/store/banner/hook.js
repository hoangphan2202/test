import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllBannerAsync } from './index'

export const useAllBanners = () => useSelector((state) => state.banner.allBanners)

export const useBanner = () => useSelector((state) => state.banner.banner)

export const useFetchAllBanners = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllBannerAsync())
  }, [])
}
