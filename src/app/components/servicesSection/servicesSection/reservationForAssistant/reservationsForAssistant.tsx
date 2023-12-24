import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  fetchReservationsForAssistant,
  fetchServices,
  markReservationAsCompleted,
  deleteReservation,
  markReservationAsPending,
} from "../../../../redux/serviceSlice/servicesSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/store/appHooks";
import {
  Container,
  Heading,
  RefreshButton,
  ReservationItem,
  StyledSelect,
} from "../ReservationsForAssistant.styles";
import { format } from "date-fns";
import ReservationsList from "./reservationsList";
import {
  HorarioDisponibilidad,
  fetchTodasLasReservas,
  actualizarEstadoReservaCurso,
  eliminarReservaCurso,
} from "@/app/redux/coursesSlice/coursesSlice";
import { AnimatePresence, motion } from "framer-motion";
import {
  CardButton,
  CardDetails,
  CardLabel,
  CardValue,
  IconWrapper,
} from "./reservationCard.styles";
import Select, { SingleValue, StylesConfig, GroupBase } from "react-select";
import {
  School,
  Person,
  CalendarToday,
  AccessTime,
} from "@mui/icons-material";

interface OptionType {
  value: string;
  label: string;
}
function ReservationsForAssistant() {
  const dispatch = useAppDispatch();
  const ayudanteId = useAppSelector((state) => state.auth.userId);
  const services = useAppSelector((state) => state.services.services);
  const reservations = useAppSelector(
    (state) => state.services.reservationsForAssistant
  );
  const [expandedReservation, setExpandedReservation] = useState<number | null>(
    null
  );

  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  const courseReservations = useAppSelector((state) => state.cursos.reservas);
  const handleSelectChange = (option: SingleValue<OptionType>) => {
    setSelectedOption(option);
  };
  const handleToggleDetails = (id: number) => {
    if (expandedReservation === id) {
      setExpandedReservation(null);
    } else {
      setExpandedReservation(id);
    }
  };
  const handleCursoCompleteClick = (reservaId: number) => {
    dispatch(
      actualizarEstadoReservaCurso({ reservaId, estado: "completada" })
    ).then(() => {
      console.log(`Reserva ${reservaId} actualizada a completada`);
      dispatch(fetchTodasLasReservas());
    });
  };

  const handleCursoPendingClick = (reservaId: number) => {
    dispatch(
      actualizarEstadoReservaCurso({ reservaId, estado: "pendiente" })
    ).then(() => {
      dispatch(fetchTodasLasReservas());
    });
  };

  const handleCursoDeleteClick = (reservaId: number) => {
    dispatch(eliminarReservaCurso(reservaId));
  };

  const formatFechaReserva = (fecha: string) =>
    format(new Date(fecha), "dd/MM/yyyy HH:mm");
  function formatHorarios(horarios: HorarioDisponibilidad[]) {
    if (horarios.length === 1) {
      const h = horarios[0];
      return `Los ${h.dia_semana} De ${h.hora_inicio} Hs A ${h.hora_fin} Hs`;
    } else {
      return horarios
        .map(
          (h) => `Los ${h.dia_semana} De ${h.hora_inicio} Hs A ${h.hora_fin} Hs`
        )
        .join(" Y ");
    }
  }
  const reservationOptions: OptionType[] = [
    { value: "servicios", label: "Reservas de Servicios" },
    { value: "cursos", label: "Reservas de Cursos" },
  ];
  const customStyles: StylesConfig<OptionType, false, GroupBase<OptionType>> = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "white",
      borderColor: "#f2e0e4",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#d5a1b8",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      color: "black",
      backgroundColor: state.isSelected ? "#f2e0e4" : "white",
      "&:hover": {
        backgroundColor: "#f2e0e4",
      },
    }),
    // Puedes seguir personalizando otras partes del componente Select aquí...
  };
  const ayudanteName = useAppSelector((state) => state.auth.userName);
  const [selectedStatus, setSelectedStatus] = React.useState<
    "pendiente" | "completada"
  >("pendiente");
  const filteredCourseReservations = useMemo(() => {
    console.log("Reservas de cursos antes de filtrar", courseReservations);
    return courseReservations.filter(
      (reservation) => reservation.estado === selectedStatus
    );
  }, [courseReservations, selectedStatus]);

  console.log("Reservas filtradas", filteredCourseReservations);

  const handleCompleteClick = (reservationId: number) => {
    dispatch(markReservationAsCompleted(reservationId));
  };

  const handlePendingClick = (reservationId: number) => {
    dispatch(markReservationAsPending(reservationId));
  };

  const getServiceNameById = (serviceId: number) => {
    const service = services.find((s) => s.id === serviceId);
    return service ? service.title : "Desconocido";
  };

  const handleDeleteClick = (reservationId: number) => {
    dispatch(deleteReservation(reservationId));
  };

  const fetchReservations = useCallback(() => {
    if (ayudanteId !== null) {
      dispatch(
        fetchReservationsForAssistant({ ayudanteId: Number(ayudanteId) })
      );
    }
  }, [ayudanteId, dispatch]); // dependencias de useCallback

  useEffect(() => {
    dispatch(fetchServices());
    fetchReservations();
  }, [dispatch, ayudanteId, fetchReservations]); // Añadir fetchReservations aquí

  useEffect(() => {
    fetchReservations();
  }, [services, fetchReservations]); // Añadir fetchReservations aquí
  useEffect(() => {
    if (selectedOption?.value === "cursos") {
      dispatch(fetchTodasLasReservas()).then((response) =>
        console.log(
          "Reservas de cursos actualizadas después de fetch",
          response
        )
      );
    }
  }, [dispatch, selectedOption]);

  return (
    <Container>
      <Heading>Reservas para el ayudante {ayudanteName || ayudanteId}</Heading>
      <RefreshButton onClick={fetchReservations}>
        Refrescar Reservas
      </RefreshButton>
      <StyledSelect
        value={selectedStatus}
        onChange={(e) =>
          setSelectedStatus(e.target.value as "pendiente" | "completada")
        }
      >
        <option value="pendiente">Pendientes</option>
        <option value="completada">Completadas</option>
      </StyledSelect>
      <Select
        value={selectedOption}
        onChange={handleSelectChange}
        options={reservationOptions}
        styles={customStyles}
      />

      {selectedOption?.value === "servicios" && (
        <ReservationsList
          reservations={reservations}
          status={selectedStatus}
          onMarkComplete={handleCompleteClick}
          onDelete={handleDeleteClick}
          onMarkPending={handlePendingClick}
          getServiceNameById={getServiceNameById}
          format={format}
        />
      )}

      {selectedOption?.value === "cursos" &&
        filteredCourseReservations.map((courseReservation) => (
          <ReservationItem
            key={courseReservation.id}
            onClick={() =>
              courseReservation.id !== undefined &&
              handleToggleDetails(courseReservation.id)
            }
          >
            <CardDetails>
              <CardLabel>
                <IconWrapper>
                  <School fontSize="small" /> {/* Icono para el curso */}
                </IconWrapper>
                Curso:
              </CardLabel>
              <CardValue>
                {courseReservation.curso_nombre || "Desconocido"}
              </CardValue>
            </CardDetails>

            <AnimatePresence>
              {expandedReservation === courseReservation.id && (
                <motion.div
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  variants={{
                    expanded: { opacity: 1, height: "auto" },
                    collapsed: { opacity: 0, height: 0 },
                  }}
                  transition={{ duration: 0.8 }}
                >
                  <CardDetails>
                    <CardLabel>
                      <IconWrapper>
                        <Person fontSize="small" />{" "}
                        {/* Icono para el usuario */}
                      </IconWrapper>
                      Usuario:
                    </CardLabel>
                    <CardValue>
                      {courseReservation.usuario_nombre || "Desconocido"}
                    </CardValue>
                  </CardDetails>

                  <CardDetails>
                    <CardLabel>
                      <IconWrapper>
                        <CalendarToday fontSize="small" />{" "}
                        {/* Icono para la fecha */}
                      </IconWrapper>
                      Fecha de Reserva:
                    </CardLabel>
                    <CardValue>
                      {courseReservation.fecha_reserva
                        ? formatFechaReserva(courseReservation.fecha_reserva)
                        : "No disponible"}
                    </CardValue>
                  </CardDetails>

                  <CardDetails>
                    <CardLabel>
                      <IconWrapper>
                        <AccessTime fontSize="small" />{" "}
                        {/* Icono para los horarios */}
                      </IconWrapper>
                      Horarios:
                    </CardLabel>
                    <CardValue>
                      {formatHorarios(courseReservation.horarios)}
                    </CardValue>
                  </CardDetails>
                  <div className="reservation-actions">
                    {selectedStatus === "pendiente" && (
                      <CardButton
                        className="complete"
                        onClick={() => {
                          if (courseReservation.id !== undefined) {
                            handleCursoCompleteClick(courseReservation.id);
                          }
                        }}
                      >
                        Marcar como Completada
                      </CardButton>
                    )}

                    {selectedStatus === "completada" && (
                      <CardButton
                        className="pending"
                        onClick={() => {
                          if (courseReservation.id !== undefined) {
                            handleCursoPendingClick(courseReservation.id);
                          }
                        }}
                      >
                        Marcar como Pendiente
                      </CardButton>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <CardButton
              className="delete"
              onClick={() => {
                if (courseReservation.id !== undefined) {
                  handleCursoDeleteClick(courseReservation.id);
                }
              }}
            >
              Eliminar Reserva
            </CardButton>
          </ReservationItem>
        ))}
    </Container>
  );
}

export default ReservationsForAssistant;
