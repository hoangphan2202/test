import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllPostsAsync } from './index'
import { useRouter } from 'next/router'

export const useAllPosts = () => useSelector((state) => state.post.allPosts)

export const usePost = () => useSelector((state) => state.post.post)

export const useFetchAllPosts = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllPostsAsync())
  }, [])
}
