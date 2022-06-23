import axiosClient from './axiosClient'

const boothCoordinateApi = {
  getAll: () => {
    const url = '/booth-coordinates'
    return axiosClient.get(url)
  },
  editCoordinate: (_id, data) => {
    const url = `/booth-coordinates/${_id}`
    return axiosClient.put(url, data)
  },
}

export const boothCoordinateUrlApi = {
  getAll: '/booth-coordinates',
}

export default boothCoordinateApi
