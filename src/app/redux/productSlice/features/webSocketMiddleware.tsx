import {
  MiddlewareAPI,
  Dispatch,
  AnyAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import io from "socket.io-client";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { fetchUpdatedProducts } from "../productUpdateSlice/productUpdateSlice";
import { syncCartWithUpdatedStock } from "../../cartSlice/cartSlice";
import { fetchReservationDetails } from "./reservationSlice";
import { RootState } from "../../store/rootReducer";
import { fetchServiceImages } from "../../serviceSlice/servicesSlice";

type DecodedToken = {
  id: string;
  role: string;
  // Add any other fields from the decoded token if necessary
};

type ErrorType = { message?: string };

const websocketMiddleware = (storeAPI: MiddlewareAPI) => {
  const thunkDispatch = storeAPI.dispatch as ThunkDispatch<
    RootState,
    unknown,
    AnyAction
  >;

  // Token validation and dispatch
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("jwt");

    if (token) {
      axios
        .post("https://sofiacomar1.latincloud.app/api/validateToken", { token })
        .then((response) => {
          if (response.data.isValid) {
            const decodedToken: DecodedToken = jwt_decode(token);
            storeAPI.dispatch({
              type: "auth/loginSuccess",
              payload: {
                userRole: decodedToken.role,
                userId: decodedToken.id,
              },
            });
          } else {
            localStorage.removeItem("jwt");
          }
        })
        .catch((error) => {
          console.error("Error during token validation:", error);
          localStorage.removeItem("jwt");
        });
    }
  }

  // Websocket events
  const socket = io("https://sofiacomar1.latincloud.app");
  console.log("Configurando escuchador de evento new-reservation...");

  socket.on("new-reservation", (data) => {
    console.log("Evento new-reservation recibido:", data);
    thunkDispatch(fetchReservationDetails(data.reservationId));
  });
  console.log("Evento new-reservation configurado.");

  socket.on("stock-updated", () => {
    console.log("Evento stock-updated recibido.");
    thunkDispatch(fetchUpdatedProducts())
      .then((action: AnyAction) => {
        if (fetchUpdatedProducts.fulfilled.match(action)) {
          const updatedProducts = action.payload;
          console.log(
            "Productos actualizados después de fetchUpdatedProducts:",
            updatedProducts
          );
          updatedProducts.forEach((product) => {
            storeAPI.dispatch(syncCartWithUpdatedStock(product));
          });
        }
      })
      .catch((error: ErrorType) => {
        console.error("Error obteniendo productos actualizados:", error);
      });
  });
  socket.on("serviceImagesChanged", (data) => {
    console.log("Evento serviceImagesChanged recibido:", data);
    thunkDispatch(fetchServiceImages(data.serviceId));
  });
  return (next: Dispatch<AnyAction>) => (action: AnyAction) => {
    return next(action);
  };
};

export default websocketMiddleware;
