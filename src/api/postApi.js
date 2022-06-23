import axiosClient from './axiosClient'

const postApi = {
  getAll: () => {
    const url = '/posts'
    return axiosClient.get(url)
  },
  create: (body) => {
    const url = '/posts'
    return axiosClient.post(url, body)
  },
  edit: (id, body) => {
    const url = `/posts/${id}`
    return axiosClient.put(url, body)
  },
  get: ({ id = '', params }) => {
    const url = `/posts/${id}`
    return axiosClient.get(url, { params })
  },
  delete: (id) => {
    const url = `/posts/${id}`
    return axiosClient.delete(url)
  },
  editOrders: (body) => {
    const url = '/posts/orders'
    return axiosClient.put(url, body)
  },
}

export const postUrlApi = {
  getPost: '/posts/',
  getAllPost: '/posts',
  getPostBySlug: (slug) => `/posts/${slug}/slug`,
}

export default postApi
