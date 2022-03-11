import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    token: null
  },
  reducers: {
    setLogin: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload;
    },
    setLogout: (state, action) => {
      state.isLoggedIn = false;
      state.token = null;
    }
  }
})

// Action creators are generated for each case reducer function
export const { setLogin, setLogout } = authSlice.actions

export default authSlice.reducer