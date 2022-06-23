import { createSlice } from '@reduxjs/toolkit'
import postApi from 'api/postApi'

const initialState = {
  allPosts: undefined,
  post: undefined,
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setAllPosts: (state, action) => {
      state.allPosts = action?.payload?.map((x) => ({ ...x, chosen: true }))
    },
    setPost: (state, action) => {
      state.post = action.payload
    },
  },
})

export const fetchAllPostsAsync = () => async (dispatch) => {
  try {
    const response = await postApi.getAll()
    dispatch(setAllPosts(response.data))
  } catch (err) {
    console.log(err)
  }
}

export const { setAllPosts, setPost } = postSlice.actions

export default postSlice.reducer
