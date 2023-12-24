// ReservaModal.tsx
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Stepper from "./steper"; // Tu Stepper personalizado
import { StyledModal, StyledButton } from "./cursoInfoStyles";
import { toast } from "react-toastify";
import {
  HorarioDisponibilidad,
  agregarReserva,
} from "@/app/redux/coursesSlice/coursesSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/store/appHooks";

interface Disponibilidad {
  id: number;
  curso_id: number;
  fecha_inicio: string;
  fecha_fin: string;
  max_reservas: number;
  horarios?: HorarioDisponibilidad[];
}

interface ReservaModalProps {
  open: boolean;
  onClose: () => void;
  disponibilidadSeleccionada: Disponibilidad | null;
}

const ReservaModal: React.FC<ReservaModalProps> = ({
  open,
  onClose,
  disponibilidadSeleccionada,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useAppDispatch();
  const usuarioId = useAppSelector((state) => state.auth.userId) as number; // Asumiendo que tienes esto en tu estado global

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const confirmarReserva = () => {
    if (disponibilidadSeleccionada) {
      dispatch(
        agregarReserva({
          disponibilidad_id: disponibilidadSeleccionada.id,
          usuario_id: usuarioId,
          estado: "pendiente",
          horarios: disponibilidadSeleccionada.horarios || [],
        })
      );
      toast.success("Reserva confirmada exitosamente.");
      onClose(); // Cierra el modal
    } else {
      toast.error("Error en la reserva. Por favor, intente de nuevo.");
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <div>
            <h3>Confirmar Disponibilidad</h3>
            <p>Fecha de Inicio: {disponibilidadSeleccionada?.fecha_inicio}</p>
            <p>Fecha de Fin: {disponibilidadSeleccionada?.fecha_fin}</p>
            {/* Más detalles según sea necesario */}
          </div>
        );
      case 1:
        return <div>Información del usuario y detalles adicionales.</div>;
      case 2:
        return <div>¿Desea confirmar la reserva?</div>;
      default:
        return "Paso desconocido";
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <StyledModal>
        <Stepper currentStep={activeStep} />
        <div>
          {renderStepContent(activeStep)}
          <div>
            {activeStep > 0 && (
              <StyledButton onClick={handleBack}>Atrás</StyledButton>
            )}
            {activeStep < 2 ? (
              <StyledButton onClick={handleNext}>Siguiente</StyledButton>
            ) : (
              <StyledButton onClick={confirmarReserva}>
                Confirmar Reserva
              </StyledButton>
            )}
          </div>
        </div>
      </StyledModal>
    </Modal>
  );
};

export default ReservaModal;
