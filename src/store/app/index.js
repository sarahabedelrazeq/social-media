import { createSlice } from "@reduxjs/toolkit";
import { DEFAULT_LANGUAGE, DEFAULT_THEME, DEFAULT_COLOR } from "constants";

const initialState = {
  language: DEFAULT_LANGUAGE,
  loading: false,
  theme: DEFAULT_THEME,
  color: DEFAULT_COLOR,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    switchLanguage: (state, action) => {
      state.language = action.payload;
    },
    switchTheme: (state, action) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
  },
});

export const { switchLanguage, switchTheme } = appSlice.actions;
export default appSlice.reducer;
