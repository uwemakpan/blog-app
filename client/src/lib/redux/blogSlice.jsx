import { createSlice } from '@reduxjs/toolkit'

const initialState = { blogPosts: [] }

export const blogSlice = createSlice({
  initialState,
  name: 'blogSlice',
  reducers: {
    setBlogPosts: (state, action) => {
      state.blogPosts = action.payload
    },
    clearBlogPosts: (state) => {
      state.blogPosts = []
    },
  },
})

export default blogSlice.reducer
export const { setBlogPosts, clearBlogPosts } = blogSlice.actions
