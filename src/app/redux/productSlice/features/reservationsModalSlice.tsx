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
      state.isReservationsModalOpen = true;
    },
    closeModal: (state) => {
      state.isReservationsModalOpen = false;
    },
  },
});

export const { openModal, closeModal } = reservationsModalSlice.actions;
export default reservationsModalSlice.reducer;
