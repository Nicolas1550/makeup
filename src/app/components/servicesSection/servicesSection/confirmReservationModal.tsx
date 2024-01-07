import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store/appHooks"; // <-- Agregado useAppSelector
import {
  ServiceOption,
  fetchServiceOptions,
  uploadProofOfPayment,
} from "../../../redux/serviceSlice/servicesSlice";
import { io } from "socket.io-client";
import Stepper from "./stepper";
import {
  Actions,
  BackButton,
  CancelButton,
  ConfirmButton,
  FileInput,
  NextButton,
  OptionCard,
  OptionItem,
  OptionList,
  OptionName,
  OptionPrice,
  OptionTitle,
  PaymentDetails,
  ServiceOptionsContainer,
  StepContainer,
  StyledModal,
  StyledText,
  Subtitle,
  ThankYouText,
  Title,
  TotalPrice,
} from "./stylesConfirmReservation";
import ServiceOptionsSelector from "../servicesSection/serviceModal/ServiceOptionsSelector";

const socket = io("https://sofiaportafolio.online");

interface ConfirmReservationModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  serviceId: number;
  disponibilidadId: number;
  availabilityDetails: {
    fecha_inicio: string;
    fecha_fin: string;
  };
}

const formatDateForReservation = (
  startDateString: string,
  endDateString: string
) => {
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  const datePart = startDate.toLocaleDateString("es-ES", dateOptions);
  const startTimePart = startDate.toLocaleTimeString("es-ES", timeOptions);
  const endTimePart = endDate.toLocaleTimeString("es-ES", timeOptions);

  return `${datePart} de ${startTimePart} a ${endTimePart}`;
};

const ConfirmReservationModal: React.FC<ConfirmReservationModalProps> = ({
  isOpen,
  onRequestClose,
  serviceId,
  disponibilidadId,
  availabilityDetails,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<ServiceOption[]>([]);
  const [fetchedServices, setFetchedServices] = useState<number[]>([]);

  const optionsForService = useAppSelector((state) => {
    const serviceOptions = state.services.serviceOptions;
    return serviceOptions[serviceId] || [];
  });

  const handleOptionsSelected = (newOptions: ServiceOption[]) => {
    if (JSON.stringify(selectedOptions) !== JSON.stringify(newOptions)) {
      setSelectedOptions(newOptions);
    }
  };

  const [file, setFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();
  const [step, setStep] = useState<number>(1);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      if (selectedFile.size > 10485760) {
        // 10 MB = 10 * 1024 * 1024 bytes
        alert("El archivo es demasiado grande. El límite es de 10 MB.");
        return;
      }
      setFile(selectedFile);
    }
  };
  useEffect(() => {
    if (step === 4) {
      const timer = setTimeout(onRequestClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [step, onRequestClose]);

  const handleConfirmation = async () => {
    console.log("Service ID a enviar:", serviceId);
    console.log("Disponibilidad ID a enviar:", disponibilidadId);
    if (file && disponibilidadId) {
      try {
        const actionResult = await dispatch(
          uploadProofOfPayment({
            serviceId: serviceId,
            disponibilidadId: disponibilidadId,
            file: file,
            selectedOptions: selectedOptions,
          })
        );

        if (uploadProofOfPayment.fulfilled.match(actionResult)) {
          setStep(4); // Pasamos al paso 4
          socket.emit("availabilityChanged", {
            disponibilidadId: disponibilidadId,
          });
        } else {
          throw new Error("Error al subir el comprobante");
        }
      } catch (error) {
        alert("Error al subir el comprobante. Por favor intenta de nuevo.");
      }
    }
  };

  useEffect(() => {
    if (
      optionsForService.length === 0 &&
      !fetchedServices.includes(serviceId)
    ) {
      dispatch(fetchServiceOptions(serviceId));
      setFetchedServices((prev) => [...prev, serviceId]);
    }
  }, [serviceId, optionsForService, fetchedServices, dispatch]);
  useEffect(() => {
    if (!isOpen) {
      setStep(1); // Reiniciar el paso al valor inicial
      setSelectedOptions([]); // Opcional: reiniciar también las opciones seleccionadas si es necesario
      setFile(null); // Reiniciar cualquier otro estado relevante para el modal
    }
  }, [isOpen]);

  return (
    <StyledModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <Stepper currentStep={step} />
      {step === 1 && (
        <StepContainer>
          <Title>Confirmar Reserva</Title>
          <StyledText>
            ¿Estás seguro de que quieres reservar para el{" "}
            {formatDateForReservation(
              availabilityDetails.fecha_inicio,
              availabilityDetails.fecha_fin
            )}
            ?
          </StyledText>
          <Actions>
            <NextButton onClick={() => setStep(2)}>Siguiente</NextButton>
            <CancelButton onClick={onRequestClose}>Cancelar</CancelButton>
          </Actions>
        </StepContainer>
      )}

      {step === 2 && (
        <StepContainer>
          <ServiceOptionsContainer>
            <OptionTitle>Selecciona Las Opciones:</OptionTitle>
            <ServiceOptionsSelector
              options={optionsForService}
              selectedOptions={selectedOptions} // Paso de las opciones seleccionadas
              onOptionsSelected={handleOptionsSelected}
            />
          </ServiceOptionsContainer>
          <Actions>
            <NextButton
              onClick={() => {
                if (selectedOptions.length === 0) {
                  alert(
                    "Por favor, selecciona al menos una opción para continuar."
                  );
                } else {
                  setStep(3);
                }
              }}
            >
              Siguiente
            </NextButton>
            <BackButton onClick={() => setStep(1)}>Atrás</BackButton>
          </Actions>
        </StepContainer>
      )}

      {step === 3 && (
        <StepContainer>
          <Title>Detalles de Pago</Title>
          <PaymentDetails>
            <Subtitle>Opciones seleccionadas:</Subtitle>
            <OptionList>
              {selectedOptions.map((option) => (
                <OptionItem key={option.id}>
                  <OptionCard>
                    <OptionName>{option.nombre}</OptionName>
                    <OptionPrice>${option.precio}</OptionPrice>
                  </OptionCard>
                </OptionItem>
              ))}
            </OptionList>

            <TotalPrice>
              Precio total de opciones: $
              {selectedOptions.reduce(
                (sum, option) => sum + (option.precio || 0),
                0
              )}
            </TotalPrice>
          </PaymentDetails>
          <StyledText>
            Por favor realiza una transferencia al siguiente CBU: [tu CBU aquí].
            Esta es una seña del 50% del total. El resto se pagará en persona.
          </StyledText>
          <FileInput type="file" onChange={handleFileChange} />
          <Actions>
            <ConfirmButton onClick={handleConfirmation}>
              Confirmar
            </ConfirmButton>
            <BackButton onClick={() => setStep(2)}>Atrás</BackButton>
          </Actions>
        </StepContainer>
      )}

      {step === 4 && (
        <StepContainer>
          <Title>Reserva Exitosa</Title>
          <ThankYouText>
            ¡Gracias por tu reserva! El modal se cerrará en unos segundos.
          </ThankYouText>
        </StepContainer>
      )}
    </StyledModal>
  );
};

export default ConfirmReservationModal;
