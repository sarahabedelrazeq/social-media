import { createSlice } from "@reduxjs/toolkit";
import { getFeed } from "./actions";

const initialState = {
  loading: false,
  feed: [],
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [getFeed.pending]: (state, action) => {
      state.loading = true;
    },
    [getFeed.fulfilled]: (state, action) => {
      state.feed = action.payload;
      state.loading = false;

    },
    [getFeed.rejected]: (state, action) => {
      state.loading = false;
    },
  },
  reducers: {},
});

export { getFeed };
export const {} = userSlice.actions;
export default userSlice.reducer;
