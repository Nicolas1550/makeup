// contactSlice.ts
import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";

interface ContactState {
  loading: boolean;
  error: string | null;
  success: boolean;
}
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const initialState: ContactState = {
  loading: false,
  error: null,
  success: false,
};

export const sendContactForm = createAsyncThunk(
  "contact/sendContactForm",
  async (formData: ContactFormData, thunkAPI) => {
    try {
      const response = await fetch("/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      // Verifica si 'error' es una instancia de 'Error'
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      // Retorna un mensaje genérico si el error no es una instancia de 'Error'
      return thunkAPI.rejectWithValue(
        "Error al enviar el formulario de contacto"
      );
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendContactForm.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(sendContactForm.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      // Manejo adicional del estado si es necesario
    });
    builder.addCase(
      sendContactForm.rejected,
      (
        state,
        action: PayloadAction<unknown, string, never, SerializedError>
      ) => {
        state.loading = false;
        state.error = action.error?.message || "Failed to send";
        state.success = false;
      }
    );
  },
});

export const { reset } = contactSlice.actions;
export default contactSlice.reducer;
