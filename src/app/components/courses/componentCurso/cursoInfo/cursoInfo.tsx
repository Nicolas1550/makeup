import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import CardContent from "@mui/material/CardContent";
import { CursoInfoContainer } from "../clasesList/clasesListStyled";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/store/appHooks";
import {
  agregarDisponibilidad,
  agregarHorariosDisponibilidad,
  fetchDisponibilidades,
  updateCursoPrecio,
  actualizarEstadoDisponibilidad,
} from "@/app/redux/coursesSlice/coursesSlice";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {
  DisponibilidadContainer,
  DisponibilidadInfo,
  HorarioInfo,
  ReservarButton,
  ScrollableContainer,
  VerMasButton,
} from "./cursoInfoStyles";
import Select, { SingleValue } from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence, motion } from "framer-motion";
import { format } from "date-fns";
import ReservaModal from "./reservaModel"; // Asegúrate de importar correctamente ReservaModal
import {
  ButtonGroup,
  FormContainer,
  InputGroup,
  StyledAddButton,
  StyledButton,
  StyledInput,
  StyledLabel,
  StyledModal,
  StyledSubmitButton,
} from "./stylesDisp";

interface OptionType {
  value: string;
  label: string;
}
// Asumiendo que estos tipos ya están definidos en otro lugar
type Curso = {
  id: number;
  nombre?: string;
  descripcion?: string;
  duracion?: string;
  nivel?: string;
  precio?: number;
  fecha_inicio?: string;
  fecha_fin?: string;
};
interface HorarioDisponibilidad {
  dia_semana: string;
  hora_inicio: string;
  hora_fin: string;
}

interface Disponibilidad {
  id: number;
  curso_id: number;
  fecha_inicio: string;
  fecha_fin: string;
  max_reservas: number;
  horarios?: HorarioDisponibilidad[];
  reservasActuales?: number;
  estado?: string; // Agrega esta línea
}

type CursoInfoProps = {
  curso?: Curso | null;
};

const CursoInfo: React.FC<CursoInfoProps> = ({ curso }) => {
  const dispatch = useAppDispatch();
  const disponibilidades = useAppSelector(
    (state) => state.cursos.disponibilidades
  );
  const disponibilidadesActivas = disponibilidades.filter(
    (d) => d.estado === "activa"
  );

  const [isReservaModalOpen, setIsReservaModalOpen] = useState(false);
  const [disponibilidadSeleccionada, setDisponibilidadSeleccionada] =
    useState<Disponibilidad | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showForm, setShowForm] = useState(false);
  const [nuevaDisponibilidad, setNuevaDisponibilidad] = useState({
    fecha_inicio: "",
    fecha_fin: "",
    max_reservas: 1,
  });
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const maxInicialDisponibilidades = 5;
  const [cantidadMostrada, setCantidadMostrada] = useState(
    maxInicialDisponibilidades
  );
  const [nuevoPrecio, setNuevoPrecio] = useState(curso?.precio || 0);
  const formRef = useRef(null);

  const [mostrarTodas, setMostrarTodas] = useState(false);

  const formatHorarios = (horarios: HorarioDisponibilidad[]) => {
    if (horarios.length > 1) {
      return horarios
        .map(
          (h) =>
            `Los ${h.dia_semana} De ${h.hora_inicio.slice(
              0,
              5
            )} hs a ${h.hora_fin.slice(0, 5)} hs`
        )
        .join(" Y ");
    } else if (horarios.length === 1) {
      return `Los ${horarios[0].dia_semana} De ${horarios[0].hora_inicio.slice(
        0,
        5
      )} hs a ${horarios[0].hora_fin.slice(0, 5)} hs`;
    } else {
      return "No hay horarios definidos";
    }
  };
  const handlePrecioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNuevoPrecio(Number(e.target.value));
  };
  const actualizarPrecio = () => {
    if (curso?.id) {
      dispatch(updateCursoPrecio({ cursoId: curso.id, nuevoPrecio }))
        .unwrap()
        .then(() => {
          toast.success("Precio actualizado con éxito");
        })
        .catch((error) => {
          toast.error("Error al actualizar el precio: " + error.message);
        });
    }
  };
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const userRoles = useAppSelector((state) => state.auth.userRoles);
  const mostrarMasDisponibilidades = () => {
    if (mostrarTodas) {
      setCantidadMostrada(maxInicialDisponibilidades);
    } else {
      setCantidadMostrada(disponibilidades.length);
    }
    setMostrarTodas(!mostrarTodas);
  };

  const [horarios, setHorarios] = useState([
    { dia_semana: "", hora_inicio: "", hora_fin: "" },
  ]);
  const handleOpenReservaModal = async (disponibilidad: Disponibilidad) => {
    let reservasActuales = disponibilidad.reservasActuales;

    // Si reservasActuales es undefined, obtener el número actual de reservas del backend
    if (reservasActuales === undefined) {
      try {
        const response = await fetch(
          `https://sofiaportafolio.online/api/reservas/verificar/${disponibilidad.id}`
        );
        if (!response.ok) throw new Error("Error al verificar las reservas");
        const data = await response.json();
        reservasActuales = data.reservasActuales;
      } catch (error) {
        toast.error("Error al verificar las reservas");
        return;
      }
    }

    // Asegurarse de que reservasActuales tenga un valor antes de comparar
    if (
      reservasActuales !== undefined &&
      reservasActuales >= disponibilidad.max_reservas
    ) {
      toast.info("Este curso ya ha alcanzado el máximo de reservas.");
    } else if (reservasActuales !== undefined) {
      setDisponibilidadSeleccionada(disponibilidad);
      setIsReservaModalOpen(true);
    }
  };

  // Función para cerrar el modal de reserva
  const handleCloseReservaModal = () => {
    setIsReservaModalOpen(false);
    setDisponibilidadSeleccionada(null); // Limpiar la disponibilidad seleccionada al cerrar el modal
  };
  const dayOptions = [
    { value: "Lunes", label: "Lunes" },
    { value: "Martes", label: "Martes" },
    { value: "Miércoles", label: "Miércoles" },
    { value: "Jueves", label: "Jueves" },
    { value: "Viernes", label: "Viernes" },
    { value: "Sábado", label: "Sábado" },
    { value: "Domingo", label: "Domingo" },
  ];
  const handleSelectChange = (
    index: number,
    campo: string,
    selectedOption: SingleValue<OptionType>
  ) => {
    // selectedOption puede ser null si se deselecciona una opción
    const valor = selectedOption ? selectedOption.value : "";
    const nuevosHorarios = horarios.map((horario, i) =>
      i === index ? { ...horario, [campo]: valor } : horario
    );
    setHorarios(nuevosHorarios);
  };

  const handleHorarioChange = (index: number, campo: string, valor: string) => {
    const nuevosHorarios = horarios.map((horario, i) =>
      i === index ? { ...horario, [campo]: valor } : horario
    );
    setHorarios(nuevosHorarios);
  };
  const handleActualizarEstadoDisponibilidad = (
    disponibilidadId: number,
    nuevoEstado: string
  ) => {
    if (curso?.id) {
      dispatch(
        actualizarEstadoDisponibilidad({
          cursoId: curso.id,
          disponibilidadId,
          nuevoEstado, // "inactiva" o "finalizada", según tu lógica de negocio
        })
      )
        .unwrap()
        .then(() => {
          toast.success("Estado de la disponibilidad actualizado con éxito");
          // Refrescar la lista de disponibilidades
          dispatch(fetchDisponibilidades(curso.id));
        })
        .catch((error) => {
          toast.error(
            "Error al actualizar el estado de la disponibilidad: " +
              error.message
          );
        });
    }
  };
  const agregarHorario = () => {
    setHorarios([
      ...horarios,
      { dia_semana: "", hora_inicio: "", hora_fin: "" },
    ]);
  };
  const eliminarHorario = (index: number) => {
    const nuevosHorarios = horarios.filter((_, i) => i !== index);
    setHorarios(nuevosHorarios);
  };

  const formatFecha = (fecha: string) => {
    // Asumiendo que la fecha está en formato ISO (ej: "2023-11-22T03:00:00.000Z")
    return format(new Date(fecha), "dd/MM/yyyy");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNuevaDisponibilidad({
      ...nuevaDisponibilidad,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handleSubmit iniciado"); // Log para depuración

    const logs = [];

    // Validación general de la disponibilidad
    if (
      !nuevaDisponibilidad.fecha_inicio ||
      !nuevaDisponibilidad.fecha_fin ||
      nuevaDisponibilidad.max_reservas <= 0
    ) {
      toast.error("Por favor, complete los campos de la disponibilidad.");
      logs.push("Validación fallida: Campos incompletos de disponibilidad.");
      localStorage.setItem("addDisponibilityLogs", JSON.stringify(logs));
      return;
    }

    // Validación de los horarios
    let horarioInvalido = false;
    horarios.forEach((horario, index) => {
      if (!horario.dia_semana || !horario.hora_inicio || !horario.hora_fin) {
        horarioInvalido = true;
        toast.error(
          `Error en el horario ${index + 1}: Todos los campos son obligatorios.`
        );
      }
    });

    if (horarioInvalido) {
      logs.push("Validación fallida: Campos incompletos en horarios.");
      localStorage.setItem("addDisponibilityLogs", JSON.stringify(logs));
      return;
    }

    logs.push("handleSubmit iniciado para curso: " + JSON.stringify(curso));

    if (curso?.id) {
      logs.push(
        "Datos de nueva disponibilidad: " + JSON.stringify(nuevaDisponibilidad)
      );
      logs.push("Horarios a agregar: " + JSON.stringify(horarios));

      try {
        logs.push("Intentando agregar disponibilidad...");
        const actionResult = await dispatch(
          agregarDisponibilidad({
            cursoId: curso.id,
            ...nuevaDisponibilidad,
          })
        ).unwrap();

        logs.push(
          "Resultado de agregarDisponibilidad: " + JSON.stringify(actionResult)
        );

        if (actionResult && actionResult.id) {
          toast.success("Disponibilidad creada con éxito");
          logs.push(
            "Disponibilidad agregada exitosamente: " +
              JSON.stringify(actionResult)
          );

          const horariosResult = await dispatch(
            agregarHorariosDisponibilidad({
              disponibilidadId: actionResult.id,
              horarios,
            })
          ).unwrap();
          logs.push(
            "Horarios agregados exitosamente: " + JSON.stringify(horariosResult)
          );

          dispatch(fetchDisponibilidades(curso.id));
        } else {
          toast.error("Error al crear la disponibilidad");
          logs.push("No se pudo obtener el ID de la disponibilidad agregada");
        }

        setShowForm(false);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(
            "Error al agregar disponibilidad y horarios: " + error.message
          );
          logs.push(
            "Error en proceso de agregar disponibilidad y horarios: " +
              error.message
          );
        } else {
          // Manejo de casos donde el error no es una instancia de Error
          toast.error(
            "Ocurrió un error desconocido al agregar disponibilidad y horarios."
          );
          logs.push(
            "Error desconocido en proceso de agregar disponibilidad y horarios."
          );
        }
      }
    } else {
      console.error("No se ha proporcionado ID de curso válido");
      logs.push("No se ha proporcionado ID de curso válido");
    }

    // Almacenar logs en localStorage
    localStorage.setItem("addDisponibilityLogs", JSON.stringify(logs));
  };

  console.log("Disponibilidadess en componente:", disponibilidades);
  useEffect(() => {
    if (curso?.id) {
      dispatch(fetchDisponibilidades(curso.id));
    }
  }, [curso, dispatch]);
  console.log(nuevaDisponibilidad);
  if (!curso) {
    return (
      <CursoInfoContainer>
        Información del curso no disponible
      </CursoInfoContainer>
    );
  }
  return (
    <CursoInfoContainer>
      <CardContent>
        {/* Información del curso */}
        <h2>{curso.nombre}</h2>
        <p>
          <strong>Duración:</strong> {curso.duracion}
        </p>
        <p>
          <strong>Nivel:</strong> {curso.nivel}
        </p>
        {isAuthenticated && userRoles?.includes("admin") && (
          <div>
            <StyledInput
              type="number"
              value={nuevoPrecio}
              onChange={handlePrecioChange}
            />
            <Button variant="contained" onClick={actualizarPrecio}>
              Actualizar Precio
            </Button>
          </div>
        )}
        <p>
          <strong>Precio:</strong> ${curso.precio}
        </p>

        {/* Botón para agregar disponibilidad */}
        {isAuthenticated && userRoles?.includes("admin") && (
          <Button variant="contained" onClick={handleOpenModal}>
            Agregar Disponibilidad
          </Button>
        )}

        {/* Modal para agregar disponibilidad */}
        <AnimatePresence>
          {openModal && (
            <Modal open={openModal} onClose={handleCloseModal}>
              <StyledModal
                as={motion.div}
                initial={{ y: 300, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -300, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Typography variant="h6" component="h2">
                  Agregar Disponibilidad
                </Typography>
                <form ref={formRef} onSubmit={handleSubmit}>
                  <FormContainer>
                    <div style={{ overflowY: "auto", maxHeight: "550px" }}>
                      {horarios.map((horario, index) => (
                        <div key={index}>
                          <StyledLabel>
                            Día de la semana:
                            <Select
                              options={dayOptions}
                              value={dayOptions.find(
                                (option) => option.value === horario.dia_semana
                              )}
                              onChange={(selectedOption) =>
                                handleSelectChange(
                                  index,
                                  "dia_semana",
                                  selectedOption
                                )
                              }
                            />
                          </StyledLabel>
                          <StyledLabel>
                            Hora Inicio:
                            <StyledInput
                              type="time"
                              value={horario.hora_inicio}
                              onChange={(e) =>
                                handleHorarioChange(
                                  index,
                                  "hora_inicio",
                                  e.target.value
                                )
                              }
                            />
                          </StyledLabel>

                          <StyledLabel>
                            Hora Fin:
                            <StyledInput
                              type="time"
                              value={horario.hora_fin}
                              onChange={(e) =>
                                handleHorarioChange(
                                  index,
                                  "hora_fin",
                                  e.target.value
                                )
                              }
                            />
                          </StyledLabel>
                          {/* Botón para eliminar horario */}
                          <StyledButton
                            type="button"
                            onClick={() => eliminarHorario(index)}
                          >
                            Eliminar Horario
                          </StyledButton>
                        </div>
                      ))}
                      <InputGroup>
                        <StyledLabel>Fecha Inicio:</StyledLabel>
                        <StyledInput
                          type="date"
                          name="fecha_inicio"
                          value={nuevaDisponibilidad.fecha_inicio}
                          onChange={handleChange}
                        />
                      </InputGroup>
                      <InputGroup>
                        <StyledLabel>Fecha Fin:</StyledLabel>
                        <StyledInput
                          type="date"
                          name="fecha_fin"
                          value={nuevaDisponibilidad.fecha_fin}
                          onChange={handleChange}
                        />
                      </InputGroup>
                      <InputGroup>
                        <StyledLabel>Max Reservas:</StyledLabel>
                        <StyledInput
                          type="number"
                          name="max_reservas"
                          value={nuevaDisponibilidad.max_reservas}
                          onChange={handleChange}
                        />
                      </InputGroup>
                      <ButtonGroup>
                        <StyledAddButton type="button" onClick={agregarHorario}>
                          Agregar Horario
                        </StyledAddButton>
                        <StyledSubmitButton type="submit">
                          Crear Disponibilidad
                        </StyledSubmitButton>
                      </ButtonGroup>
                    </div>
                  </FormContainer>
                </form>
                <StyledButton onClick={handleCloseModal}>Cerrar</StyledButton>
              </StyledModal>
            </Modal>
          )}
        </AnimatePresence>
        <ScrollableContainer>
          {disponibilidadesActivas
            .filter((d) => d.curso_id === curso.id)
            .slice(0, cantidadMostrada)
            .map((disp) => (
              <DisponibilidadContainer key={disp.id}>
                <DisponibilidadInfo>
                  {`Inicio: ${formatFecha(
                    disp.fecha_inicio
                  )} - Fin: ${formatFecha(disp.fecha_fin)}`}
                </DisponibilidadInfo>

                {/* Muestra los horarios para la disponibilidad */}
                <HorarioInfo>{formatHorarios(disp.horarios || [])}</HorarioInfo>

                {/* Botón de reserva para la disponibilidad completa (sin seleccionar horario individual) */}
                <ReservarButton onClick={() => handleOpenReservaModal(disp)}>
                  Reservar
                </ReservarButton>
                {isAuthenticated && userRoles?.includes("admin") && (
                  <StyledButton
                    onClick={() =>
                      handleActualizarEstadoDisponibilidad(disp.id, "inactiva")
                    } // o "finalizada"
                  >
                    Finalizar Disponibilidad
                  </StyledButton>
                )}
              </DisponibilidadContainer>
            ))}
          {disponibilidadesActivas.length > maxInicialDisponibilidades && (
            <VerMasButton onClick={mostrarMasDisponibilidades}>
              {mostrarTodas ? "Ocultar fechas" : "Ver más fechas"}
            </VerMasButton>
          )}
        </ScrollableContainer>
      </CardContent>
      {disponibilidadSeleccionada && (
        <ReservaModal
          open={isReservaModalOpen}
          onClose={handleCloseReservaModal}
          disponibilidadSeleccionada={disponibilidadSeleccionada}
        />
      )}
    </CursoInfoContainer>
  );
};

export default CursoInfo;
