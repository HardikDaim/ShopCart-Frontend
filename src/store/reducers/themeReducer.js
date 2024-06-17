import { createSlice } from '@reduxjs/toolkit';

const themeReducer = createSlice({
  name: 'theme',
  initialState: 'system', // Default theme
  reducers: {
    setLightTheme: (state) => 'light',
    setDarkTheme: (state) => 'dark',
    setSystemTheme: (state) => 'system'
  }
});

export const { setLightTheme, setDarkTheme, setSystemTheme } = themeReducer.actions;
export default themeReducer.reducer;
