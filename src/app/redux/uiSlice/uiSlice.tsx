// En uiSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isSidebarExpanded: false,
    sidebarOpenedByButton: false, 
  },
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarExpanded = !state.isSidebarExpanded;
    },
    setSidebarExpanded: (state, action) => {
      state.isSidebarExpanded = action.payload;
    },
    setSidebarOpenedByButton: (state, action) => {
      state.sidebarOpenedByButton = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarExpanded, setSidebarOpenedByButton } =
  uiSlice.actions;

export default uiSlice.reducer;
