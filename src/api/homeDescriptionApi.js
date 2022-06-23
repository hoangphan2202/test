import axiosClient from './axiosClient'

export const homeDescriptionUrlApi = {
  getAll: '/home-descriptions',
}

const partnersApi = {
  getAll: () => {
    const url = '/home-descriptions'
    return axiosClient.get(url)
  },
  edit: (id, body) => {
    const url = `home-descriptions/${id}`
    return axiosClient.put(url, body)
  },
}

export default partnersApi
