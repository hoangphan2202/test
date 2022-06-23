import axiosClient from './axiosClient'

const usersApi = {
  login: (body) => {
    const url = '/users/login'
    return axiosClient.post(url, body)
  },
  getUser: () => {
    const url = '/users/me'
    return axiosClient.get(url)
  },
}

export default usersApi
