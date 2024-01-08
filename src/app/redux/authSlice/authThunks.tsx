import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { setLoginError, setLoading } from "../messagesSlice/messagesSlice";

interface DecodedToken {
  roles: string[];
  id: string | number | null;
  usuario_id: string | number | null;
  username: string; // <-- Usa 'username' en lugar de 'name'
  [key: string]: unknown;
}

interface AuthThunkResponse {
  userRoles: string[]; // ¡Nota el plural aquí!
  userId: string | number | null;
  userName: string;
}

interface RegisterUserData {
  username: string;
  password: string;
  email: string;
}

interface LoginResponse {
  token: string;
}

interface ErrorResponseData {
  errors: { msg: string }[];
  error: string;
}

interface RegisterErrorResponse {
  response: {
    data: ErrorResponseData;
  };
}

export const verifyToken = createAsyncThunk<AuthThunkResponse, void>(
  "auth/verifyToken",
  async (_, thunkAPI) => {
    // Añade "thunkAPI" aquí
    const token = localStorage.getItem("jwt");
    if (!token) return thunkAPI.rejectWithValue("No token found"); // ¡Usa rejectWithValue!

    try {
      const decodedToken = jwt_decode(token) as DecodedToken;
      const response = await axios.post(
        "http://localhost:3002/api/validateToken",
        { token }
      );

      if (!response.data.isValid) {
        localStorage.removeItem("jwt");
        return thunkAPI.rejectWithValue("Invalid token"); // ¡Usa rejectWithValue!
      }

      return {
        userRoles: decodedToken.roles,
        userId: decodedToken.id || decodedToken.usuario_id,
        userName: decodedToken.username,
      };
    } catch (error) {
      console.error("Token verification failed:", error);
      return thunkAPI.rejectWithValue("Token verification failed"); // ¡Usa rejectWithValue!
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    credentials: { usernameOrEmail: string; password: string },
    thunkAPI
  ) => {
    thunkAPI.dispatch(setLoading(true));

    try {
      const response = await axios.post<LoginResponse>(
        "http://localhost:3002/api/login",
        credentials
      );
      const token = response.data.token;

      localStorage.setItem("jwt", token);

      const decodedToken = jwt_decode(token) as DecodedToken;

      thunkAPI.dispatch(setLoading(false));

      return {
        userRoles: decodedToken.roles, // Devuelve todos los roles
        userId: decodedToken.id || decodedToken.usuario_id,
        userName: decodedToken.username,
      };
    } catch (error: unknown) {
      thunkAPI.dispatch(setLoading(false));
      if (error instanceof Error) {
        console.error("Login failed:", error.message);
        thunkAPI.dispatch(setLoginError(error.message || "Login failed"));
      }
      throw error;
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: RegisterUserData, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));

    try {
      await axios.post("http://localhost:3002/api/users/register", userData);
      thunkAPI.dispatch(setLoading(false));
      return "Registro exitoso";
    } catch (error: unknown) {
      thunkAPI.dispatch(setLoading(false));

      let errorMessage = "";

      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        (error as RegisterErrorResponse).response.data.errors
      ) {
        const validationErrors = (
          error as RegisterErrorResponse
        ).response.data.errors.map((err) => err.msg);
        errorMessage = validationErrors.join(". ");
      } else if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        (error as RegisterErrorResponse).response.data.error
      ) {
        const serverErrorMessage = (error as RegisterErrorResponse).response
          .data.error;
        if (
          serverErrorMessage.includes("nombre de usuario ya está registrado")
        ) {
          errorMessage = "El nombre ingresado ya existe.";
        } else if (serverErrorMessage.includes("correo electrónico")) {
          errorMessage = "El email ingresado ya está en uso.";
        } else {
          errorMessage = serverErrorMessage;
        }
      } else {
        errorMessage = "Error al registrarse. Por favor, intente nuevamente.";
      }

      console.log("Mensaje de error desde thunk:", errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
