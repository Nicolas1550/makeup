import React, { useEffect, useState } from "react";
import { ServiceOption } from "../../../../redux/serviceSlice/servicesSlice"; // Asegúrate de usar la ruta correcta
import styled from "styled-components";
const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const OptionList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px; // Espacio entre opciones
  width: 100%;
`;

const OptionItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f7f7f7;
  border-radius: 8px;
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #eaeaea;
  }

  &.selected {
    background-color: #f7c6d0; // Cambia a tu color de elección
  }
`;

const OptionText = styled.span`
  font-size: 16px;
  color: #333;
`;

const TotalPriceText = styled.div`
  margin-top: 20px;
  font-weight: bold;
  color: black;
`;
interface Props {
  options: ServiceOption[];
  onOptionsSelected: (selectedOptions: ServiceOption[]) => void;
}
const ServiceOptionsSelector: React.FC<Props> = ({
  options,
  onOptionsSelected,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<ServiceOption[]>([]);

  const handleOptionToggle = (option: ServiceOption) => {
    if (selectedOptions.find((o) => o.id === option.id)) {
      setSelectedOptions((prev) => prev.filter((o) => o.id !== option.id));
    } else {
      setSelectedOptions((prev) => [...prev, option]);
    }
  };

  // Informar al componente padre sobre las opciones seleccionadas
  useEffect(() => {
    onOptionsSelected(selectedOptions);
  }, [selectedOptions, onOptionsSelected]);

  return (
    <OptionsContainer>
      <OptionList>
        {options.map((option) => (
          <OptionItem
            key={option.id}
            className={
              selectedOptions.find((o) => o.id === option.id) ? "selected" : ""
            }
            onClick={() => handleOptionToggle(option)}
          >
            <OptionText>{option.nombre}</OptionText>
            <OptionText>${option.precio}</OptionText>
          </OptionItem>
        ))}
      </OptionList>
      <TotalPriceText>
        Precio total: $
        {selectedOptions.reduce((sum, option) => sum + (option.precio || 0), 0)}
      </TotalPriceText>
    </OptionsContainer>
  );
};

export default ServiceOptionsSelector;
