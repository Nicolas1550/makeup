// features/reservationsModalSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isReservationsModalOpen: false,
};

const reservationsModalSlice = createSlice({
  name: "reservationsModal",
  initialState,
  reducers: {
    openModal: (state) => {
      console.log("openModal action called in Redux");
      state.isReservationsModalOpen = true;
    },
    closeModal: (state) => {
      console.log("closeModal action called in Redux");
      state.isReservationsModalOpen = false;
    },
  },
});

export const { openModal, closeModal } = reservationsModalSlice.actions;
export default reservationsModalSlice.reducer;
