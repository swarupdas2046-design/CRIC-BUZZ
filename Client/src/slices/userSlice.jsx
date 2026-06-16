import { createSlice } from '@reduxjs/toolkit'
import { getSession } from '../services/authService'

// Hydrate Redux from the persisted session so a page refresh stays logged in.
const session = getSession()

const initialState = {
  user: session?.user ?? null,
  token: session?.token ?? null,
  isAuthenticated: Boolean(session?.token),
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload
      state.user = user
      state.token = token
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
    },
  },
})

export const { setCredentials, logout } = userSlice.actions

export default userSlice.reducer
