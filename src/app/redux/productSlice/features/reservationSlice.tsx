import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../../store/rootReducer";

interface Reservation {
  id: number;
  fecha: string;
  comprobante_pago: string;
  nombre: string;
  email: string;
  telefono: string;
  reservationType: string;
  start: Date;
  end: Date;
}

interface ReservationState {
  reservations: Reservation[];
  error: string | null;
}

const initialState: ReservationState = {
  reservations: [],
  error: null,
};

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    addNewReservation: (state, action: PayloadAction<Reservation>) => {
      const existingReservation = state.reservations.find(
        (reservation) => reservation.id === action.payload.id
      );

      if (!existingReservation) {
        state.reservations.push(action.payload);
      }
    },
    setReservations: (state, action: PayloadAction<Reservation[]>) => {
      state.reservations = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const fetchReservationDetails =
  (reservationId: number): AppThunk =>
  async (dispatch) => {

    const token =
      typeof window !== "undefined" ? localStorage.getItem("jwt") : null;

    if (!token) {
      dispatch(setError("Token no encontrado. Por favor, autentíquese."));
      return;
    }

    try {
      const config = {
        headers: {
          "x-auth-token": token,
        },
      };

      const response = await axios.get(
        `https://asdasdasd3.onrender.com/api/reservas/details/${reservationId}`,
        config
      );
      if (response.data) {
        dispatch(addNewReservation(response.data));
      }
    } catch (error) {
      dispatch(setError("Error al obtener detalles de la reserva."));
    }
  };

export const { addNewReservation, setReservations, setError } =
  reservationSlice.actions;
export default reservationSlice.reducer;
