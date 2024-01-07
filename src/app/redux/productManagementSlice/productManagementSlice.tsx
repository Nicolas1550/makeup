import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { syncCartWithUpdatedStock } from "../cartSlice/cartSlice";

export interface Product {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock?: number;
  imagen_url?: string | File;
  marca?: string;
  color?: string;
  categoria?: string;
}

export interface ProductManagementState {
  allProducts: Product[];
  message: string | null;
  error: string | null;
  isLoading: boolean;
}

export const initialState: ProductManagementState = {
  allProducts: [],
  message: null,
  error: null,
  isLoading: false,
};

export const apiUpdateAllPrices = createAsyncThunk(
  "productManagement/updateAllPrices",
  async (percentage: number, { dispatch }) => {
    const response = await axios.put(
      `https://sofiaportafolioonline.latincloud.app/api/products/update-prices`,
      { percentage }
    );
    dispatch(setMessage(`Precios actualizados exitosamente.`));
    return response.data;
  }
);

// Acción para revertir los precios al último porcentaje aplicado
export const apiRevertLastPercentage = createAsyncThunk(
  "productManagement/revertLastPercentage",
  async (_, { dispatch }) => {
    const response = await axios.put(
      `https://sofiaportafolioonline.latincloud.app/api/products/revert-last-percentage`
    );
    dispatch(setMessage(`Precios revertidos al último porcentaje aplicado.`));
    return response.data;
  }
);

// Acción para ajustar los precios al porcentaje anterior
export const apiAdjustPricesToPreviousPercentage = createAsyncThunk(
  "productManagement/adjustPricesToPreviousPercentage",
  async (previousPercentage: number, { dispatch }) => {
    const response = await axios.put(
      `https://sofiaportafolioonline.latincloud.app/api/products/adjust-prices`,
      { previousPercentage }
    );
    dispatch(setMessage(`Precios ajustados al porcentaje anterior.`));
    return response.data;
  }
);

// Acción para revertir y aplicar un nuevo porcentaje
export const apiRevertAndApplyNewPercentage = createAsyncThunk(
  "productManagement/revertAndApplyNewPercentage",
  async (newPercentage: number, { dispatch }) => {
    const response = await axios.put(
      `https://sofiaportafolioonline.latincloud.app/api/products/revert-and-apply-percentage`,
      { newPercentage }
    );
    dispatch(
      setMessage(
        `Precios revertidos al último porcentaje y aplicado el nuevo porcentaje.`
      )
    );
    return response.data;
  }
);

export const apiAddProduct = createAsyncThunk(
  "productManagement/addProduct",
  async (newProduct: Omit<Product, "id">, { dispatch }) => {
    const formData = new FormData();
    for (const key in newProduct) {
      if (key === "imagen_url" && newProduct[key] instanceof File) {
        // Se usa 'instanceof File' para verificar si es un objeto File
        formData.append(key, newProduct[key] as File);
      } else {
        formData.append(
          key,
          String(newProduct[key as keyof typeof newProduct])
        );
      }
    }

    try {
      const response = await axios.post(
        `https://sofiaportafolioonline.latincloud.app/api/products`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(setMessage(`Producto creado con éxito.`));
      return response.data;
    } catch (error) {
      console.error("Error al crear el producto:", error);
      dispatch(
        setError("Error al crear el producto. Por favor, inténtalo de nuevo.")
      );
      dispatch(setLoading(false));
      throw error;
    }
  }
);

export const apiDeleteProduct = createAsyncThunk(
  "productManagement/deleteProduct",
  async (id: number) => {
    await axios.delete(`https://sofiaportafolioonline.latincloud.app/api/products/${id}`);
    return id;
  }
);

export const apiEditProduct = createAsyncThunk(
  "productManagement/editProduct",
  async (
    { id, formData }: { id: number; formData: FormData },
    { dispatch }
  ) => {
    const response = await axios.put(
      `https://sofiaportafolioonline.latincloud.app/api/products/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    dispatch(syncCartWithUpdatedStock(response.data));
    return response.data;
  }
);

export const apiGetAllProducts = createAsyncThunk(
  "productManagement/getAllProducts",
  async () => {
    const response = await axios.get(`https://sofiaportafolioonline.latincloud.app/api/products`);
    return response.data;
  }
);

const productManagementSlice = createSlice({
  name: "productManagement",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.allProducts.push(action.payload);
    },
    setMessage: (state, action: PayloadAction<string | null>) => {
      state.message = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    validateForm: (
      state,
      action: PayloadAction<{ nombre: string; precio: number }>
    ) => {
      const { nombre, precio } = action.payload;
      if (nombre.length < 3 || precio <= 0) {
        state.message =
          "Nombre necesita al menos 3 caracteres y precio debe ser mayor que 0";
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(apiAddProduct.fulfilled, (state, action) => {
        state.allProducts.push(action.payload);
        state.message = "Producto agregado con éxito";
        state.error = null;
        state.isLoading = false;
      })

      .addCase(apiAddProduct.rejected, (state, action) => {
        state.error = action.error.message || "Error al agregar el producto";
        state.message = null;
      })
      .addCase(apiDeleteProduct.fulfilled, (state, action) => {
        state.allProducts = state.allProducts.filter(
          (product) => product.id !== action.payload
        );
        state.message = "Producto eliminado con éxito";
        state.error = null;
      })
      .addCase(apiDeleteProduct.rejected, (state, action) => {
        state.error = action.error.message || "Error al eliminar el producto";
        console.log(action.error);
      })
      .addCase(apiEditProduct.fulfilled, (state, action) => {
        const index = state.allProducts.findIndex(
          (product) => product.id === action.payload.id
        );
        console.log("Estado actual de todos los productos:", state.allProducts);

        if (index !== -1) {
          state.allProducts[index] = action.payload;
          state.message = "Producto editado con éxito";
          state.error = null;
          console.log(
            "Producto actualizado en estado:",
            state.allProducts[index]
          );
          console.log("Estado completo después de editar:", state.allProducts);
        } else {
          console.log("Producto no encontrado en el estado.");
        }
      })

      .addCase(apiEditProduct.rejected, (state, action) => {
        state.error = action.error.message || "Error al editar el producto";
        state.message = null;
      })
      .addCase(apiGetAllProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload;
        state.error = null;
      })
      .addCase(apiUpdateAllPrices.fulfilled, (state) => {
        // Maneja la respuesta exitosa de la actualización de precios
        state.message = "Precios actualizados exitosamente";
      })
      .addCase(apiRevertLastPercentage.fulfilled, (state) => {
        // Maneja la respuesta exitosa de revertir al último porcentaje
        state.message = "Precios revertidos al último porcentaje aplicado";
      })
      .addCase(apiAdjustPricesToPreviousPercentage.fulfilled, (state) => {
        // Maneja la respuesta exitosa de ajustar precios al porcentaje anterior
        state.message = "Precios ajustados al porcentaje anterior";
      })
      .addCase(apiRevertAndApplyNewPercentage.fulfilled, (state) => {
        // Maneja la respuesta exitosa de revertir al último porcentaje y aplicar uno nuevo
        state.message =
          "Precios revertidos al último porcentaje y aplicado el nuevo porcentaje";
      });
  },
});
export const { addProduct, setMessage, setError, setLoading, validateForm } =
  productManagementSlice.actions;

export default productManagementSlice.reducer;
