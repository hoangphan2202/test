import axiosClient from './axiosClient'

export const bannerUrlApi = {
  getAll: '/banners',
}

const bannerApi = {
  getAll: () => {
    const url = '/banners'
    return axiosClient.get(url)
  },
  create: (body) => {
    const url = '/banners'
    return axiosClient.post(url, body)
  },
  edit: (id, body) => {
    const url = `banners/${id}`
    return axiosClient.put(url, body)
  },
  delete: (id) => {
    const url = `banners/${id}`
    return axiosClient.delete(url)
  },
  editOrders: (body) => {
    const url = '/banners/orders'
    return axiosClient.put(url, body)
  },
}

export default bannerApi
