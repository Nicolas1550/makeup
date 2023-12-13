import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../productManagementSlice/productManagementSlice";
import { OrderDetail } from "../orderSlice/orderSlice";

export interface CartItem {
  imagen_url?: string;
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  stock: number;
}

export type CartState = CartItem[];

const isBrowser = typeof window !== "undefined";

const setCartToLocalStorage = (cart: CartState) => {
  if (isBrowser) {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }
};

const getCartFromLocalStorage = (): CartState => {
  if (isBrowser) {
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  }
  return [];
};

const initialState: CartState = getCartFromLocalStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    syncCartWithUpdatedStock: (state, action: PayloadAction<Product>) => {
      const updatedProduct = action.payload;
      const itemInCart = state.find((item) => item.id === updatedProduct.id);

      if (itemInCart) {
        itemInCart.nombre = updatedProduct.nombre || itemInCart.nombre;

        // Manejar imagen_url
        if (
          typeof updatedProduct.imagen_url === "string" ||
          typeof updatedProduct.imagen_url === "undefined"
        ) {
          itemInCart.imagen_url =
            updatedProduct.imagen_url || itemInCart.imagen_url;
        }

        itemInCart.precio = updatedProduct.precio || itemInCart.precio;
        itemInCart.stock =
          typeof updatedProduct.stock !== "undefined"
            ? updatedProduct.stock
            : itemInCart.stock;

        if (itemInCart.stock === 0 || itemInCart.cantidad > itemInCart.stock) {
          const index = state.findIndex(
            (item) => item.id === updatedProduct.id
          );
          state.splice(index, 1);
        } else if (itemInCart.cantidad > itemInCart.stock) {
          itemInCart.cantidad = itemInCart.stock;
        }
      }
      setCartToLocalStorage(state);
    },

    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        if (existingItem.stock && existingItem.cantidad < existingItem.stock) {
          const index = state.findIndex(
            (item) => item.id === action.payload.id
          );
          state[index].cantidad += 1;
        }
      } else {
        if (action.payload.stock > 0) {
          state.push(action.payload);
        }
      }
      setCartToLocalStorage(state);
    },
    incrementItem: (state, action: PayloadAction<number>) => {
      const existingItem = state.find((item) => item.id === action.payload);
      if (existingItem && existingItem.cantidad < existingItem.stock) {
        existingItem.cantidad += 1;
      }
      setCartToLocalStorage(state);
    },
    decrementItem: (state, action: PayloadAction<number>) => {
      const existingItem = state.find((item) => item.id === action.payload);
      if (existingItem && existingItem.cantidad > 1) {
        existingItem.cantidad -= 1;
      }
      setCartToLocalStorage(state);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const index = state.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
      setCartToLocalStorage(state);
    },
    clearCart: () => {
      setCartToLocalStorage([]);
      return [];
    },
    initCart: (state, action: PayloadAction<CartState>) => {
      return action.payload;
    },
    updateItemStock: (
      state,
      action: PayloadAction<{ id: number; newStock: number }>
    ) => {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.stock = action.payload.newStock;
        if (existingItem.cantidad > existingItem.stock) {
          existingItem.cantidad = existingItem.stock;
        }
      }
    },
    updateStockFromOrder: (state, action: PayloadAction<OrderDetail[]>) => {
      action.payload.forEach((detail) => {
        const itemInCart = state.find((item) => item.id === detail.producto_id);
        if (itemInCart) {
          itemInCart.stock -= detail.cantidad;
          if (itemInCart.cantidad > itemInCart.stock) {
            itemInCart.cantidad = itemInCart.stock;
          }
        }
      });
    },
  },
});

export const {
  addItem,
  incrementItem,
  decrementItem,
  removeItem,
  clearCart,
  initCart,
  updateItemStock,
  syncCartWithUpdatedStock,
  updateStockFromOrder,
} = cartSlice.actions;

export default cartSlice.reducer;
