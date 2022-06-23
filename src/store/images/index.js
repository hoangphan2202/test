import { createSlice } from '@reduxjs/toolkit'
import imagesProjectApi from '../../api/imagesProjectApi'

const initialState = {
  allImages: undefined,
  image: undefined,
}

export const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    setAllImages: (state, action) => {
      state.allImages = action.payload.map((x) => ({ ...x, chosen: true }))
    },
    setImage: (state, action) => {
      state.image = action.payload
    },
  },
})

export const fetchAllImagesAsync = () => async (dispatch) => {
  try {
    const response = await imagesProjectApi.getAll()
    dispatch(setAllImages(response))
  } catch (err) {
    console.log(err)
  }
}

export const { setAllImages, setImage } = imagesSlice.actions

export default imagesSlice.reducer
