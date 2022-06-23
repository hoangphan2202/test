import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllSponsorsAsync } from './index'

export const useAllSponsors = () => useSelector((state) => state.sponsors.allSponsors)

export const useSponsor = () => useSelector((state) => state.sponsors.sponsor)

export const useFetchAllSponsors = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllSponsorsAsync())
  }, [])
}
