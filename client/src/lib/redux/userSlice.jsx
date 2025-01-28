import { createSlice } from '@reduxjs/toolkit'

const initialState = { currentUser: null }

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload
    },

    clearCurrentUser: (state) => {
      state.currentUser = null
    },
  },
})

export default userSlice.reducer
export const { setCurrentUser, clearCurrentUser } = userSlice.actions
