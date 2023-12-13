import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDesktopDropdownOpen: false,
};

export const desktopDropdownSlice = createSlice({
  name: "desktopDropdown",
  initialState,
  reducers: {
    toggleDesktopDropdown: (state) => {
      state.isDesktopDropdownOpen = !state.isDesktopDropdownOpen;
    },
  },
});

export const { toggleDesktopDropdown } = desktopDropdownSlice.actions;

export default desktopDropdownSlice.reducer;
