import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface HorarioDisponibilidad {
  dia_semana: string;
  hora_inicio: string;
  hora_fin: string;
}
export interface ReservaConHorarios {
  id?: number;
  disponibilidad_id: number;
  usuario_id: number;
  estado: "pendiente" | "completada";
  fecha_reserva?: string;
  curso_nombre?: string; // Nombre del curso
  horarios: HorarioDisponibilidad[];
  usuario_nombre?: string; // Nuevo campo para el nombre del usuario
}

interface Disponibilidad {
  id: number;
  curso_id: number;
  fecha_inicio: string;
  fecha_fin: string;
  max_reservas: number;
  horarios?: HorarioDisponibilidad[];
}

interface CursoConDisponibilidades extends Curso {
  disponibilidades?: Disponibilidad[];
}

// Define las interfaces directamente en este archivo
interface Clase {
  id: number;
  curso_id: number;
  titulo: string;
  descripcion: string;
  orden: number;
  video_url?: string;
  material_adicional?: string;
}
interface ImagenCurso {
  id: number;
  curso_id: number;
  url_imagen: string;
  descripcion?: string;
}
interface Curso {
  id: number;
  nombre: string;
  descripcion: string;
  duracion?: string;
  nivel?: string;
  imagen_principal?: string;
  precio: number;
  fecha_inicio: string;
  fecha_fin: string;
  clases: Clase[];
  imagenes: ImagenCurso[];
}
interface ImagenUploadResponse {
  message: string;
  path: string;
}
interface ActualizarEstadoReservaPayload {
  reservaId: number;
  estado: "pendiente" | "completada";
}

interface CursoState {
  cursoActual: CursoConDisponibilidades | null;
  cursos: Curso[]; // Agregar esta línea si quieres manejar una lista de cursos
  disponibilidades: Disponibilidad[];
  loading: boolean;
  error: string | null;
  reservas: ReservaConHorarios[]; // Asegúrate de que este tipo sea compatible con tu nueva estructura
}
export const actualizarEstadoReservaCurso = createAsyncThunk(
  "cursos/actualizarEstadoReservaCurso",
  async (
    { reservaId, estado }: ActualizarEstadoReservaPayload,
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `http://localhost:3002/api/reservas/cursos/${reservaId}/estado`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ estado: estado }),
        }
      );
      if (!response.ok)
        throw new Error("Error al actualizar estado de la reserva");
      console.log("Reserva actualizada:", { reservaId, estado });

      return { reservaId, estado: estado };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Ocurrió un error desconocido");
    }
  }
);

export const eliminarReservaCurso = createAsyncThunk(
  "cursos/eliminarReservaCurso",
  async (reservaId: number, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:3002/api/reservas/cursos/${reservaId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Error al eliminar reserva");
      return reservaId;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Ocurrió un error desconocido");
    }
  }
);

export const fetchTodasLasReservas = createAsyncThunk(
  "cursos/fetchTodasLasReservas",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3002/api/reservas/todas`);
      if (!response.ok) {
        throw new Error("Error al obtener todas las reservas");
      }
      const reservas = await response.json();
      return reservas as ReservaConHorarios[];
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Error desconocido"
      );
    }
  }
);

export const updateCursoPrecio = createAsyncThunk<
  { message: string; cursoId: number; nuevoPrecio: number },
  { cursoId: number; nuevoPrecio: number },
  { rejectValue: string }
>(
  "cursos/updateCursoPrecio",
  async ({ cursoId, nuevoPrecio }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:3002/api/cursos/${cursoId}/precio`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ precio: nuevoPrecio }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar el precio del curso");
      }

      const data = await response.json();
      return { message: data.message, cursoId, nuevoPrecio };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Error desconocido"
      );
    }
  }
);

export const fetchReservasAdminPorCurso = createAsyncThunk<
  ReservaConHorarios[],
  { cursoId: number },
  { rejectValue: string }
>(
  "cursos/fetchReservasAdminPorCurso",
  async ({ cursoId }, { rejectWithValue }) => {
    try {
      console.log(`Fetching admin reservations for course: ${cursoId}`);

      const response = await fetch(
        `http://localhost:3002/api/cursos/${cursoId}/reservas/admin`
      );

      if (!response.ok) {
        throw new Error("Error al obtener reservas para admin");
      }

      const reservas = await response.json();
      return reservas as ReservaConHorarios[];
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Error desconocido"
      );
    }
  }
);

export const fetchReservasPorCursoYUsuario = createAsyncThunk<
  ReservaConHorarios[],
  { usuarioId: number },
  { rejectValue: string }
>(
  "cursos/fetchReservasPorUsuario",
  async ({ usuarioId }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:3002/api/cursos/usuarios/${usuarioId}/reservas`
      );

      if (!response.ok) {
        throw new Error("Error al obtener reservas para el usuario");
      }

      const reservas = await response.json();
      return reservas as ReservaConHorarios[];
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Error desconocido"
      );
    }
  }
);

export const deleteImageFromCurso = createAsyncThunk<
  { message: string; imagenId: number },
  { cursoId: string; imagenId: number },
  { rejectValue: string }
>(
  "cursos/deleteImageFromCurso",
  async ({ cursoId, imagenId }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:3002/api/cursos/${cursoId}/imagenes/${imagenId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("No se pudo eliminar la imagen");
      }

      const data = await response.json();
      return { message: data.message, imagenId }; // Asegúrate de que esto concuerde con la respuesta del servidor
    } catch (error) {
      console.error("Error al eliminar imagen", error);
      return rejectWithValue(
        error instanceof Error ? error.message : "Error desconocido"
      );
    }
  }
);

export const agregarHorariosDisponibilidad = createAsyncThunk<
  HorarioDisponibilidad[],
  { disponibilidadId: number; horarios: HorarioDisponibilidad[] },
  { rejectValue: string }
>(
  "cursos/agregarHorariosDisponibilidad",
  async ({ disponibilidadId, horarios }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:3002/api/disponibilidades/${disponibilidadId}/horarios`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ horarios }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al agregar horarios");
      }

      const horariosAgregados = await response.json();
      return horariosAgregados as HorarioDisponibilidad[];
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Error desconocido"
      );
    }
  }
);

export const fetchDisponibilidades = createAsyncThunk<
  Disponibilidad[],
  number, // Este es el tipo del argumento, que es el ID del curso
  { rejectValue: string }
>("cursos/fetchDisponibilidades", async (cursoId, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `http://localhost:3002/api/cursos/${cursoId}/disponibilidades`
    );
    if (!response.ok) {
      throw new Error("Error al obtener disponibilidades");
    }
    const disponibilidades = await response.json();
    console.log(
      "Disponibilidades recibidas en acción Redux:",
      disponibilidades
    );

    return disponibilidades as Disponibilidad[];
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Error desconocido"
    );
  }
});

// Agregar disponibilidad a un curso

export const agregarDisponibilidad = createAsyncThunk<
  Disponibilidad,
  {
    cursoId: number;
    fecha_inicio: string;
    fecha_fin: string;
    max_reservas: number;
  },
  { rejectValue: string }
>(
  "cursos/agregarDisponibilidad",
  async (
    { cursoId, fecha_inicio, fecha_fin, max_reservas },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `http://localhost:3002/api/cursos/${cursoId}/disponibilidades`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fecha_inicio, fecha_fin, max_reservas }),
        }
      );

      if (!response.ok) {
        // Si el servidor responde con un error, lanzar un error
        throw new Error("Error al agregar disponibilidad");
      }

      const nuevaDisponibilidad = await response.json();

      // Asegúrate de que la respuesta contiene la información esperada
      if (!nuevaDisponibilidad || !nuevaDisponibilidad.id) {
        throw new Error("La disponibilidad creada no contiene un ID válido");
      }

      return nuevaDisponibilidad as Disponibilidad;
    } catch (error) {
      // Rechazar con un mensaje de error personalizado si algo sale mal
      return rejectWithValue(
        error instanceof Error ? error.message : "Error desconocido"
      );
    }
  }
);

// Agregar reserva a una disponibilidad
// Agregar reserva a una disponibilidad
export const agregarReserva = createAsyncThunk<
  ReservaConHorarios, // Tipo de respuesta esperada, ajusta según sea necesario
  ReservaConHorarios, // Tipo de argumento para la acción
  { rejectValue: string }
>("cursos/agregarReserva", async (datosReserva, { rejectWithValue }) => {
  try {
    const response = await fetch(`http://localhost:3002/api/reservas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosReserva),
    });

    if (!response.ok) {
      throw new Error("Error al agregar reserva");
    }

    const nuevaReserva = await response.json();
    return nuevaReserva as ReservaConHorarios;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Error desconocido"
    );
  }
});

export const addImageToCurso = createAsyncThunk<
  ImagenUploadResponse,
  { cursoId: string; imageData: FormData },
  { rejectValue: string }
>(
  "cursos/addImageToCurso",
  async ({ cursoId, imageData }, { rejectWithValue }) => {
    try {
      console.log("Enviando imagen al servidor", { cursoId, imageData });
      const response = await fetch(
        `http://localhost:3002/api/cursos/${cursoId}/imagenes`,
        {
          method: "POST",
          body: imageData,
        }
      );

      if (!response.ok) {
        throw new Error("No se pudo cargar la imagen");
      }

      const data = await response.json();
      console.log("Respuesta del servidor al subir imagen", data);
      return data as ImagenUploadResponse; // Asegúrate de que esto concuerde con la respuesta del servidor
    } catch (error) {
      console.error("Error al subir imagen", error);
      return rejectWithValue(
        error instanceof Error ? error.message : "Error desconocido"
      );
    }
  }
);

export const fetchCursoCompletoById = createAsyncThunk<
  Curso,
  string,
  { rejectValue: string }
>("cursos/fetchCursoCompletoById", async (cursoId, { rejectWithValue }) => {
  try {
    console.log("Solicitando datos del curso", cursoId);
    const response = await fetch(
      `http://localhost:3002/api/cursos/${cursoId}/completo`
    );
    if (!response.ok) {
      throw new Error("No se pudo cargar el curso");
    }
    const curso = await response.json();
    console.log("Datos del curso recibidos", curso);
    return curso as Curso;
  } catch (error) {
    console.error("Error al cargar datos del curso", error);
    return rejectWithValue(
      error instanceof Error ? error.message : "Error desconocido"
    );
  }
});

const initialState: CursoState = {
  cursoActual: null,
  cursos: [], // Inicializar la lista de cursos aquí
  disponibilidades: [],
  reservas: [],
  loading: false,
  error: null,
};
const cursosSlice = createSlice({
  name: "cursos",
  initialState,
  reducers: {
    actualizarDisponibilidad(state, action: PayloadAction<Disponibilidad>) {
      state.disponibilidades.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actualizarEstadoReservaCurso.fulfilled, (state, action) => {
        const { reservaId, estado } = action.payload;
        const reservaIndex = state.reservas.findIndex(
          (reserva) => reserva.id === reservaId
        );
        if (reservaIndex !== -1) {
          state.reservas[reservaIndex].estado = estado;
          console.log(
            "Estado de reserva actualizado en el reducer",
            state.reservas[reservaIndex]
          );
        }
      })
      .addCase(actualizarEstadoReservaCurso.rejected, (state, action) => {
        state.error = action.error.message || "Error desconocido";
      })
      .addCase(eliminarReservaCurso.fulfilled, (state, action) => {
        state.reservas = state.reservas.filter(
          (reserva) => reserva.id !== action.payload
        );
      })
      .addCase(eliminarReservaCurso.rejected, (state, action) => {
        state.error = action.error.message || "Error desconocido";
      })
      .addCase(fetchTodasLasReservas.fulfilled, (state, action) => {
        // Aquí puedes decidir cómo quieres almacenar estas reservas en el estado
        state.reservas = action.payload;
      })
      .addCase(fetchTodasLasReservas.rejected, (state, action) => {
        state.error = action.error.message || "Error desconocido";
      })
      .addCase(updateCursoPrecio.fulfilled, (state, action) => {
        const { cursoId, nuevoPrecio } = action.payload;
        if (state.cursoActual && state.cursoActual.id === cursoId) {
          state.cursoActual.precio = nuevoPrecio;
        }
        // Actualizar el precio en la lista de cursos si la tienes en el estado
        const index = state.cursos.findIndex((curso) => curso.id === cursoId);
        if (index !== -1) {
          state.cursos[index].precio = nuevoPrecio;
        }
      })
      .addCase(updateCursoPrecio.rejected, (state, action) => {
        state.error = action.error?.message || "Error desconocido";
      })
      // Reducer para manejar las reservas obtenidas por el administrador
      .addCase(fetchReservasAdminPorCurso.fulfilled, (state, action) => {
        state.reservas = action.payload; // Asigna directamente las reservas al estado
      })
      .addCase(fetchReservasAdminPorCurso.rejected, (state, action) => {
        state.error = action.error.message || "Error desconocido";
      })

      // Reducer para manejar las reservas obtenidas por usuario y curso
      .addCase(fetchReservasPorCursoYUsuario.fulfilled, (state, action) => {
        state.reservas = action.payload; // Asigna directamente las reservas al estado
      })
      .addCase(fetchReservasPorCursoYUsuario.rejected, (state, action) => {
        state.error = action.error.message || "Error desconocido";
      })
      .addCase(agregarReserva.fulfilled, (state, action) => {
        // Asegúrate de que la acción devuelva un objeto de tipo ReservaConHorarios
        const nuevaReserva: ReservaConHorarios = action.payload;
        state.reservas.push(nuevaReserva);
      })
      .addCase(deleteImageFromCurso.fulfilled, (state, action) => {
        if (state.cursoActual && state.cursoActual.imagenes) {
          // Filtrar y eliminar la imagen del array 'imagenes'
          state.cursoActual.imagenes = state.cursoActual.imagenes.filter(
            (imagen) => imagen.id !== action.payload.imagenId
          );
        }
      })
      .addCase(deleteImageFromCurso.rejected, (state, action) => {
        state.error = action.error?.message || "Error desconocido";
      })
      .addCase(agregarHorariosDisponibilidad.fulfilled, (state, action) => {
        const index = state.disponibilidades.findIndex(
          (disponibilidad) =>
            disponibilidad.id === action.meta.arg.disponibilidadId
        );
        if (index !== -1) {
          state.disponibilidades[index].horarios = action.payload;
        }
      })
      .addCase(fetchDisponibilidades.fulfilled, (state, action) => {
        state.disponibilidades = action.payload;
      })
      .addCase(fetchDisponibilidades.rejected, (state, action) => {
        state.error = action.error?.message || "Error desconocido";
      })
      .addCase(agregarDisponibilidad.fulfilled, (state, action) => {
        // Aquí manejas la acción cuando se completa con éxito
        state.disponibilidades.push(action.payload);
      })
      .addCase(agregarDisponibilidad.rejected, (state, action) => {
        // Aquí manejas la acción cuando falla
        state.error = action.error.message || "Error desconocido";
      })

      .addCase(addImageToCurso.fulfilled, (state, action) => {
        if (state.cursoActual && state.cursoActual.imagenes) {
          // Suponiendo que el backend devuelve el ID de la nueva imagen
          const nuevaImagen: ImagenCurso = {
            id: state.cursoActual.imagenes.length + 1, // O el ID devuelto por el backend si está disponible
            curso_id: parseInt(action.meta.arg.cursoId),
            url_imagen: action.payload.path,
            descripcion: "",
          };
          state.cursoActual.imagenes.push(nuevaImagen);
        }
      })
      .addCase(addImageToCurso.rejected, (state, action) => {
        state.error = action.error?.message || "Error desconocido";
      })
      .addCase(fetchCursoCompletoById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCursoCompletoById.fulfilled, (state, action) => {
        state.cursoActual = action.payload;
        state.loading = false;
      })
      .addCase(fetchCursoCompletoById.rejected, (state, action) => {
        state.error = action.error?.message || "Error desconocido";
        state.loading = false;
      });
  },
});
export const { actualizarDisponibilidad } = cursosSlice.actions;

export default cursosSlice.reducer;
