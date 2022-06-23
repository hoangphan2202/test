import { createSlice } from '@reduxjs/toolkit'
import bannerApi from 'api/bannerApi'

const initialState = {
  allBanners: undefined,
  banner: undefined,
}

export const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    setAllBanner: (state, action) => {
      state.allBanners = action.payload.map((x) => ({ ...x, chosen: true }))
    },
    setBanner: (state, action) => {
      state.banner = action.payload
    },
  },
})

export const fetchAllBannerAsync = () => async (dispatch) => {
  try {
    const response = await bannerApi.getAll()
    dispatch(setAllBanner(response))
  } catch (err) {
    console.log(err)
  }
}

export const { setAllBanner, setBanner } = bannerSlice.actions

export default bannerSlice.reducer
