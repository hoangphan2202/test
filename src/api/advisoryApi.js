import axiosClient from './axiosClient'

const advisoryApi = {
  getAll: () => {
    const url = '/advisories'
    return axiosClient.get(url)
  },
  getAdvisory: (id) => {
    const url = `/advisories/${id}`
    return axiosClient.get(url)
  },
  create: (body) => {
    const url = '/advisories'
    return axiosClient.post(url, body)
  },
  edit: (id, body) => {
    const url = `advisories/${id}`
    return axiosClient.put(url, body)
  },
  delete: (id) => {
    const url = `advisories/${id}`
    return axiosClient.delete(url)
  },
  editOrders: (body) => {
    const url = '/advisories/orders'
    return axiosClient.put(url, body)
  },
}

export const advisoryUrlApi = {
  getAdvisory: '/advisories/',
  getAllAdvisories: '/advisories',
  getAdvisoryBySlug: (slug) => `/advisories/${slug}/slug`,
}

export default advisoryApi
