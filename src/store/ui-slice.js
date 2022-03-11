import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    message: null,
    errMessage: null,
  },
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setError: (state, action) => {
      state.errMessage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMessage, setError } = uiSlice.actions;

export default uiSlice.reducer;
