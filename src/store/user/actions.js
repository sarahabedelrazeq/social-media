import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "helpers";

export const getFeed = createAsyncThunk(
  "home/getFirstLevelPlaces",
  async (_, thunkAPI) => {
    const { getState, rejectWithValue } = thunkAPI;
    const { language } = getState().app;
    try {
      let { data: posts, error } = await client
        .from("posts")
        .select(`*, userData(*)`)
        .order('id', { ascending: false })
        
      if (error && error.message) return rejectWithValue(error.message);
      return posts;
    } catch (error) {
      const { response } = error;
      return rejectWithValue(response.data.message);
    }
  }
);
