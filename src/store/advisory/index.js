import { createSlice } from '@reduxjs/toolkit'
import advisoryApi from 'api/advisoryApi'

const initialState = {
  allAdvisories: undefined,
  advisory: undefined,
}

export const advisorySlice = createSlice({
  name: 'advisory',
  initialState,
  reducers: {
    setAllAdvisories: (state, action) => {
      state.allAdvisories = action.payload.map((x) => ({ ...x, chosen: true }))
    },
    setAdvisory: (state, action) => {
      state.advisory = action.payload
    },
  },
})

export const fetchAllAdvisoriesAsync = () => async (dispatch) => {
  try {
    const response = await advisoryApi.getAll()
    dispatch(setAllAdvisories(response.data))
  } catch (err) {
    console.log(err)
  }
}

export const fetchAdvisoryAsync = (id) => async (dispatch) => {
  try {
    const response = await advisoryApi.getAdvisory(id)
    dispatch(setAdvisory(response.data))
  } catch (err) {
    console.log(err)
  }
}

export const { setAllAdvisories, setAdvisory } = advisorySlice.actions

export default advisorySlice.reducer
