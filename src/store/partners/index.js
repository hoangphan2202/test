import { createSlice } from '@reduxjs/toolkit'
import partnersApi from '../../api/partnersApi'

const initialState = {
  allPartners: undefined,
  partner: undefined,
}

export const partnersSlice = createSlice({
  name: 'partners',
  initialState,
  reducers: {
    setAllPartners: (state, action) => {
      state.allPartners = action.payload.map((x) => ({ ...x, chosen: true }))
    },
    setPartner: (state, action) => {
      state.partner = action.payload
    },
  },
})

export const fetchAllPartnersAsync = () => async (dispatch) => {
  try {
    const response = await partnersApi.getAll()
    dispatch(setAllPartners(response))
  } catch (err) {
    console.log(err)
  }
}

export const { setAllPartners, setPartner } = partnersSlice.actions

export default partnersSlice.reducer
