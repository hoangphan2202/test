import axiosClient from './axiosClient'

export const sponsorsUrlApi = {
  getAll: '/sponsors',
  getSponsor: '/sponsors/',
}

const sponsorsApi = {
  getAll: () => {
    const url = '/sponsors'
    return axiosClient.get(url)
  },
  create: (body) => {
    const url = '/sponsors'
    return axiosClient.post(url, body)
  },
  edit: (id, body) => {
    const url = `sponsors/${id}`
    return axiosClient.put(url, body)
  },
  delete: (id) => {
    const url = `sponsors/${id}`
    return axiosClient.delete(url)
  },
  editOrders: (body) => {
    const url = '/sponsors/orders'
    return axiosClient.put(url, body)
  },
}

export default sponsorsApi
