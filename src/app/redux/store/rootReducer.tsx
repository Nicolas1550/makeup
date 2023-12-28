import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { ThunkDispatch } from "redux-thunk";
import { ThunkAction, Action } from "@reduxjs/toolkit";
import cursosReducer from "../coursesSlice/coursesSlice";

// Importa tus slices
import productUpdateReducer from "../productSlice/productUpdateSlice/productUpdateSlice";
import cartReducer from "../cartSlice/cartSlice";
import websocketMiddleware from "../productSlice/features/webSocketMiddleware";
import productManagementReducer from "../productManagementSlice/productManagementSlice";
import authReducer from "../authSlice/authSlice";
import loginModalReducer from "../loginModalSlice/loginModalSlice";
import messagesReducer from "../messagesSlice/messagesSlice";
import userDetailsReducer from "../userDetailSlice/userDetailsSlice";
import modalReducer from "../sliceModal/modalSlice";
import filterReducer from "../ProductsFilterSlice/filterSlice";
import orderReducer from "../orderSlice/orderSlice";
import reservationReducer from "../productSlice/features/reservationSlice";
import servicesReducer from "../serviceSlice/servicesSlice"; // Asegúrate de usar la ruta correcta a tu slice de servicios
import userReducer from "../usersSlice/usersSlice"; //  Importa el userSlice
import assistantReducer from "../assistantSlice/assistantSlice"; // Importa el nuevo slice
import uiReducer from "../uiSlice/uiSlice";
import reservationsModalReducer from "../productSlice/features/reservationsModalSlice";
import dropdownReducer from "../productSlice/features/dropdownSlice";
import desktopDropdownReducer from "../productSlice/features/desktopDropdownSlice"; // Asegúrate de que la ruta sea correcta
import contactReducer from "../contactSlice/contactSlice";

// Combina todos tus reducers en un rootReducer
const rootReducer = combineReducers({
  order: orderReducer,
  userDetails: userDetailsReducer,
  messages: messagesReducer,
  loginModal: loginModalReducer,
  auth: authReducer,
  productManagement: productManagementReducer,
  productUpdate: productUpdateReducer,
  cart: cartReducer,
  modal: modalReducer,
  filter: filterReducer,
  reservations: reservationReducer,
  services: servicesReducer,
  users: userReducer,
  assistant: assistantReducer,
  cursos: cursosReducer,
  ui: uiReducer,
  reservationsModal: reservationsModalReducer,
  dropdown: dropdownReducer,
  desktopDropdown: desktopDropdownReducer,
  contact: contactReducer,
});

// Configuración de persistencia
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configura y crea tu tienda Redux
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(websocketMiddleware),
});

export const persistor = persistStore(store);

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, Action<string>>;
