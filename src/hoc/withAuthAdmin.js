import usersApi from 'api/usersApi'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ADMIN_TOKEN } from 'utils/storage'
import { setUser } from '../store/user'
import { useRouter } from 'next/router'
import PageLoadingAdmin from '../components/PageLoadingAdmin/PageLoadingAdmin'

// eslint-disable-next-line react/display-name
const withAuthAdmin = (WrappedComponent) => (props) => {
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    const checkUserLogin = async () => {
      const adminToken = ADMIN_TOKEN.get()
      if (adminToken) {
        try {
          const user = await usersApi.getUser()
          await dispatch(setUser(user))
          setIsLoading(false)
        } catch (e) {
          await router.push('/admin/login')
          console.error(e)
        }
      } else {
        await router.push('/admin/login')
      }
    }

    checkUserLogin()
    window.addEventListener('storage', checkUserLogin)
    return () => {
      window.removeEventListener('storage', checkUserLogin)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) return <PageLoadingAdmin />

  return <WrappedComponent {...props} />
}

export default withAuthAdmin
