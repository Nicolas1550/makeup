// ReservationCard.tsx
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Reservation } from "../../../../redux/serviceSlice/servicesSlice";
import {
  CardButton,
  CardContainer,
  CardDetails,
  CardLabel,
  CardLink,
  CardValue,
  IconWrapper,
} from "./reservationCard.styles";
import { Event, Money, Person, Description } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
const variants = {
  expanded: { opacity: 1, height: "auto" },
  collapsed: { opacity: 0, height: 0 },
};
interface ReservationCardProps {
  reservation: Reservation;
  onMarkComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onMarkPending: (id: number) => void;
  getServiceNameById: (id: number) => string;
  format: (date: Date, format: string) => string;
}
function ReservationCard({
  reservation,
  onMarkComplete,
  onDelete,
  onMarkPending,
  getServiceNameById,
  format,
}: ReservationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <CardContainer>
      <CardDetails onClick={() => setIsExpanded(!isExpanded)}>
        <CardLabel>
          <IconWrapper>
            <Event fontSize="small" />
          </IconWrapper>
          Servicio:
        </CardLabel>
        <CardValue>{getServiceNameById(reservation.serviceId)}</CardValue>
      </CardDetails>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            variants={variants}
            transition={{ duration: 0.8 }}
          >
            <CardDetails>
              <CardLabel>
                <IconWrapper>
                  <Event fontSize="small" />
                </IconWrapper>
                Fecha de Reserva:
              </CardLabel>
              <CardValue>
                {format(
                  new Date(reservation.fecha_reserva),
                  "dd/MM/yyyy HH:mm"
                )}
              </CardValue>
            </CardDetails>

            <CardDetails>
              <CardLabel>
                <IconWrapper>
                  <Event fontSize="small" />
                </IconWrapper>
                Fecha de Inicio:
              </CardLabel>
              <CardValue>
                {format(
                  new Date(reservation.fecha_inicio_reserva),
                  "dd/MM/yyyy HH:mm"
                )}
              </CardValue>
            </CardDetails>

            <CardDetails>
              <CardLabel>
                <IconWrapper>
                  <Event fontSize="small" />
                </IconWrapper>
                Fecha de Fin:
              </CardLabel>
              <CardValue>
                {format(
                  new Date(reservation.fecha_fin_reserva),
                  "dd/MM/yyyy HH:mm"
                )}
              </CardValue>
            </CardDetails>

            <CardDetails>
              <CardLabel>
                <IconWrapper>
                  <Description fontSize="small" />
                </IconWrapper>
                Estado:
              </CardLabel>
              <CardValue
                style={{
                  color:
                    reservation.estado === "pendiente" ? "#f39c12" : "#2ecc71",
                }}
              >
                {reservation.estado}
              </CardValue>
            </CardDetails>

            <CardDetails>
              <CardLabel>
                <IconWrapper>
                  <Money fontSize="small" />
                </IconWrapper>
                Precio:
              </CardLabel>
              <CardValue>${reservation.precio}</CardValue>
            </CardDetails>

            <CardDetails>
              <CardLabel>
                <IconWrapper>
                  <Person fontSize="small" />
                </IconWrapper>
                Usuario:
              </CardLabel>
              <CardValue>{reservation.usuario_nombre}</CardValue>
            </CardDetails>

            <CardDetails>
              <CardLabel>
                <IconWrapper>
                  <Description fontSize="small" />
                </IconWrapper>
                Opciones seleccionadas:
              </CardLabel>
              <CardValue>
                {(() => {
                  const selectedOptions = reservation.opciones_seleccionadas;
                  if (selectedOptions) {
                    try {
                      const parsedOptions = Array.isArray(selectedOptions)
                        ? selectedOptions
                        : JSON.parse(selectedOptions);
                      return parsedOptions.join(", ");
                    } catch (error) {
                      return "Error al mostrar las opciones";
                    }
                  } else {
                    return "No hay opciones seleccionadas";
                  }
                })()}
              </CardValue>
            </CardDetails>

            <CardDetails>
              <CardLabel>
                <IconWrapper>
                  <Description fontSize="small" />
                </IconWrapper>
                Comprobante:
              </CardLabel>
              <CardValue>
                {reservation.comprobante_path ? (
                  <CardLink
                    href={`https://asdasdasd3.onrender.com/${reservation.comprobante_path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver Comprobante
                  </CardLink>
                ) : (
                  "No disponible"
                )}
              </CardValue>
            </CardDetails>

            {reservation.estado === "pendiente" ? (
              <CardButton
                className="complete"
                onClick={() => onMarkComplete(reservation.id)}
              >
                Marcar como Completado
              </CardButton>
            ) : (
              <CardButton
                className="pending"
                onClick={() => onMarkPending(reservation.id)}
              >
                Marcar como Pendiente
              </CardButton>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <CardButton className="delete" onClick={() => onDelete(reservation.id)}>
        <DeleteIcon />
      </CardButton>
    </CardContainer>
  );
}

export default ReservationCard;
