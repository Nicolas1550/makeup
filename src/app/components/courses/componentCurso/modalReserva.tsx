import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux/store/appHooks";
import {
  fetchReservasPorCursoYUsuario,
  fetchReservasAdminPorCurso,
} from "@/app/redux/coursesSlice/coursesSlice";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
interface Reserva {
  id: number;
  disponibilidad_id: number;
  usuario_id: number;
  estado: "pendiente" | "completada";
  fecha_reserva: string;
}
interface ReservasModalProps {
  cursoId: number;
  isOpen: boolean;
  onRequestClose: () => void;
}

const ReservasModal: React.FC<ReservasModalProps> = ({
  cursoId,
  isOpen,
  onRequestClose,
}) => {
  const dispatch = useAppDispatch();
  const reservas = useAppSelector((state) => state.cursos.reservas);
  const userRoles = useAppSelector((state) => state.auth.userRoles);
  const usuarioId = useAppSelector((state) => state.auth.userId);
  const userIdNumber =
    typeof usuarioId === "string" ? parseInt(usuarioId, 10) : usuarioId || 0;

  useEffect(() => {
    if (userRoles.includes("admin")) {
      dispatch(fetchReservasAdminPorCurso({ cursoId }));
    } else {
      dispatch(
        fetchReservasPorCursoYUsuario({ cursoId, usuarioId: userIdNumber })
      );
    }
  }, [dispatch, cursoId, userIdNumber, userRoles]);

  return (
    <Modal open={isOpen} onClose={onRequestClose}>
      <Box>
        <Typography variant="h6">Reservas del Curso</Typography>
        <ul>
          {reservas.map((reserva: Reserva) => (
            <li key={reserva.id}>
              Reserva ID: {reserva.id}, Estado: {reserva.estado}
              {/* Aquí puedes agregar más información de la reserva si lo necesitas */}
            </li>
          ))}
        </ul>
        <Button onClick={onRequestClose}>Cerrar</Button>
      </Box>
    </Modal>
  );
};

export default ReservasModal;
