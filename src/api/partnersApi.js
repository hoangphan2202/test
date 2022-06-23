import axiosClient from './axiosClient'

export const partnersUrlApi = {
  getAll: '/partners',
}

const partnersApi = {
  getAll: () => {
    const url = '/partners'
    return axiosClient.get(url)
  },
  create: (body) => {
    const url = '/partners'
    return axiosClient.post(url, body)
  },
  edit: (id, body) => {
    const url = `partners/${id}`
    return axiosClient.put(url, body)
  },
  delete: (id) => {
    const url = `partners/${id}`
    return axiosClient.delete(url)
  },
  editOrders: (body) => {
    const url = '/partners/orders'
    return axiosClient.put(url, body)
  },
}

export default partnersApi
