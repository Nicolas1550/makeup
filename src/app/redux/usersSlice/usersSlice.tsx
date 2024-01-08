import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

// Definimos la estructura de User y el estado inicial
interface User {
  id: number;
  username: string;
  roles: string[];
}

interface UserState {
  users: User[];
  helpers: User[];
  currentHelperId: number | null; // ID del ayudante actualmente autenticado
  isCurrentUserHelper: boolean; // Indica si el usuario actual tiene el rol de ayudante
  loading: boolean;
  error: null | string;
}

const initialState: UserState = {
  users: [],
  helpers: [],
  currentHelperId: null,
  isCurrentUserHelper: false,
  loading: false,
  error: null,
};
interface ServerError {
  error: string;
}
export const fetchCurrentUser = createAsyncThunk(
  "users/fetchCurrentUser",
  async () => {
    const userToken = localStorage.getItem("jwt");
    if (!userToken) {
      throw new Error("No estás autenticado. Por favor, inicia sesión.");
    }
    const response = await axios.get(
      "https://asdasdasd3.onrender.com/api/users/current",
      {
        headers: {
          "x-auth-token": userToken,
        },
      }
    );
    const user: User = response.data;
    console.log("Usuario obtenido:", user);
    const isHelper = user.roles.includes("ayudante");
    console.log("Es ayudante:", isHelper);
    return {
      user,
      isHelper,
    };
  }
);

// Creamos thunks para las acciones asíncronas
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get("https://asdasdasd3.onrender.com/api/users");
  return response.data as User[];
});

export const fetchHelpers = createAsyncThunk("users/fetchHelpers", async () => {
  const response = await axios.get(
    "https://asdasdasd3.onrender.com/api/users/role/ayudante"
  );
  return response.data as User[];
});

export const assignRole = createAsyncThunk(
  "users/assignRole",
  async (userId: string, thunkAPI) => {
    try {
      await axios.put(`https://asdasdasd3.onrender.com/api/users/assignRole/${userId}`, {
        role: "ayudante",
      });
      return userId;
    } catch (error) {
      const axiosError = error as AxiosError; // Haciendo un type assertion
      if (axiosError && axiosError.response) {
        // Haciendo type assertion para ServerError
        const errorMessage = (axiosError.response.data as ServerError).error;
        return thunkAPI.rejectWithValue(errorMessage);
      }
      return thunkAPI.rejectWithValue("Error al asignar rol");
    }
  }
);

export const revokeRole = createAsyncThunk(
  "users/revokeRole",
  async (userId: string) => {
    await axios.put(`https://asdasdasd3.onrender.com/api/users/revokeRole/${userId}`, {
      role: "ayudante",
    });
    return userId;
  }
);

// Creamos el slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchCurrentUser.fulfilled,
        (state, action: PayloadAction<{ user: User; isHelper: boolean }>) => {
          console.log("Action payload:", action.payload);
          if (action.payload.isHelper) {
            state.currentHelperId = action.payload.user.id;
            state.isCurrentUserHelper = true;
            console.log(
              "Se estableció currentHelperId:",
              state.currentHelperId
            );
          } else {
            state.currentHelperId = null;
            state.isCurrentUserHelper = false;
            console.log("El usuario no es un ayudante.");
          }
          // Aquí podrías agregar cualquier otra lógica que necesites cuando se recupere el usuario actual
        }
      )
      .addCase(assignRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(revokeRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(assignRole.fulfilled, (state, action) => {
        state.loading = false;

        // Encuentra el usuario asignado en la lista de usuarios
        const userAssigned = state.users.find(
          (user) => user.id === parseInt(action.payload)
        );

        // Si encontramos al usuario, lo movemos de la lista de usuarios a la lista de ayudantes
        if (userAssigned) {
          // Elimina al usuario de la lista de usuarios
          state.users = state.users.filter(
            (user) => user.id !== parseInt(action.payload)
          );

          // Agrega al usuario a la lista de ayudantes
          state.helpers.push(userAssigned);
        }
      })
      .addCase(revokeRole.fulfilled, (state, action) => {
        state.loading = false;

        // Encuentra el ayudante revocado en la lista de ayudantes
        const helperRevoked = state.helpers.find(
          (helper) => helper.id === parseInt(action.payload)
        );

        // Si encontramos al ayudante, lo movemos de la lista de ayudantes a la lista de usuarios
        if (helperRevoked) {
          // Elimina al ayudante de la lista de ayudantes
          state.helpers = state.helpers.filter(
            (helper) => helper.id !== parseInt(action.payload)
          );

          // Agrega al ayudante de vuelta a la lista de usuarios
          state.users.push(helperRevoked);
        }
      })

      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(
        fetchHelpers.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.helpers = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHelpers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchHelpers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
    // Puedes agregar casos adicionales para los thunks assignRole y revokeRole si lo deseas.
  },
});

export default userSlice.reducer;
