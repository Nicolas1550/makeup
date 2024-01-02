// ReservaModal.tsx
import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Stepper from "./steper"; // Asumiendo que tienes un componente stepper
import { StyledModal, StyledButton } from "./cursoInfoStyles";
import { toast } from "react-toastify";
import {
  HorarioDisponibilidad,
  agregarReserva,
  subirComprobantePago, // Asegúrate de importar esta acción
} from "@/app/redux/coursesSlice/coursesSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/store/appHooks";
import { isEmailValid, isPhoneValid, isTextValid } from "./validations"; // Asumiendo que tienes un archivo de validaciones

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
  const [comprobanteFile, setComprobanteFile] = useState<File | null>(null); // Estado para el archivo de comprobante
  const [reservaEnProceso, setReservaEnProceso] = useState(false);

  const dispatch = useAppDispatch();
  const usuarioId = useAppSelector((state) => state.auth.userId) as number; // Asumiendo que tienes esto en tu estado global
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [correoUsuario, setCorreoUsuario] = useState("");
  const [telefonoUsuario, setTelefonoUsuario] = useState("");
  const handleNext = () => {
    // Validar los datos del usuario en el paso 1 antes de avanzar
    if (activeStep === 1 && !validarDatosUsuario()) {
      return; // Detener la ejecución si la validación falla
    }
  
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Función para manejar la subida del comprobante
  const handleComprobanteUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      setComprobanteFile(event.target.files[0]);
    }
  };
  const validarDatosUsuario = () => {
    if (!isTextValid(nombreUsuario)) {
      toast.error("Por favor, ingrese un nombre válido.");
      return false;
    }
    if (!isEmailValid(correoUsuario)) {
      toast.error("Por favor, ingrese un correo electrónico válido.");
      return false;
    }
    if (!isPhoneValid(telefonoUsuario)) {
      toast.error("Por favor, ingrese un número de teléfono válido.");
      return false;
    }
    return true;
  };
  const confirmarReserva = async () => {
    console.log("La reserva ya está en proceso.");

    if (reservaEnProceso) return; // Evitar múltiples clics
    setReservaEnProceso(true);
    // Validar los datos del usuario antes de continuar

    if (!validarDatosUsuario()) {
      setReservaEnProceso(false); // Re-habilitar el botón si la validación falla
      return; // Detener la ejecución si la validación falla
    }
    console.log("Datos a enviar en la reserva:", {
      disponibilidad_id: disponibilidadSeleccionada?.id,
      usuario_id: usuarioId,
      estado: "pendiente",
      horarios: disponibilidadSeleccionada?.horarios || [],
      nombre_usuario: nombreUsuario,
      correo_usuario: correoUsuario,
      telefono_usuario: telefonoUsuario,
    });

    if (disponibilidadSeleccionada && comprobanteFile) {
      const resultAction = await dispatch(
        agregarReserva({
          disponibilidad_id: disponibilidadSeleccionada.id,
          usuario_id: usuarioId,
          estado: "pendiente",
          horarios: disponibilidadSeleccionada.horarios || [],
          nombre_usuario: nombreUsuario,
          correo_usuario: correoUsuario,
          telefono_usuario: telefonoUsuario,
        })
      );

      if (agregarReserva.fulfilled.match(resultAction)) {
        const reservaCreada = resultAction.payload;
        if (typeof reservaCreada.id === "number") {
          const formData = new FormData();
          formData.append("comprobante", comprobanteFile);

          await dispatch(
            subirComprobantePago({
              reservaId: reservaCreada.id,
              comprobanteData: formData,
            })
          );

          toast.success("Reserva confirmada exitosamente.");
          setReservaEnProceso(false); // Restablecer el estado para permitir nuevas reservas
          onClose();
        } else {
          toast.error("Error al obtener el ID de la reserva.");
          setReservaEnProceso(false); // Re-habilitar el botón si la reserva falla
        }
      } else {
        toast.error("Error en la reserva. Por favor, intente de nuevo.");
        setReservaEnProceso(false); // Re-habilitar el botón si la reserva falla
      }
    } else {
      toast.error("Por favor, complete todos los pasos.");
      setReservaEnProceso(false); // Re-habilitar el botón si faltan pasos
    }
  };
  // Cuando el modal se cierre, resetea los campos
  useEffect(() => {
    if (!open) {
      setNombreUsuario("");
      setCorreoUsuario("");
      setTelefonoUsuario("");
      setComprobanteFile(null);
      // Cualquier otro estado que necesite ser reseteado
    }
  }, [open]);

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
        console.log({ nombreUsuario, correoUsuario, telefonoUsuario });

        return (
          <div>
            <h3>Información del Usuario</h3>
            <input
              type="text"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              placeholder="Nombre"
            />
            <input
              type="email"
              value={correoUsuario}
              onChange={(e) => setCorreoUsuario(e.target.value)}
              placeholder="Correo electrónico"
            />
            <input
              type="tel"
              value={telefonoUsuario}
              onChange={(e) => setTelefonoUsuario(e.target.value)}
              placeholder="Teléfono"
            />
          </div>
        );
      case 2:
        return (
          <div>
            <h3>Subir Comprobante de Pago</h3>
            <input type="file" onChange={handleComprobanteUpload} />
          </div>
        );
      case 3:
        return <div>¿Desea confirmar la reserva?</div>;
      default:
        return "Paso desconocido";
    }
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <StyledModal>
          <Stepper currentStep={activeStep} />
          <div>
            {renderStepContent(activeStep)}
            <div>
              {activeStep > 0 && (
                <StyledButton onClick={handleBack}>Atrás</StyledButton>
              )}
              {activeStep < 3 ? (
                <StyledButton onClick={handleNext}>Siguiente</StyledButton>
              ) : (
                <StyledButton
                  onClick={confirmarReserva}
                  disabled={reservaEnProceso} // Desactivar el botón durante el proceso
                >
                  Confirmar Reserva
                </StyledButton>
              )}
            </div>
          </div>
        </StyledModal>
      </Modal>
    </>
  );
};

export default ReservaModal;
