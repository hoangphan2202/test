import axiosClient from './axiosClient'

export const imagesProjectUrlApi = {
  getAll: '/project-images',
}

const imagesProjectApi = {
  getAll: () => {
    const url = '/project-images'
    return axiosClient.get(url)
  },
  create: (body) => {
    const url = '/project-images'
    return axiosClient.post(url, body)
  },
  edit: (id, body) => {
    const url = `project-images/${id}`
    return axiosClient.put(url, body)
  },
  delete: (id) => {
    const url = `project-images/${id}`
    return axiosClient.delete(url)
  },
  editOrders: (body) => {
    const url = '/project-images/orders'
    return axiosClient.put(url, body)
  },
}

export default imagesProjectApi
