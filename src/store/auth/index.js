import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
  },
  reducers: {
    setUser: (state, actions) => {
      state.user = actions.payload;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
