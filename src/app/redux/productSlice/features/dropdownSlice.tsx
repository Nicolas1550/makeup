// En src/redux/slices/dropdownSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/app/redux/store/rootReducer";

export const dropdownSlice = createSlice({
  name: "dropdown",
  initialState: {
    isOpen: false,
  },
  reducers: {
    toggle: (state) => {
      state.isOpen = !state.isOpen;
    },
    setOpen: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const { toggle, setOpen } = dropdownSlice.actions;

export const selectIsDropdownOpen = (state: RootState) => state.dropdown.isOpen;

export default dropdownSlice.reducer;
