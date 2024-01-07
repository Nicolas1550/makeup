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
      const response = await fetch("https://asdasdasd3.onrender.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json(); // Obtener la respuesta en formato JSON
      console.log("Respuesta del servidor:", data);

      if (!response.ok) {
        throw new Error(data.error || "Network response was not ok");
      }

      return data.message; // Asegúrate de devolver el mensaje de éxito
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
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
      console.log("Pendiente de envío");
      state.loading = true;
      state.error = null;
    });
    builder.addCase(sendContactForm.fulfilled, (state, action) => {
      console.log("Enviado con éxito", action.payload);
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(sendContactForm.rejected, (state, action) => {
      console.log("Rechazado con error", action.error.message);
      state.loading = false;
      state.error = action.error?.message || "Failed to send";
      state.success = false;
    });
  },
});

export const { reset } = contactSlice.actions;
export default contactSlice.reducer;
