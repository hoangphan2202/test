import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllAdvisoriesAsync, fetchAdvisoryAsync } from './index'
import { useRouter } from 'next/router'

export const useAllAdvisories = () => useSelector((state) => state.advisory.allAdvisories)

export const useAdvisory = () => useSelector((state) => state.advisory.advisory)

export const useFetchAllAdvisories = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllAdvisoriesAsync())
  }, [])
}

export const useFetchAdvisory = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    dispatch(fetchAdvisoryAsync(router?.query?.id))
  }, [])
}
