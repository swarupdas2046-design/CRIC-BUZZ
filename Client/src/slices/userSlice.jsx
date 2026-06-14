import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState:  {
      _id: "",
      email: "",
      picture: "",
      role: "",
      name: "" 
    },
  reducers: {
    setUser: (state, action) => {
      state._id = action.payload._id;
      state.email = action.payload.email;
      state.picture = action.payload.picture;
      state.role = action.payload.role;
      state.name = action.payload.name;
    },
  },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer