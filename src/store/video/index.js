import { createSlice } from '@reduxjs/toolkit'
import videoApi from 'api/videoApi'

const initialState = {
  allVideos: undefined,
  video: undefined,
}

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setAllVideos: (state, action) => {
      state.allVideos = action.payload.map((x) => ({ ...x, chosen: true }))
    },
    setVideo: (state, action) => {
      state.video = action.payload
    },
  },
})

export const fetchAllVideosAsync = () => async (dispatch) => {
  try {
    const response = await videoApi.getAll()
    dispatch(setAllVideos(response))
  } catch (err) {
    console.log(err)
  }
}

export const { setAllVideos, setVideo } = videoSlice.actions

export default videoSlice.reducer
