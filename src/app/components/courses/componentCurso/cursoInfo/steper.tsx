import React from "react";
import styled from "styled-components";
const completedColor = "#E6ACB2"; // Un rosa empolvado para pasos completados
const pendingColor = "#F7DCD4"; // Un rosa pálido para pasos pendientes
const textColorCompleted = "white"; // Blanco para texto sobre color oscuro
const textColorPending = "#8B575C"; // Un tono tierra para texto sobre color claro

const StepperContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  max-width: 100%;
  padding: 20px 0;
  @media (max-width: 768px) {
    justify-content: space-evenly; // Distribuye los elementos de manera uniforme
    padding: 10px 0; // Reducir el padding para dispositivos móviles
  }
`;

const Circle = styled.div<{ $completed: boolean }>`
  width: 100px;
  height: 80px;
  border-radius: 50%;
  background-color: ${({ $completed }) =>
    $completed ? completedColor : pendingColor};

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72em;
  line-height: 1.1;
  color: ${({ $completed }) =>
    $completed ? textColorCompleted : textColorPending};
  transition: background-color 1s ease, transform 0.3s ease;
  margin: 0;
  padding: 40px;
  text-align: center;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: bold; // Texto en negrita para pasos completados y pendientes
  margin-right: 10px; // Añade espacio a la derecha de cada círculo, excepto el último

  box-shadow: ${({ $completed }) =>
    $completed
      ? "0px 4px 8px rgba(230, 172, 178, 0.4)"
      : "0px 2px 4px rgba(139, 87, 92, 0.2)"};

  &:hover {
    transform: scale(1.05); // Efecto de "hover" para mostrar interactividad
  }
  /* &:not(:last-child) {
    margin-right: 20px; // Añade espacio a la derecha de cada círculo, excepto el último
  } */
  @media (max-width: 768px) {
    width: 130px; // Reducir el tamaño para pantallas pequeñas
    height: 55px; // Reducir el tamaño para pantallas pequeñas
    font-size: 0.5em; // Reducir la fuente para que el texto se ajuste
    padding: 18px; // Ajustar el padding para mantener la proporción
    margin-right: 0; // Eliminar el margen a la derecha en móviles
  }
`;

const Bar = styled.div<{ $completed: boolean }>`
  height: 5px;
  flex-grow: 1;
  background-color: ${({ $completed }) =>
    $completed ? completedColor : pendingColor};
  margin: 0 5px; // Ajustar los márgenes entre círculos y barras
  @media (max-width: 768px) {
    flex-grow: 0; // Evitar que la barra crezca
    width: 20%; // Establecer un ancho fijo para las barras en pantallas pequeñas
  }
`;
const STEPS = ['Seleccionar Disponibilidad', 'Confirmar Datos', 'Subir Comprobante'];

export const Stepper: React.FC<{ currentStep: number }> = ({ currentStep }) => {
  return (
    <StepperContainer>
      {STEPS.map((step, index) => (
        <React.Fragment key={index}>
          <Circle $completed={currentStep > index}>{step}</Circle>
          {index < STEPS.length - 1 && (
            <Bar $completed={currentStep > index + 1} />
          )}
        </React.Fragment>
      ))}
    </StepperContainer>
  );
};

export default Stepper;
