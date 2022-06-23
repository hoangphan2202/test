import { createSlice } from '@reduxjs/toolkit'

const initialState = null

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => (state = action.payload),
  },
})

// Actions
export const { setUser } = userSlice.actions

export default userSlice.reducer
