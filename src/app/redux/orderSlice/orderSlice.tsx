import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface OrderDetail {
  nombre: string;
  producto_id: number;
  cantidad: number;
  precio: number;
  imagen_url?: string;
}

export interface ShippingInfo {
  direccion: string;
  ciudad: string;
  estado: string;
  codigo_postal: string;
  pais: string;
  metodo_envio?: string;
}

export interface User {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
}

export interface Order {
  id: number;
  fecha: string;
  total: number;
  nombre: string;
  email: string;
  telefono: string;
  details?: OrderDetail[];
  detalles?: OrderDetail[];

  direccion?: string;
  ciudad?: string;
  estado?: string;
  codigo_postal?: string;
  pais?: string;
  metodo_envio?: string;
  comprobante_pago?: string;
}

const initialState: {
  orders: Order[];
  error: string | null;
  newOrdersCount: number;
} = {
  orders: [],
  error: null,
  newOrdersCount: 0,
};

interface UserOrdersResponse {
  user: User;
  orders: Order[];
}

type RejectWithValue<T> = {
  action: {
    type: string;
    payload?: T;
    error: {
      message: string;
    };
  };
};
export const changeOrderStatus = createAsyncThunk<
  Order | RejectWithValue<string>,
  { orderId: number; newState: string },
  {
    rejectValue: string;
  }
>(
  "order/changeOrderStatus",
  async ({ orderId, newState }, { rejectWithValue }) => {
    const isClient = typeof window !== "undefined";
    const userToken = isClient ? localStorage.getItem("jwt") : null;

    if (!userToken) {
      return rejectWithValue(
        "Token no encontrado. Asegúrate de estar autenticado."
      );
    }

    try {
      const response = await fetch(
        `https://sofiaportafolioonline.latincloud.app/api/orders/update-status/${orderId}`,
        {
          method: "PUT",
          headers: {
            "x-auth-token": userToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ estado: newState }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error changing order status: ${response.statusText}`);
      }

      const data: Order = await response.json();
      console.log("Order status changed successfully. Updated order:", data);
      return data;
    } catch (error) {
      const err = error as Error;
      return rejectWithValue(err.message || "Error desconocido.");
    }
  }
);

export const fetchUserOrders = createAsyncThunk<
  Order[] | RejectWithValue<string>,
  void,
  {
    rejectValue: string;
  }
>("order/fetchUserOrders", async (_, { rejectWithValue }) => {
  const isClient = typeof window !== "undefined";
  const userToken = isClient ? localStorage.getItem("jwt") : null;
  if (!userToken) {
    return rejectWithValue(
      "Token no encontrado. Asegúrate de estar autenticado."
    );
  }

  try {
    const response = await fetch(
      "https://sofiaportafolioonline.latincloud.app/api/orders/user-orders",
      {
        headers: {
          "x-auth-token": userToken,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching user orders: ${response.statusText}`);
    }

    const data: UserOrdersResponse = await response.json();

    return data.orders;
  } catch (error) {
    const err = error as Error;
    return rejectWithValue(err.message || "Error desconocido.");
  }
});
export const fetchOrdersByStatus = createAsyncThunk<
  Order[] | RejectWithValue<string>,
  {
    status: string;
    sortByDate?: "asc" | "desc";
    startDate?: string;
    endDate?: string;
  },
  {
    rejectValue: string;
  }
>(
  "order/fetchOrdersByStatus",
  async ({ status, sortByDate, startDate, endDate }, { rejectWithValue }) => {
    const isClient = typeof window !== "undefined";
    const userToken = isClient ? localStorage.getItem("jwt") : null;

    if (!userToken) {
      return rejectWithValue(
        "Token no encontrado. Asegúrate de estar autenticado."
      );
    }

    let url = `https://sofiaportafolioonline.latincloud.app/api/orders/orders-by-status/${status}`;
    const queryParams = [];
    if (sortByDate) {
      queryParams.push(`sortByDate=${sortByDate}`);
    }
    if (startDate && endDate) {
      queryParams.push(`startDate=${startDate}`, `endDate=${endDate}`);
    }
    if (queryParams.length) {
      url += `?${queryParams.join("&")}`;
    }

    try {
      const response = await fetch(url, {
        headers: {
          "x-auth-token": userToken,
        },
      });

      if (!response.ok) {
        throw new Error(
          `Error fetching orders by status: ${response.statusText}`
        );
      }

      const data: Order[] = await response.json();
      console.log("Data received:", data); // <-- Agrega este log
      return data;
    } catch (error) {
      const err = error as Error;
      return rejectWithValue(err.message || "Error desconocido.");
    }
  }
);

export const deleteOrderById = createAsyncThunk<
  { orderId: number; message: string } | RejectWithValue<string>,
  number,
  {
    rejectValue: string;
  }
>("order/deleteOrderById", async (orderId, { rejectWithValue }) => {
  const isClient = typeof window !== "undefined";
  const userToken = isClient ? localStorage.getItem("jwt") : null;

  if (!userToken) {
    return rejectWithValue(
      "Token no encontrado. Asegúrate de estar autenticado."
    );
  }

  try {
    const response = await fetch(
      `https://sofiaportafolioonline.latincloud.app/api/orders/order/${orderId}`,
      {
        method: "DELETE",
        headers: {
          "x-auth-token": userToken,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error deleting order: ${response.statusText}`);
    }

    const data: { message: string } = await response.json();
    return { ...data, orderId };
  } catch (error) {
    const err = error as Error;
    return rejectWithValue(err.message || "Error desconocido.");
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrders: (state) => {
      state.orders = [];
      state.error = null;
      state.newOrdersCount = 0;
      // Restablece cualquier otro estado que necesites
    },
    updateOrderState: (
      state,
      action: PayloadAction<{ orderId: number; newState: string }>
    ) => {
      console.log("Trying to update order with ID:", action.payload.orderId);
      const orderIndex = state.orders.findIndex(
        (order) => order.id === action.payload.orderId
      );
      if (orderIndex !== -1) {
        state.orders[orderIndex].estado = action.payload.newState;
      }
    },
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
    removeOrder: (state, action: PayloadAction<number>) => {
      state.orders = state.orders.filter(
        (order) => order.id !== action.payload
      );
    },
    incrementNewOrdersCount: (state) => {
      console.log("Incrementando contador de órdenes nuevas.");

      state.newOrdersCount += 1;
    },
    resetNewOrdersCount: (state) => {
      state.newOrdersCount = 0;
    },
    setNewOrdersCount: (state, action: PayloadAction<number>) => {
      state.newOrdersCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        changeOrderStatus.fulfilled,
        (state, action: PayloadAction<Order | RejectWithValue<string>>) => {
          if ("id" in action.payload) {
            const updatedOrder = action.payload;
            const index = state.orders.findIndex(
              (order) => order.id === updatedOrder.id
            );
            if (index > -1) {
              state.orders[index] = updatedOrder;
            }
          }
        }
      )
      .addCase(
        changeOrderStatus.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || "Error desconocido.";
        }
      )
      .addCase(
        fetchUserOrders.fulfilled,
        (state, action: PayloadAction<Order[] | RejectWithValue<string>>) => {
          if (Array.isArray(action.payload)) {
            console.log("Cargando órdenes del usuario:", action.payload);

            state.orders = action.payload;
            state.error = null;
          } else {
            console.error(
              "Error cargando órdenes del usuario:",
              action.payload.action.error.message
            );

            state.error = action.payload.action.error.message;
          }
        }
      )
      .addCase(
        fetchUserOrders.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || "Error desconocido.";
        }
      )
      .addCase(
        fetchOrdersByStatus.fulfilled,
        (state, action: PayloadAction<Order[] | RejectWithValue<string>>) => {
          if (Array.isArray(action.payload)) {
            console.log("Cargando órdenes del usuario:", action.payload);

            state.orders = action.payload;
            state.error = null;
          } else {
            // Manejo de error
          }
        }
      )
      .addCase(
        fetchOrdersByStatus.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || "Error desconocido.";
        }
      )
      .addCase(
        deleteOrderById.fulfilled,
        (
          state,
          action: PayloadAction<
            { orderId: number; message: string } | RejectWithValue<string>
          >
        ) => {
          if ("orderId" in action.payload) {
            const { orderId } = action.payload as {
              orderId: number;
              message: string;
            };
            state.orders = state.orders.filter((order) => order.id !== orderId);
          }
        }
      );
  },
});

export const {
  setOrders,
  addOrder,
  removeOrder,
  incrementNewOrdersCount,
  resetNewOrdersCount,
  setNewOrdersCount,
  updateOrderState,
  resetOrders,
} = orderSlice.actions;

export default orderSlice.reducer;
