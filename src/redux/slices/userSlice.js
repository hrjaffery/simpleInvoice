import { createSlice } from '@reduxjs/toolkit';

const userSlicer = createSlice({
  name: 'user',
  initialState: {
    accessToken: null,
    idToken: null,
  },

  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setIdToken: (state, action) => {
      state.idToken = action.payload;
    },
  },
});

export const { setAccessToken, setIdToken } = userSlicer.actions;

export default userSlicer.reducer;
