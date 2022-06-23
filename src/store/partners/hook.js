import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllPartnersAsync } from './index'

export const useAllPartners = () => useSelector((state) => state.partners.allPartners)

export const usePartner = () => useSelector((state) => state.partners.partner)

export const useFetchAllPartners = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllPartnersAsync())
  }, [])
}
