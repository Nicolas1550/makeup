// ReservaModal.tsx
import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Stepper from "./steper";
import {
  StyledModal,
  StyledButton,
  StepperContainer,
  ButtonContainer,
  StepContainer,
  StyledInput,
  HorarioContainer,
  DisponibilidadContainerr,
  DisponibilidadInfoo,
  StyledLabel,
  StyledInputContainer,
  StyledTitle,
} from "./cursoInfoStyles";
import { toast } from "react-toastify";
import {
  HorarioDisponibilidad,
  agregarReserva,
  subirComprobantePago,
} from "@/app/redux/coursesSlice/coursesSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/store/appHooks";
import { isEmailValid, isPhoneValid, isTextValid } from "./validations";
import { format } from "date-fns";

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
  const [comprobanteFile, setComprobanteFile] = useState<File | null>(null);
  const [reservaEnProceso, setReservaEnProceso] = useState(false);

  const dispatch = useAppDispatch();
  const usuarioId = useAppSelector((state) => state.auth.userId) as number;
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
    if (reservaEnProceso) return; // Evitar múltiples clics
    setReservaEnProceso(true);
    // Validar los datos del usuario antes de continuar

    if (!validarDatosUsuario()) {
      setReservaEnProceso(false); // Re-habilitar el botón si la validación falla
      return; // Detener la ejecución si la validación falla
    }

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
    }
  }, [open]);

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        const formattedStartDate = disponibilidadSeleccionada?.fecha_inicio
          ? format(
              new Date(disponibilidadSeleccionada.fecha_inicio),
              "dd/MM/yyyy"
            )
          : "";
        const formattedEndDate = disponibilidadSeleccionada?.fecha_fin
          ? format(new Date(disponibilidadSeleccionada.fecha_fin), "dd/MM/yyyy")
          : "";
        return (
          <StepContainer>
            <h3>Confirmar Disponibilidad</h3>
            <DisponibilidadContainerr>
              <DisponibilidadInfoo>
                Fecha de Inicio: {formattedStartDate}
              </DisponibilidadInfoo>
              <DisponibilidadInfoo>
                Fecha de Fin: {formattedEndDate}
              </DisponibilidadInfoo>
              <HorarioContainer>
                <h4>Dias y Horarios:</h4>
                {disponibilidadSeleccionada?.horarios?.map((horario, index) => (
                  <p
                    key={index}
                  >{`Día: ${horario.dia_semana}, De ${horario.hora_inicio} a ${horario.hora_fin}`}</p>
                ))}
              </HorarioContainer>
            </DisponibilidadContainerr>
          </StepContainer>
        );
      case 1:
        return (
          <StepContainer>
            <StyledTitle>Información del Usuario</StyledTitle>

            <StyledInputContainer>
              <StyledInput
                type="text"
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
                placeholder=" " // Dejar un espacio en blanco para el efecto
              />
              <StyledLabel>Nombre</StyledLabel>
            </StyledInputContainer>

            <StyledInputContainer>
              <StyledInput
                type="email"
                value={correoUsuario}
                onChange={(e) => setCorreoUsuario(e.target.value)}
                placeholder=" " // Espacio en blanco para el efecto
              />
              <StyledLabel>Correo electrónico</StyledLabel>
            </StyledInputContainer>

            <StyledInputContainer>
              <StyledInput
                type="tel"
                value={telefonoUsuario}
                onChange={(e) => setTelefonoUsuario(e.target.value)}
                placeholder=" " // Espacio en blanco para el efecto
              />
              <StyledLabel>Teléfono</StyledLabel>
            </StyledInputContainer>
          </StepContainer>
        );
      case 2:
        return (
          <StepContainer>
            <StyledTitle>Subir Comprobante de Pago</StyledTitle>
            <StyledInput type="file" onChange={handleComprobanteUpload} />
          </StepContainer>
        );
      default:
        return <StepContainer>Paso desconocido</StepContainer>;
    }
  };
  return (
    <Modal open={open} onClose={onClose}>
      <StyledModal>
        <StepperContainer>
          {/* Asumiendo que tienes un componente Stepper */}
          <Stepper currentStep={activeStep} />
        </StepperContainer>
        {renderStepContent(activeStep)}
        <ButtonContainer>
          {activeStep > 0 && (
            <StyledButton onClick={handleBack}>Atrás</StyledButton>
          )}
          {activeStep < 2 ? (
            <StyledButton onClick={handleNext}>Siguiente</StyledButton>
          ) : (
            <StyledButton
              onClick={confirmarReserva}
              disabled={reservaEnProceso}
            >
              Confirmar Reserva
            </StyledButton>
          )}
        </ButtonContainer>
      </StyledModal>
    </Modal>
  );
};

export default ReservaModal;
