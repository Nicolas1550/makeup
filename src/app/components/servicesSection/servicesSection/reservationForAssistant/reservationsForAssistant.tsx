import React, { useCallback, useEffect } from "react";
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
  StyledSelect,
} from "../ReservationsForAssistant.styles";
import { format } from "date-fns";
import ReservationsList from "./reservationsList";

function ReservationsForAssistant() {
  const dispatch = useAppDispatch();
  const ayudanteId = useAppSelector((state) => state.auth.userId);
  const services = useAppSelector((state) => state.services.services);
  const reservations = useAppSelector(
    (state) => state.services.reservationsForAssistant
  );
  const ayudanteName = useAppSelector((state) => state.auth.userName);
  const [selectedStatus, setSelectedStatus] = React.useState<
    "pendiente" | "completado"
  >("pendiente");

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

  return (
    <Container>
      <Heading>Reservas para el ayudante {ayudanteName || ayudanteId}</Heading>
      <RefreshButton onClick={fetchReservations}>
        Refrescar Reservas
      </RefreshButton>

      <StyledSelect
        value={selectedStatus}
        onChange={(e) =>
          setSelectedStatus(e.target.value as "pendiente" | "completado")
        }
      >
        <option value="pendiente">Pendientes</option>
        <option value="completado">Completadas</option>
      </StyledSelect>

      <ReservationsList
        reservations={reservations}
        status={selectedStatus}
        onMarkComplete={handleCompleteClick}
        onDelete={handleDeleteClick}
        onMarkPending={handlePendingClick}
        getServiceNameById={getServiceNameById}
        format={format}
      />
    </Container>
  );
}

export default ReservationsForAssistant;
