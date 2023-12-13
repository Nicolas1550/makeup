// En src/redux/slices/dropdownSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/app/redux/store/rootReducer"; // Asegúrate de usar la ruta correcta a tu rootReducer

export const dropdownSlice = createSlice({
  name: "dropdown",
  initialState: {
    isOpen: false,
  },
  reducers: {
    toggle: (state) => {
      console.log(
        "toggleDropdownMenu action called. Current state:",
        state.isOpen
      );
      state.isOpen = !state.isOpen;
      console.log("New state after toggle:", state.isOpen);
    },
    setOpen: (state, action) => {
      console.log(
        "setOpen action called. Current state:",
        state.isOpen,
        "New state:",
        action.payload
      );
      state.isOpen = action.payload;
    },
  },
});

export const { toggle, setOpen } = dropdownSlice.actions;

export const selectIsDropdownOpen = (state: RootState) => state.dropdown.isOpen;

export default dropdownSlice.reducer;
