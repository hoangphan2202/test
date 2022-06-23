import axiosClient from './axiosClient'

export const videoUrlApi = {
  getAll: '/videos',
}

const videoApi = {
  getAll: () => {
    const url = '/videos'
    return axiosClient.get(url)
  },
  create: (body) => {
    const url = '/videos'
    return axiosClient.post(url, body)
  },
  edit: (id, body) => {
    const url = `/videos/${id}`
    return axiosClient.put(url, body)
  },
  delete: (id) => {
    const url = `/videos/${id}`
    return axiosClient.delete(url)
  },
  deactiveVideo: (id) => {
    const url = `/videos/${id}/deactivate`
    return axiosClient.delete(url)
  },
}

export default videoApi
