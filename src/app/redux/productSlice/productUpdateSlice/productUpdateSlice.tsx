import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface UpdatedProduct {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  imagen_url: string;
  marca?: string;
  color?: string;
  categoria?: string;  
}


const initialState: UpdatedProduct[] = [];

export const fetchUpdatedProducts = createAsyncThunk(
  "productUpdate/fetchUpdatedProducts",
  async () => {
    const response = await axios.get("http://localhost:3002/api/products");
    return response.data as UpdatedProduct[];
  }
);

const productUpdateSlice = createSlice({
  name: "productUpdate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUpdatedProducts.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default productUpdateSlice.reducer;
