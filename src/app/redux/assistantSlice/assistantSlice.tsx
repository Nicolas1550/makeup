import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Service {
  id: number;
  title: string;
}

interface Assistant {
  id: number;
  username: string;
}

interface AssistantState {
  services: Service[];
  assistants: Assistant[];
  assignedHelpers: Assistant[];
  loading: boolean;
  error: null | string;
}

const initialState: AssistantState = {
  services: [],
  assistants: [],
  assignedHelpers: [],
  loading: false,
  error: null,
};

export const fetchServices = createAsyncThunk(
  "assistant/fetchServices",
  async () => {
    const response = await axios.get("http://localhost:3002/api/servicios");
    return response.data as Service[];
  }
);

export const fetchAssistants = createAsyncThunk(
  "assistant/fetchAssistants",
  async () => {
    const response = await axios.get(
      "http://localhost:3002/api/users/role/ayudante"
    );
    return response.data as Assistant[];
  }
);

export const fetchAssignedHelpers = createAsyncThunk(
  "assistant/fetchAssignedHelpers",
  async (serviceId: string) => {
    // Si el serviceId es nulo o vacío, devuelve una lista vacía
    if (!serviceId || serviceId === "") {
      return [];
    }

    const userToken = localStorage.getItem("jwt");
    const response = await axios.get(
      `http://localhost:3002/api/servicios/${serviceId}/assignedHelpers`,
      {
        headers: {
          "x-auth-token": userToken,
        },
      }
    );
    return response.data as Assistant[];
  }
);

export const assignAssistant = createAsyncThunk(
  "assistant/assignAssistant",
  async ({
    serviceId,
    assistantId,
  }: {
    serviceId: string;
    assistantId: string;
  }) => {
    const userToken = localStorage.getItem("jwt");
    await axios.put(
      `http://localhost:3002/api/servicios/${serviceId}/assign`,
      { assistantId },
      {
        headers: {
          "x-auth-token": userToken,
        },
      }
    );
    return assistantId;
  }
);

export const removeAssistant = createAsyncThunk(
  "assistant/removeAssistant",
  async ({
    serviceId,
    assistantId,
  }: {
    serviceId: string;
    assistantId: number;
  }) => {
    const userToken = localStorage.getItem("jwt");
    await axios.put(
      `http://localhost:3002/api/servicios/${serviceId}/removeAssistant`,
      { assistantId },
      {
        headers: {
          "x-auth-token": userToken,
        },
      }
    );
    return assistantId;
  }
);

const assistantSlice = createSlice({
  name: "assistant",
  initialState,
  reducers: {
    resetAssignedHelpers: (state) => {
      state.assignedHelpers = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchServices.fulfilled,
        (state, action: PayloadAction<Service[]>) => {
          state.services = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        fetchAssistants.fulfilled,
        (state, action: PayloadAction<Assistant[]>) => {
          state.assistants = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        fetchAssignedHelpers.fulfilled,
        (state, action: PayloadAction<Assistant[]>) => {
          state.assignedHelpers = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAssistants.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAssignedHelpers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchAssistants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchAssignedHelpers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })

      .addCase(
        assignAssistant.fulfilled,
        (state, action: PayloadAction<string>) => {
          const assistant = state.assistants.find(
            (a) => a.id.toString() === action.payload
          );
          if (assistant) {
            state.assignedHelpers.push(assistant);
          }
        }
      )
      .addCase(
        removeAssistant.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.assignedHelpers = state.assignedHelpers.filter(
            (a) => a.id !== action.payload
          );
        }
      );
  },
});
export const { resetAssignedHelpers } = assistantSlice.actions;

export default assistantSlice.reducer;
