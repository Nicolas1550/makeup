import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../redux/store/rootReducer"; 
import { SerializedError } from "@reduxjs/toolkit";

import axios from "axios";
import moment from "moment";

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  icon_name?: string;
  category: string;
  assistantId?: number;
  color?: string;
  image_url?: string;
  image_path?: string;
  modal_description?: string;
  facebook_url?: string;
  whatsapp_url?: string;
  instagram_url?: string;
  price?: number;
  options?: ServiceOption[];
  images?: string[];
}

export interface ServiceOption {
  id: number;
  nombre: string;
  description?: string;
  precio?: number; // Costo adicional que esta opción podría agregar
}
interface Availability {
  id: number;
  usuario_id: number;
  service_id: number;
  fecha_inicio: string;
  fecha_fin: string;
  estado: string;
  fecha_inicio_reserva?: string;
  fecha_fin_reserva?: string;
}
interface ServiceOptions {
  [serviceId: number]: ServiceOption[];
}
interface FetchReservationsSummaryArgs {
  fechaInicio: string;
  fechaFin: string;
}
interface ServicesState {
  services: Service[];
  availabilities: Availability[];
  lastFetchedServiceId: number | null;
  loading: boolean;
  error: null | string;
  isUserAssigned: boolean | null;
  uploadProofOfPaymentStatus: "idle" | "loading" | "fulfilled" | "failed";
  fetchedServiceIds: number[]; 
  serviceImages: Record<number, string[]>; // Un objeto que mapea IDs de servicios a arrays de URLs de imágenes
  serviceOptions: ServiceOptions;
  reservationsForAssistant: Reservation[];
  reservationsForUser: Reservation[];
  reservationsSummary?: ReservationSummary; // Puede ser opcional si inicialmente no hay datos
  newReservationsCount: number; 
  serviceData: Record<number, Service>; // Almacena los datos de los servicios individualmente
}
interface ErrorResponse {
  errorMessage: string;
}

export interface Reservation {
  id: number;
  usuario_id: number;
  disponibilidad_id: number;
  fecha_reserva: string;
  estado: string;
  comprobante_path: string;
  precio: number;
  serviceId: number;
  fecha_inicio_reserva: string;
  fecha_fin_reserva: string;
  opciones_seleccionadas: string;
  usuario_nombre: string;
  serviceTitle: string;
  servicio_nombre: string; 
}
interface ReservationSummary {
  totalIngresos: number;
  totalReservasCompletadas: number;
  totalIngresosPendientes: number;
  totalReservasPendientes: number;
  detallesCompletadas: Reservation[]; 
  detallesPendientes: Reservation[];
}

const initialState: ServicesState = {
  services: [],
  availabilities: [],
  lastFetchedServiceId: null,
  loading: false,
  error: null,
  isUserAssigned: null,
  uploadProofOfPaymentStatus: "idle",
  fetchedServiceIds: [],
  serviceImages: {},
  serviceOptions: {},
  reservationsForAssistant: [],
  reservationsForUser: [],
  newReservationsCount: 0,
  serviceData: {}, // Inicializar el objeto que almacenará los datos de cada servicio

  reservationsSummary: {
    totalIngresos: 0,
    totalReservasCompletadas: 0,
    totalIngresosPendientes: 0,
    totalReservasPendientes: 0,
    detallesCompletadas: [], 
    detallesPendientes: [], 
  },
};

const assignCategory = (serviceTitle: string): string => {
  switch (serviceTitle) {
    case "Maquillaje Artístico":
    case "Quinceañeras":
    case "Automaquillaje":
      return "Maquillaje";
    case "Uñas":
    case "Depilación":
    case "Dermatología":
      return "Belleza";
    default:
      return "";
  }
};
export const clearError = createAction("services/clearError");

export const resetReservationsSummary = createAction(
  "services/resetReservationsSummary"
);

export const fetchReservationsSummary = createAsyncThunk(
  "services/fetchReservationsSummary",
  async (args: FetchReservationsSummaryArgs, { rejectWithValue }) => {
    // Verificar si las fechas son válidas antes de hacer la solicitud
    if (
      !args.fechaInicio ||
      !args.fechaFin ||
      !moment(args.fechaInicio, "YYYY-MM-DD", true).isValid() ||
      !moment(args.fechaFin, "YYYY-MM-DD", true).isValid()
    ) {
      return rejectWithValue({
        errorMessage: "Por favor, proporciona un rango de fechas válido.",
      });
    }

    const userToken = localStorage.getItem("jwt"); // Obtiene el token del almacenamiento local
    if (!userToken) {
      return rejectWithValue({
        errorMessage: "No estás autenticado. Por favor, inicia sesión.",
      });
    }

    try {
      const response = await axios.get(
        `https://asdasdasd3.onrender.com/api/servicios/reservas/cierreCaja`,
        {
          params: { fechaInicio: args.fechaInicio, fechaFin: args.fechaFin },
          headers: {
            "x-auth-token": userToken,
          },
        }
      );

      // Verifica si la respuesta no contiene reservas
      if (
        response.data &&
        response.data.detallesCompletadas.length === 0 &&
        response.data.detallesPendientes.length === 0
      ) {
        return rejectWithValue({
          errorMessage:
            "No se encontraron reservas para el rango de fechas seleccionado.",
        });
      }

      return response.data;
    } catch (error) {
      let errorMessage = "Error al obtener el resumen de reservas";
      if (axios.isAxiosError(error)) {
        // Acceso seguro al mensaje de error del backend si está disponible
        errorMessage = error.response?.data?.message || errorMessage;
      }
      return rejectWithValue({ errorMessage });
    }
  }
);

export const markReservationAsPending = createAsyncThunk<
  string,
  number,
  { rejectValue: { errorMessage: string } }
>("services/markReservationAsPending", async (reservationId, thunkAPI) => {
  try {
    const response = await axios.put(
      `https://asdasdasd3.onrender.com/api/servicios/reservas/${reservationId}/pendiente`
    );
    return response.data.message;
  } catch (error) {
    return thunkAPI.rejectWithValue({ errorMessage: (error as Error).message });
  }
});

export const deleteReservation = createAsyncThunk(
  "services/deleteReservation",
  async (reservationId: number, thunkAPI) => {
    try {
      const response = await axios.delete(
        `https://asdasdasd3.onrender.com/api/servicios/reservas/${reservationId}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        errorMessage: (error as Error).message,
      });
    }
  }
);
export const markReservationAsCompleted = createAsyncThunk<
  string,
  number, // Pasar el ID de la reserva
  { rejectValue: { errorMessage: string } }
>("services/markReservationAsCompleted", async (reservationId, thunkAPI) => {
  try {
    const response = await axios.put(
      `https://asdasdasd3.onrender.com/api/servicios/reservas/${reservationId}/completar`
    );
    return response.data.message;
  } catch (error) {
    return thunkAPI.rejectWithValue({ errorMessage: (error as Error).message });
  }
});

export const fetchReservationsForUser = createAsyncThunk<
  Reservation[],
  string | number
>("services/fetchReservationsForUser", async (userId) => {

  const response = await axios.get(
    `https://asdasdasd3.onrender.com/api/servicios/reservasPorUsuario/${userId}`
  );

  return response.data;
});

export const fetchReservationsForAssistant = createAsyncThunk<
  Array<{ serviceId: number; reservations: Reservation[] }>,
  { ayudanteId: number }
>("services/fetchReservationsForAssistant", async (params, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const services = state.services.services;

  const allReservations = [];

  for (const service of services) {
    const serviceId = service.id;
    const response = await axios.get(
      `https://asdasdasd3.onrender.com/api/servicios/${serviceId}/reservasPorAyudante/${params.ayudanteId}`
    );
    if (response.data.length > 0) {
      allReservations.push({
        serviceId: serviceId,
        reservations: response.data,
      });
    }
  }

  return allReservations;
});

export const deleteServiceOption = createAsyncThunk(
  "services/deleteServiceOption",
  async (optionId: number) => {
    const userToken = localStorage.getItem("jwt");
    if (!userToken) {
      throw new Error("No estás autenticado. Por favor, inicia sesión.");
    }
    await axios.delete(
      `https://asdasdasd3.onrender.com/api/servicios/options/${optionId}`,
      {
        headers: {
          "x-auth-token": userToken,
        },
      }
    );
    return optionId;
  }
);

export const editServiceOption = createAsyncThunk(
  "services/editServiceOption",
  async (data: { optionId: number; name: string; price: number }) => {
    const userToken = localStorage.getItem("jwt");
    if (!userToken) {
      throw new Error("No estás autenticado. Por favor, inicia sesión.");
    }

    const response = await axios.put(
      `https://asdasdasd3.onrender.com/api/servicios/options/${data.optionId}`,
      {
        nombre: data.name,
        precio: data.price,
      },
      {
        headers: {
          "x-auth-token": userToken,
        },
      }
    );

    // Destructuramos el serviceId de la respuesta
    const { serviceId } = response.data;

    // Devolvemos el serviceId y la opción actualizada en el payload
    return {
      serviceId,
      option: {
        id: data.optionId,
        nombre: data.name,
        precio: data.price,
      },
    };
  }
);

export const fetchServiceOptions = createAsyncThunk(
  "services/fetchServiceOptions",
  async (serviceId: number, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://asdasdasd3.onrender.com/api/servicios/${serviceId}/options`
      );
      return { serviceId, options: response.data };
    } catch (error) {
      let errorMessage = "Ha ocurrido un error desconocido";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
     
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
export const addServiceOption = createAsyncThunk(
  "services/addServiceOption",
  async (data: { serviceId: number; name: string; price: number }) => {
    const userToken = localStorage.getItem("jwt");
    if (!userToken) {
      throw new Error("No estás autenticado. Por favor, inicia sesión.");
    }
    const response = await axios.post(
      `https://asdasdasd3.onrender.com/api/servicios/${data.serviceId}/options`,
      {
        nombre: data.name,
        precio: data.price,
      },
      {
        headers: {
          "x-auth-token": userToken,
        },
      }
    );
    return response.data;
  }
);

export const uploadServiceImages = createAsyncThunk(
  "services/uploadServiceImages",
  async (data: { serviceId: number; images: FormData }) => {
    const userToken = localStorage.getItem("jwt");
    if (!userToken) {
      throw new Error("No estás autenticado. Por favor, inicia sesión.");
    }

    const formData = data.images;

    try {
      const response = await axios.post(
        `https://asdasdasd3.onrender.com/api/servicios/${data.serviceId}/uploadImages`,
        formData,
        {
          headers: {
            "x-auth-token": userToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );


      // Extraer solo las rutas de las imágenes de la respuesta
      const uploadedImagePaths = response.data.imagePaths;

      return { serviceId: data.serviceId, imagePaths: uploadedImagePaths };
    } catch (error) {
      throw error;
    }
  }
);

export const deleteServiceImage = createAsyncThunk(
  "services/deleteServiceImage",
  async (data: { serviceId: number; imagePath: string }) => {
    const userToken = localStorage.getItem("jwt");
    if (!userToken) {
      throw new Error("No estás autenticado. Por favor, inicia sesión.");
    }

    try {
      const response = await axios.delete(
        `https://asdasdasd3.onrender.com/api/servicios/${data.serviceId}/deleteImage`,
        {
          headers: {
            "x-auth-token": userToken,
            "Content-Type": "application/json",
          },
          data: { imagePath: data.imagePath },
        }
      );

      return { serviceId: data.serviceId, imagePath: data.imagePath };
    } catch (error) {
      throw error;
    }
  }
);

export const fetchServiceImages = createAsyncThunk(
  "services/fetchServiceImages",
  async (serviceId: number) => {
    const userToken = localStorage.getItem("jwt");
    if (!userToken) {
      throw new Error("No estás autenticado. Por favor, inicia sesión.");
    }

    try {
      const response = await axios.get(
        `https://asdasdasd3.onrender.com/api/servicios/${serviceId}/images`,
        {
          headers: {
            "x-auth-token": userToken,
          },
        }
      );


      return { serviceId, images: response.data };
    } catch (error) {
      throw error;
    }
  }
);

export const updateSocialLinks = createAsyncThunk(
  "services/updateSocialLinks",
  async (data: {
    serviceId: number;
    facebook_url: string;
    whatsapp_url: string;
    instagram_url: string;
  }) => {
    const userToken = localStorage.getItem("jwt");
    if (!userToken) {
      throw new Error("No estás autenticado. Por favor, inicia sesión.");
    }
    await axios.put(
      `https://asdasdasd3.onrender.com/api/servicios/${data.serviceId}/socialLinks`,
      {
        facebook_url: data.facebook_url,
        whatsapp_url: data.whatsapp_url,
        instagram_url: data.instagram_url,
      },
      {
        headers: {
          "x-auth-token": userToken,
          "Content-Type": "application/json",
        },
      }
    );
    return {
      serviceId: data.serviceId,
      facebook_url: data.facebook_url,
      whatsapp_url: data.whatsapp_url,
      instagram_url: data.instagram_url,
    };
  }
);

export const updateServiceDescription = createAsyncThunk(
  "services/updateServiceDescription",
  async (data: { serviceId: number; newDescription: string }) => {
    const userToken = localStorage.getItem("jwt");
    if (!userToken) {
      throw new Error("No estás autenticado. Por favor, inicia sesión.");
    }
    await axios.put(
      `https://asdasdasd3.onrender.com/api/servicios/${data.serviceId}`,
      { modal_description: data.newDescription },
      {
        headers: {
          "x-auth-token": userToken,
          "Content-Type": "application/json",
        },
      }
    );
    return { serviceId: data.serviceId, newDescription: data.newDescription };
  }
);

export const uploadProofOfPayment = createAsyncThunk(
  "services/uploadProofOfPayment",
  async (data: {
    serviceId: number;
    disponibilidadId: number;
    file: File;
    selectedOptions: ServiceOption[];
  }) => {

    const userToken = localStorage.getItem("jwt");
    if (!userToken) {
      throw new Error("No estás autenticado. Por favor, inicia sesión.");
    }

    const totalPrecio = data.selectedOptions.reduce(
      (sum, option) => sum + (option.precio || 0),
      0
    );

    const formData = new FormData();
    formData.append("comprobante", data.file);
    formData.append("precio", totalPrecio.toString());
    formData.append(
      "selectedOptionNames",
      JSON.stringify(data.selectedOptions.map((opt) => opt.nombre))
    );

    const response = await axios.post(
      `https://asdasdasd3.onrender.com/api/servicios/${data.serviceId}/availabilities/${data.disponibilidadId}/uploadProof`,
      formData,
      {
        headers: {
          "x-auth-token": userToken,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return { availabilityId: response.data.availabilityId };
  }
);

export const checkIfUserIsAssigned = createAsyncThunk(
  "services/checkIfUserIsAssigned",
  async (serviceId: number, {}) => {
    const userToken = localStorage.getItem("jwt");
    if (!userToken) {
      throw new Error("No estás autenticado. Por favor, inicia sesión.");
    }
    const response = await axios.get(
      `https://asdasdasd3.onrender.com/api/servicios/${serviceId}/isUserAssigned`,
      {
        headers: {
          "x-auth-token": userToken,
        },
      }
    );
    return response.data.isAssigned;
  }
);
export const deleteAvailability = createAsyncThunk(
  "services/deleteAvailability",
  async (availabilityId: number) => {
    const userToken = localStorage.getItem("jwt");
    if (!userToken) {
      throw new Error("No estás autenticado. Por favor, inicia sesión.");
    }
    await axios.delete(
      `https://asdasdasd3.onrender.com/api/servicios/availability/${availabilityId}`,
      {
        headers: {
          "x-auth-token": userToken,
        },
      }
    );
    return availabilityId;
  }
);

export const fetchAvailabilities = createAsyncThunk(
  "services/fetchAvailabilities",
  async (serviceId: number) => {
    const userToken = localStorage.getItem("jwt");
    if (!userToken) {
      throw new Error("No estás autenticado. Por favor, inicia sesión.");
    }
    const response = await axios.get(
      `https://asdasdasd3.onrender.com/api/servicios/${serviceId}/availabilities`,
      {
        headers: {
          "x-auth-token": userToken,
        },
      }
    );

    return response.data as Availability[];
  }
);

export const addAvailability = createAsyncThunk(
  "services/addAvailability",
  async (data: {
    serviceId: number;
    fechaInicio: string;
    fechaFin: string;
  }) => {
    const userToken = localStorage.getItem("jwt");
    if (!userToken) {
      throw new Error("No estás autenticado. Por favor, inicia sesión.");
    }
    await axios.post(
      `https://asdasdasd3.onrender.com/api/servicios/${data.serviceId}/addAvailability`,
      {
        fechaInicio: data.fechaInicio,
        fechaFin: data.fechaFin,
        estado: "disponible", 
      },
      {
        headers: {
          "x-auth-token": userToken,
        },
      }
    );

    // Devolvemos el serviceId para usarlo más adelante
    return data.serviceId;
  }
);

export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async (_, { dispatch }) => {
    const response = await axios.get(
      "https://asdasdasd3.onrender.com/api/servicios"
    );
    const data = response.data as Service[];

    const servicesWithCategoryAndIcon = data.map((service) => {
      const enhancedService = {
        ...service,
        icon: service.icon_name || "",
        category: assignCategory(service.title),
      };

      // Almacenar los datos del servicio individual en el estado serviceData
      dispatch(setServiceData(enhancedService));

      return enhancedService;
    });

    return servicesWithCategoryAndIcon;
  }
);

export const reserveAvailability = createAsyncThunk(
  "services/reserveAvailability",
  async (data: { serviceId: number; availabilityId: number }) => {
    const userToken = localStorage.getItem("jwt");
    if (!userToken) {
      throw new Error("No estás autenticado. Por favor, inicia sesión.");
    }
    const response = await axios.post(
      `https://asdasdasd3.onrender.com/api/servicios/${data.serviceId}/reserve/${data.availabilityId}`,
      {},
      {
        headers: {
          "x-auth-token": userToken,
        },
      }
    );
    // Usar la respuesta para devolver las fechas de inicio y fin
    return {
      availabilityId: data.availabilityId,
      fecha_inicio: response.data.fecha_inicio,
      fecha_fin: response.data.fecha_fin,
    };
  }
);

export const completeReservation = createAsyncThunk(
  "services/completeReservation",
  async (reservaId: number) => {
    const userToken = localStorage.getItem("jwt");
    if (!userToken) {
      throw new Error("No estás autenticado. Por favor, inicia sesión.");
    }
    await axios.post(
      `https://asdasdasd3.onrender.com/api/servicios/reservations/${reservaId}/complete`,
      {},
      {
        headers: {
          "x-auth-token": userToken,
        },
      }
    );
    return reservaId;
  }
);

export const toggleServiceColor = createAsyncThunk(
  "services/toggleServiceColor",
  async (serviceId: number) => {
    const userToken = localStorage.getItem("jwt");
    if (!userToken) {
      throw new Error("No estás autenticado. Por favor, inicia sesión.");
    }
    const response = await axios.put(
      `https://asdasdasd3.onrender.com/api/servicios/${serviceId}/toggleColor`,
      {},
      {
        headers: {
          "x-auth-token": userToken,
        },
      }
    );
    return { serviceId, color: response.data.color };
  }
);

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setServiceData: (state, action: PayloadAction<Partial<Service>>) => {
      const serviceData = action.payload;
      if (serviceData.id !== undefined) {
        state.serviceData[serviceData.id] = {
          ...state.serviceData[serviceData.id],
          ...serviceData,
        };
      }
    },

    incrementNewReservationsCount: (state) => {
      state.newReservationsCount += 1;
    },
    resetNewReservationsCount: (state) => {
      state.newReservationsCount = 0;
    },
    updateAvailabilityStatus: (
      state,
      action: PayloadAction<{ availabilityId: number; newStatus: string }>
    ) => {
     

      const { availabilityId, newStatus } = action.payload;
      const availability = state.availabilities.find(
        (a) => a.id === availabilityId
      );
      if (availability) {
        availability.estado = newStatus;
      }
    },

    setServiceDescription: (
      state,
      action: PayloadAction<{ serviceId: number; newDescription: string }>
    ) => {
      // Desestructurando el payload para obtener serviceId y newDescription
      const { serviceId, newDescription } = action.payload;

      // Buscando el servicio correspondiente en state.services
      const serviceToUpdate = state.services.find((s) => s.id === serviceId);

      // Si se encuentra el servicio, actualiza su modal_description
      if (serviceToUpdate) {
        serviceToUpdate.modal_description = newDescription;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(clearError, (state) => {
        state.error = null;
      })

      .addCase(resetReservationsSummary, (state) => {
        state.reservationsSummary = initialState.reservationsSummary;
      })
      .addCase(fetchReservationsSummary.fulfilled, (state, action) => {
        state.reservationsSummary = action.payload;
        state.error = null; // Limpia errores previos si la solicitud es exitosa
      })
      .addCase(
        fetchReservationsSummary.rejected,
        (
          state,
          action: PayloadAction<unknown, string, never, SerializedError>
        ) => {
          const error = action.error as SerializedError;
          const payload = action.payload as ErrorResponse | undefined;
          state.error = payload
            ? payload.errorMessage
            : error.message ||
              "Error desconocido al obtener el resumen de reservas";
        }
      )
      .addCase(markReservationAsPending.fulfilled, (state, action) => {
        const reservationIdToUpdate = action.meta.arg;
        const indexToUpdate = state.reservationsForAssistant.findIndex(
          (reservation) => reservation.id === reservationIdToUpdate
        );

        if (indexToUpdate !== -1) {
          state.reservationsForAssistant[indexToUpdate].estado = "pendiente";
        }
      })
      .addCase(markReservationAsPending.rejected, (state, action) => {
       
      })

      .addCase(deleteReservation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReservation.fulfilled, (state, action) => {
        state.loading = false;
        // Remover la reserva de la lista en el estado
        state.reservationsForAssistant = state.reservationsForAssistant.filter(
          (reservation) => reservation.id !== action.meta.arg
        );
      })
      .addCase(deleteReservation.rejected, (state, action) => {
        state.loading = false;
        const payload = action.payload as { errorMessage?: string };
        if (payload && payload.errorMessage) {
          state.error = payload.errorMessage;
        } else {
          state.error = action.error.message || null;
        }
      })

      .addCase(markReservationAsCompleted.fulfilled, (state, action) => {
        const reservationIdToUpdate = action.meta.arg;
        const indexToUpdate = state.reservationsForAssistant.findIndex(
          (reservation) => reservation.id === reservationIdToUpdate
        );

        if (indexToUpdate !== -1) {
          state.reservationsForAssistant[indexToUpdate].estado = "completado";
        }
      })
      .addCase(markReservationAsCompleted.rejected, (state, action) => {
       
      })

      .addCase(fetchReservationsForUser.fulfilled, (state, action) => {
        state.reservationsForUser = action.payload;
        state.loading = false;
      })
      .addCase(fetchReservationsForAssistant.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchReservationsForAssistant.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Error fetching reservations for assistant";
      })
      .addCase(fetchReservationsForAssistant.fulfilled, (state, action) => {
        state.loading = false;

        for (const payload of action.payload) {
          

          const newReservations = payload.reservations
            .filter(
              (reservation) =>
                !state.reservationsForAssistant.some(
                  (r) => r.id === reservation.id
                )
            )
            .map((reservation) => ({
              ...reservation,
              serviceId: payload.serviceId,
            }));

          state.reservationsForAssistant = [
            ...state.reservationsForAssistant,
            ...newReservations,
          ];
        }
      })

      .addCase(addServiceOption.fulfilled, (state, action) => {
        const { serviceId, option } = action.payload;
        if (!state.serviceOptions[serviceId]) {
          state.serviceOptions[serviceId] = [];
        }
        state.serviceOptions[serviceId].push(option);
      })
      .addCase(fetchServiceOptions.fulfilled, (state, action) => {
        const { serviceId, options } = action.payload;
        state.serviceOptions[serviceId] = options;
      })
      .addCase(editServiceOption.fulfilled, (state, action) => {
        const { serviceId, option } = action.payload;

        // Asegurarse de que state.serviceOptions[serviceId] exista antes de continuar.
        if (!state.serviceOptions[serviceId]) {
       
          return;
        }

        const index = state.serviceOptions[serviceId].findIndex(
          (opt) => opt.id === option.id
        );

        if (index !== -1) {
          state.serviceOptions[serviceId][index] = option;
        }
      })

      .addCase(deleteServiceOption.fulfilled, (state, action) => {
        const optionId = action.payload;
        for (const serviceId in state.serviceOptions) {
          state.serviceOptions[serviceId] = state.serviceOptions[
            serviceId
          ].filter((opt) => opt.id !== optionId);
        }
      })

      .addCase(uploadServiceImages.fulfilled, (state, action) => {
      

        const serviceToUpdate = state.services.find(
          (s) => s.id === action.payload.serviceId
        );

        if (serviceToUpdate) {
          // Actualizar las imágenes del servicio
          if (Array.isArray(serviceToUpdate.images)) {
            serviceToUpdate.images = [
              ...serviceToUpdate.images,
              ...action.payload.imagePaths,
            ];
          } else {
            serviceToUpdate.images = [...action.payload.imagePaths];
          }

          // Actualizar el objeto serviceImages
          if (!state.serviceImages[action.payload.serviceId]) {
            state.serviceImages[action.payload.serviceId] = [];
          }
          state.serviceImages[action.payload.serviceId] = [
            ...state.serviceImages[action.payload.serviceId],
            ...action.payload.imagePaths,
          ];
        }
      })

      .addCase(deleteServiceImage.fulfilled, (state, action) => {
        const serviceToUpdate = state.services.find(
          (s) => s.id === action.payload.serviceId
        );
        if (serviceToUpdate) {
          const updatedImages = serviceToUpdate.images
            ? serviceToUpdate.images.filter(
                (path) => path !== action.payload.imagePath
              )
            : [];

          serviceToUpdate.images = updatedImages;
          state.serviceImages[action.payload.serviceId] = updatedImages;
        }
      })

      .addCase(fetchServiceImages.fulfilled, (state, action) => {
        const serviceToUpdate = state.services.find(
          (s) => s.id === action.payload.serviceId
        );
        if (serviceToUpdate) {
          serviceToUpdate.images = action.payload.images;
          state.serviceImages[action.payload.serviceId] = action.payload.images;
        }
      })

      .addCase(updateSocialLinks.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateSocialLinks.fulfilled,
        (
          state,
          action: PayloadAction<{
            serviceId: number;
            facebook_url: string;
            whatsapp_url: string;
            instagram_url: string;
          }>
        ) => {
          state.loading = false;
          const { serviceId, facebook_url, whatsapp_url, instagram_url } =
            action.payload;
          const serviceToUpdate = state.services.find(
            (s) => s.id === serviceId
          );
          if (serviceToUpdate) {
            serviceToUpdate.facebook_url = facebook_url;
            serviceToUpdate.whatsapp_url = whatsapp_url;
            serviceToUpdate.instagram_url = instagram_url;
          }
        }
      )

      .addCase(updateSocialLinks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error updating social links";
      })
      .addCase(updateServiceDescription.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateServiceDescription.fulfilled,
        (
          state,
          action: PayloadAction<{ serviceId: number; newDescription: string }>
        ) => {
          state.loading = false;
          const { serviceId, newDescription } = action.payload;
          const serviceToUpdate = state.services.find(
            (s) => s.id === serviceId
          );
          if (serviceToUpdate) {
            serviceToUpdate.modal_description = newDescription;
          }
        }
      )
      .addCase(updateServiceDescription.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Error updating service description";
      })
      .addCase(uploadProofOfPayment.pending, (state) => {
        state.uploadProofOfPaymentStatus = "loading"; 
      })
      .addCase(
        uploadProofOfPayment.fulfilled,
        (state, action: PayloadAction<{ availabilityId: number }>) => {
          state.uploadProofOfPaymentStatus = "fulfilled"; 
          state.loading = false;

          const availabilityId = action.payload.availabilityId;

          // Encuentra y actualiza la disponibilidad en el estado
          const availability = state.availabilities.find(
            (a) => a.id === availabilityId
          );
          if (availability) {
            availability.estado = "reservado";
          }
        }
      )
      .addCase(uploadProofOfPayment.rejected, (state) => {
        state.uploadProofOfPaymentStatus = "failed"; 
      })

      .addCase(reserveAvailability.pending, (state) => {
        state.loading = true;
      })
      .addCase(reserveAvailability.fulfilled, (state, action) => {
        // Detener la carga y actualizar la reserva específica
        state.loading = false;
        const availabilityToReserve = state.availabilities.find(
          (availability) => availability.id === action.payload.availabilityId
        );

        if (availabilityToReserve) {
          availabilityToReserve.estado = "reservado";
          availabilityToReserve.fecha_inicio_reserva =
            action.payload.fecha_inicio;
          availabilityToReserve.fecha_fin_reserva = action.payload.fecha_fin;
        }

        // Incrementar el contador de nuevas reservas
        state.newReservationsCount += 1;
      })
      .addCase(reserveAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Error al reservar la disponibilidad";
      })
      .addCase(completeReservation.pending, (state) => {
        state.loading = true;
      })
      .addCase(completeReservation.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(completeReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error al completar la reserva";
      })
      .addCase(deleteAvailability.fulfilled, (state, action) => {
        const availabilityId = action.payload;
        state.availabilities = state.availabilities.filter(
          (a) => a.id !== availabilityId
        );
      })
      .addCase(deleteAvailability.rejected, (state, action) => {
        state.error =
          action.error.message || "Error al eliminar la disponibilidad";
      })

      .addCase(checkIfUserIsAssigned.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        checkIfUserIsAssigned.fulfilled,
        (state, action: PayloadAction<boolean>) => {
          state.loading = false;
          state.isUserAssigned = action.payload;
        }
      )
      .addCase(checkIfUserIsAssigned.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Error al verificar la asignación";
      })
      .addCase(addAvailability.fulfilled, () => {
      
      })
      .addCase(fetchAvailabilities.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchAvailabilities.fulfilled,
        (
          state,
          action: PayloadAction<Availability[], string, { arg: number }>
        ) => {
          state.loading = false;
          state.availabilities = action.payload;
          state.lastFetchedServiceId = action.meta.arg;

        }
      )

      .addCase(fetchAvailabilities.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Error al obtener las disponibilidades";
      })
      .addCase(addAvailability.rejected, (state, action) => {
        state.error = action.error.message || "Error al agregar disponibilidad";
      })
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchServices.fulfilled,
        (state, action: PayloadAction<Service[]>) => {
          state.loading = false;
          state.services = action.payload;

          // Actualizar serviceData con cada servicio obtenido
          action.payload.forEach((service) => {
            state.serviceData[service.id] = service;
          });
        }
      )
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching services";
      })
      .addCase(toggleServiceColor.fulfilled, (state, action) => {
        const { serviceId, color } = action.payload;
        const service = state.services.find((s) => s.id === serviceId);
        if (service) {
          service.color = color;
        }
      });
  },
});
export const {
  updateAvailabilityStatus,
  setServiceDescription,
  incrementNewReservationsCount,
  resetNewReservationsCount,
  setServiceData, 
} = servicesSlice.actions;

export default servicesSlice.reducer;
