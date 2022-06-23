import { createSlice } from '@reduxjs/toolkit'
import sponsorsApi from '../../api/sponsorsApi'

const initialState = {
  allSponsors: undefined,
  sponsor: undefined,
}

export const sponsorsSlice = createSlice({
  name: 'sponsors',
  initialState,
  reducers: {
    setAllSponsors: (state, action) => {
      state.allSponsors = action.payload.map((x) => ({ ...x, chosen: true }))
    },
    setSponsor: (state, action) => {
      state.sponsor = action.payload
    },
  },
})

export const fetchAllSponsorsAsync = () => async (dispatch) => {
  try {
    const response = await sponsorsApi.getAll()
    dispatch(setAllSponsors(response))
  } catch (err) {
    console.log(err)
  }
}

export const { setAllSponsors, setSponsor } = sponsorsSlice.actions

export default sponsorsSlice.reducer
