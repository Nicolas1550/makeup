// ReservationsList.tsx

import React from "react";
import { Reservation } from "../../../../redux/serviceSlice/servicesSlice";
import ReservationCard from "./reservationCard";

interface ReservationsListProps {
  reservations: Reservation[];
  status: "pendiente" | "completada";
  onMarkComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onMarkPending: (id: number) => void;
  getServiceNameById: (id: number) => string;
  format: (date: Date, format: string) => string;
}

const ReservationsList: React.FC<ReservationsListProps> = ({
  reservations,
  status,
  onMarkComplete,
  onDelete,
  onMarkPending,
  getServiceNameById,
  format,
}) => {
  const filteredReservations = reservations.filter((r) => r.estado === status);

  return (
    <div>
      <h2>
        {status === "pendiente"
          ? "Reservas Pendientes"
          : "Reservas Completadas"}
      </h2>
      {filteredReservations.map((reservation) => (
        <ReservationCard
          key={reservation.id}
          reservation={reservation}
          onMarkComplete={onMarkComplete}
          onDelete={onDelete}
          onMarkPending={onMarkPending}
          getServiceNameById={getServiceNameById}
          format={format}
        />
      ))}
    </div>
  );
};

export default ReservationsList;
