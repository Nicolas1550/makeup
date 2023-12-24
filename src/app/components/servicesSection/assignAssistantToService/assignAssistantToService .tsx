import React, { useEffect, useState } from "react";
import {
  AssignButton,
  AssistantItem,
  AssistantList,
  Label,
  ModalBackground,
  ModalContent,
  RemoveButton,
  SubTitle,
  Title,
} from "./stylesAssistantToService";
import {
  fetchServices,
  fetchAssistants,
  fetchAssignedHelpers,
  assignAssistant,
  removeAssistant,
} from "../../../redux/assistantSlice/assistantSlice"; // Reemplaza 'pathToYourSlice' con la ruta correcta
import { useAppDispatch, useAppSelector } from "../../../redux/store/appHooks"; // Asegúrate de usar la ruta correcta a tus hooks
import Select, { StylesConfig } from "react-select";
interface OptionType {
  value: string;
  label: string;
}

interface Props {
  serviceId: number | null;
  onClose: () => void;
}
const customSelectStyles: StylesConfig<OptionType> = {
  control: (base) => ({
    ...base,
    backgroundColor: "#f7f2e8",
    borderColor: "#e5ded0",
    borderRadius: "5px",
    padding: "5px",
    fontFamily: "Georgia, serif",
    fontSize: "16px",
    color: "#6d6d6d",
    "&:hover": {
      borderColor: "#d3c9bb",
    },
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#e5ded0" : "transparent",
    "&:active": {
      backgroundColor: "#d3c9bb",
    },
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "#6d6d6d",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};

const AssignAssistantToService: React.FC<Props> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const services = useAppSelector((state) => state.assistant.services);
  const assistants = useAppSelector((state) => state.assistant.assistants);
  const assignedHelpers = useAppSelector(
    (state) => state.assistant.assignedHelpers
  );
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedAssistant, setSelectedAssistant] = useState<string | null>(
    null
  );

  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchAssistants());
  }, [dispatch]);

  useEffect(() => {
    if (selectedService && selectedService !== "") {
      dispatch(fetchAssignedHelpers(selectedService));
    } else {
      // Si selectedService es nulo o una cadena vacía, resetea la lista de ayudantes asignados
      dispatch({ type: "assistant/resetAssignedHelpers" });
    }
  }, [selectedService, dispatch]);

  const handleAssign = () => {
    if (!selectedService || !selectedAssistant) return;
    dispatch(
      assignAssistant({
        serviceId: selectedService,
        assistantId: selectedAssistant,
      })
    )
      .then(() => alert("Asignación exitosa!"))
      .catch((error) => {
        alert("Hubo un error en la asignación");
        console.error(error);
      });
  };

  const handleRemove = (assistantId: number) => {
    if (!selectedService) return;
    dispatch(removeAssistant({ serviceId: selectedService, assistantId }))
      .then(() => alert("Ayudante desasignado con éxito!"))
      .catch((error) => {
        alert("Hubo un error al desasignar el ayudante");
        console.error(error);
      });
  };
  const serviceOptions = services.map((service) => ({
    value: service.id.toString(),
    label: service.title,
  }));
  const assistantOptions = assistants.map((assistant) => ({
    value: assistant.id.toString(),
    label: assistant.username,
  }));

  return (
    <ModalBackground onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Title>Asignar Ayudante a Servicio</Title>

        <div>
          <Label>Servicio:</Label>
          <Select
            placeholder="-- Selecciona un servicio --"
            options={serviceOptions}
            value={serviceOptions.find(
              (option) => option.value === selectedService
            )}
            onChange={(newValue) => {
              const selectedOption = newValue as {
                value: string;
                label: string;
              } | null;
              setSelectedService(selectedOption ? selectedOption.value : null);
            }}
            styles={customSelectStyles}
          />
        </div>

        <div>
          <SubTitle>Ayudantes Asignados:</SubTitle>
          <AssistantList>
            {assignedHelpers.map((assistant, index) => (
              <AssistantItem key={`${assistant.id}-${index}`}>
                {assistant.username}
                <RemoveButton onClick={() => handleRemove(assistant.id)}>
                  Desasignar
                </RemoveButton>
              </AssistantItem>
            ))}
          </AssistantList>
        </div>

        <div>
          <Label>Ayudante:</Label>
          <Select
            placeholder="-- Selecciona un ayudante --"
            options={assistantOptions}
            value={assistantOptions.find(
              (option) => option.value === selectedAssistant
            )}
            onChange={(newValue) => {
              const selectedOption = newValue as {
                value: string;
                label: string;
              } | null;
              setSelectedAssistant(
                selectedOption ? selectedOption.value : null
              );
            }}
            styles={customSelectStyles}
          />
        </div>

        <AssignButton onClick={handleAssign}>Asignar</AssignButton>
      </ModalContent>
    </ModalBackground>
  );
};

export default AssignAssistantToService;
