import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, verifyToken } from "./authThunks";

export interface AuthState {
  isAuthenticated: boolean;
  userRoles: string[]; // Cambia esto a un array
  userId: string | number | null;
  isLoading: boolean;
  userName: string | null;
}
interface AuthThunkResponse {
  userRoles: string[]; // Cambia esto a un array
  userId: string | number | null;
  userName: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userRoles: [], // Inicializa como un array vacío
  userId: null,
  isLoading: false,
  userName: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLogin(state) {
      state.isLoading = true;
    },
    loginSuccess(
      state,
      action: PayloadAction<{
        userRoles: string[]; // Cambia a array
        userId: string | number | null;
      }>
    ) {
      state.isAuthenticated = true;
      state.userRoles = action.payload.userRoles;
      state.userId = action.payload.userId;
      state.isLoading = false;
    },
    loginFailure(state) {
      state.isLoading = false;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.userRoles = []; // Resetea a un array vacío
      state.userId = null;
      localStorage.removeItem("jwt");
    },
    setUserId(state, action: PayloadAction<string | number | null>) {
      state.userId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<AuthThunkResponse>) => {
        state.isAuthenticated = true;
        state.userRoles = action.payload.userRoles;
        state.userId = action.payload.userId;
        state.userName = action.payload.userName;
      }
    );
    builder.addCase(verifyToken.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.userRoles = action.payload.userRoles;
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
    });
  },
});

export const { logout, setUserId, startLogin, loginSuccess, loginFailure } =
  authSlice.actions;
export default authSlice.reducer;
