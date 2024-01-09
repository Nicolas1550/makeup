import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { setLoading } from "../messagesSlice/messagesSlice";

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
        "https://asdasdasd3.onrender.com/api/validateToken",
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
        "https://asdasdasd3.onrender.com/api/login",
        credentials
      );
      const token = response.data.token;

      localStorage.setItem("jwt", token);

      const decodedToken = jwt_decode(token) as DecodedToken;

      thunkAPI.dispatch(setLoading(false));

      return {
        userRoles: decodedToken.roles,
        userId: decodedToken.id || decodedToken.usuario_id,
        userName: decodedToken.username,
      };
    } catch (error: unknown) {
      thunkAPI.dispatch(setLoading(false));

      if (typeof error === "object" && error !== null && "response" in error) {
        // Verificar si hay errores específicos de validación
        const errors = (error as RegisterErrorResponse).response.data.errors;
        if (errors && errors.length > 0) {
          const errorMessage = errors
            .map((err: { msg: string }) => err.msg)
            .join(". ");
          return thunkAPI.rejectWithValue(errorMessage);
        }

        // Manejar mensaje de error general, como credenciales incorrectas
        const generalErrorMessage =
          (error as RegisterErrorResponse).response?.data?.error ||
          "Error al iniciar sesión";
        return thunkAPI.rejectWithValue(generalErrorMessage);
      }

      return thunkAPI.rejectWithValue("Error al iniciar sesión");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: RegisterUserData, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));

    try {
      await axios.post(
        "https://asdasdasd3.onrender.com/api/users/register",
        userData
      );
      thunkAPI.dispatch(setLoading(false));
      return "Registro exitoso";
    } catch (error: unknown) {
      thunkAPI.dispatch(setLoading(false));

      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        (error as RegisterErrorResponse).response.data.errors
      ) {
        const validationErrors = (
          error as RegisterErrorResponse
        ).response.data.errors.map((err) => err.msg);
        return thunkAPI.rejectWithValue(validationErrors.join(". "));
      }

      const generalErrorMessage =
        (error as RegisterErrorResponse).response?.data?.error ||
        "Error al registrarse. Por favor, intente nuevamente.";
      return thunkAPI.rejectWithValue(generalErrorMessage);
    }
  }
);
