import { createSlice } from "@reduxjs/toolkit";
import { getFeed, getFriend } from "./actions";

const initialState = {
  loading: false,
  feed: [],
  friends: [],
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [getFeed.pending]: (state) => {
      state.loading = true;
    },
    [getFeed.fulfilled]: (state, action) => {
      state.feed = action.payload;
      state.loading = false;
    },
    [getFeed.rejected]: (state) => {
      state.loading = false;
    },
    [getFriend.pending]: (state) => {
      state.loading = true;
    },
    [getFriend.fulfilled]: (state, action) => {
      state.friends = action.payload;
      state.loading = false;
    },
    [getFriend.rejected]: (state) => {
      state.loading = false;
    },
  },
  reducers: {},
});

export { getFeed, getFriend };
export default userSlice.reducer;
