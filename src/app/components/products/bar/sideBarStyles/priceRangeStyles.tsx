import styled from "styled-components";
import {
  secondaryColor,
  thumbBorder,
  thumbColor,
  thumbColorHover,
} from "./colors";
import { StyledFilterBar, colors } from "./sideBarStyle";
import { PriceRangeInput } from "./inputStyles";

export const PriceRangeContainer = styled(StyledFilterBar)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 10px;
  background-color: ${colors.neutralLight}; // Fondo claro con tono cálido como en el diseño móvil
  border: 2px solid ${colors.borderGray}; // Borde que coincide con el diseño móvil
  border-radius: 30px;
  box-shadow: 0px 4px 12px rgba(255, 105, 180, 0.2);
  color: ${colors.text}; // Color de texto para mantener la coherencia
  width: 100%; // Asegúrate de que ocupe todo el ancho

  // Asegúrate de que las etiquetas y otros textos coincidan también
  label {
    color: ${colors.pinkDark}; // Coincide con el diseño móvil
  }

  // Estilos para los inputs de rango de precio para que coincidan con la apariencia móvil
  ${PriceRangeInput} {
    border: 2px solid ${colors.pinkLight}; // Coincide con el diseño móvil
    background-color: white; // Fondo blanco como los demás elementos de filtro
    color: ${colors.text}; // Texto que coincide con el diseño móvil

    // Añade los estados de hover y focus si son necesarios para coincidir con otros elementos interactivos
    &:focus {
      border-color: ${colors.pinkDark}; // Resalta el foco como en el diseño móvil
      box-shadow: 0px 4px 12px rgba(255, 105, 180, 0.2); // Sombra para el enfoque
    }

    &:hover {
      border-color: ${colors.pinkDark}; // Cambia el color al pasar el mouse como en el diseño móvil
    }
  }
`;
export const PriceRangeBar = styled.div`
  width: 100%;
  height: 6px;
  background: ${secondaryColor};
  border-radius: 5px;
  position: relative;
  margin: 10px 0;

  @media (max-width: 768px) {
    width: 100% !important;
    height: 3px;
    margin: 20px 0;
  }
`;
export const PriceRangeInputs = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 10px; // Añade un pequeño espacio entre los dos inputs
`;

export const thumbStyles = {
  height: "22px",
  width: "22px",
  borderRadius: "50%",
  backgroundColor: thumbColor,
  border: `4px solid ${thumbBorder}`,
  boxShadow: "0px 2px 6px rgba(255, 105, 180, 0.2)",
  zIndex: 2,
  cursor: "pointer",
  transition: "background-color 0.3s, transform 0.3s",

  "&:hover": {
    backgroundColor: thumbColorHover,
    transform: "scale(1.15)",
  },
};

export const PriceRangeTrack = styled.div`
  height: 6px;
  background: ${secondaryColor};
  border-radius: 5px;
`;
