import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "helpers";

export const getFeed = createAsyncThunk("user/getFeed", async (_, thunkAPI) => {
  const { getState, rejectWithValue } = thunkAPI;
  const { language } = getState().app;
  try {
    let { data: posts, error } = await client
      .from("posts")
      .select(`*, userData(*), liks(*)`)
      .order("id", { ascending: false });

    if (error && error.message) return rejectWithValue(error.message);
    return posts;
  } catch (error) {
    const { response } = error;
    return rejectWithValue(response.data.message);
  }
});

export const getFriend = createAsyncThunk(
  "user/getFriend",
  async (_, thunkAPI) => {
    const { getState, rejectWithValue } = thunkAPI;
    const user = getState().auth?.user;
    if (user && user.id) {
      try {
        let { data: friends } = await client
          .from("")
          .select(`following_id`)
          .eq(`user_id`, user.id);
          
        if (friends.length > 0) {
          let { data: friendsData, error } = await client
            .from("userData")
            .select(`*`)
            .in(
              "id",
              friends.map(({ following_id }) => following_id)
            );
          if (error && error.message) return rejectWithValue(error.message);
          return friendsData;
        }
        return [];
      } catch (error) {
        const { response } = error;
        return rejectWithValue(response.data.message);
      }
    }
  }
);
