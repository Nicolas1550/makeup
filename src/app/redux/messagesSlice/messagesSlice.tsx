import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "../authSlice/authThunks";

interface MessagesState {
  loginMessage: string | null;
  loginError: LoginError | string | null; // Actualiza el tipo aquí
  isLoading: boolean;
  formError: FormError | string | null;
}

const initialState: MessagesState = {
  formError: null,

  loginMessage: null,
  loginError: null,
  isLoading: false,
};
export interface LoginError {
  usernameOrEmail?: string;
  password?: string;
  general?: string; // Para otros errores no específicos de un campo
}
export interface FormError {
  usernameOrEmail?: string;
  password?: string;
  general?: string;
  // Agregar otros campos según sea necesario
}
const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setLoginMessage: (state, action: PayloadAction<string | null>) => {
      state.loginMessage = action.payload;
    },
    setLoginError: (state, action: PayloadAction<string | null>) => {
      state.loginError = action.payload;
    },
    clearMessages: (state) => {
      state.loginMessage = null;
      state.loginError = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state) => {
        state.loginMessage = "Registro exitoso";
        state.loginError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loginError = action.payload as string;
        state.loginMessage = null;
      })
      // Manejar el estado de éxito de loginUser
      .addCase(loginUser.fulfilled, (state) => {
        state.loginMessage = "Inicio de sesión exitoso";
        state.loginError = null;
      })
      // Manejar el estado de error de loginUser
      .addCase(loginUser.rejected, (state, action) => {
        state.loginError = action.payload as string;
        state.loginMessage = null;
      });
  },
});

export const { setLoginMessage, setLoginError, clearMessages, setLoading } =
  messagesSlice.actions;

export default messagesSlice.reducer;
