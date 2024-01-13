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
        .post("https://asdasdasd3.onrender.com/api/validateToken", { token })
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
          localStorage.removeItem("jwt");
        });
    }
  }

  // Websocket events
  const socket = io("https://asdasdasd3.onrender.com");

  socket.on("new-reservation", (data) => {
    thunkDispatch(fetchReservationDetails(data.reservationId));
  });

  socket.on("stock-updated", () => {
    thunkDispatch(fetchUpdatedProducts())
      .then((action: AnyAction) => {
        if (fetchUpdatedProducts.fulfilled.match(action)) {
          const updatedProducts = action.payload;
         
          updatedProducts.forEach((product) => {
            storeAPI.dispatch(syncCartWithUpdatedStock(product));
          });
        }
      })
      .catch((error: ErrorType) => {
      });
  });
  socket.on("serviceImagesChanged", (data) => {
    thunkDispatch(fetchServiceImages(data.serviceId));
  });
  return (next: Dispatch<AnyAction>) => (action: AnyAction) => {
    return next(action);
  };
};

export default websocketMiddleware;
