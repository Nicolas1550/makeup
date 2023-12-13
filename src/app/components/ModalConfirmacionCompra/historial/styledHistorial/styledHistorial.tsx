import styled from "styled-components";
import { Button, Paper } from "@mui/material";

export const StyledOrderContainer = styled(Paper)`
  font-family: "Inter", sans-serif;
  margin: 25px 0;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  background-color: #f8fafc;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 15px; // Reducir el padding en pantallas más pequeñas
    margin: 15px 0; // Reducir el margen
  }
`;

export const StyledButton = styled(Button)(({}) => ({
  color: "white",
  backgroundColor: "#D47FA6", // Tono rosado por defecto
  "&:hover": {
    backgroundColor: "#BF6C95", // Tono rosado más oscuro al pasar el cursor por encima
  },
  "&.MuiButton-containedPrimary": {
    backgroundColor: "#BF6C95", // Un tono rosado para botones primarios
    "&:hover": {
      backgroundColor: "#A75884",
    },
  },
  "&.MuiButton-containedSecondary": {
    backgroundColor: "#F2D7E1", // Tono rosado claro para botones secundarios
    color: "#BF6C95",
    "&:hover": {
      backgroundColor: "#E4BFD0",
    },
  },
}));
export const OrderHeader = styled.div`
  cursor: pointer;
  font-weight: 600;
  padding: 10px 0;
  margin-bottom: 20px;
  color: #2c5282;
  font-size: 20px;
  transition: color 0.2s ease-in-out;

  // Permitir que el texto se ajuste según sea necesario
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;

  // Ajustar el tamaño de la fuente para dispositivos más pequeños
  @media (max-width: 768px) {
    font-size: 20px; // Tamaño de fuente más pequeño en pantallas menores
  }

  // Ajustes adicionales para dispositivos aún más pequeños
  @media (max-width: 480px) {
    font-size: 15px; // Tamaño de fuente aún más pequeño para pantallas muy pequeñas
  }

  span {
    white-space: normal;
  }

  &:hover {
    color: #4a90e2;
  }
`;

export const OrderDetailsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 20px 0;

  // Media query para pantallas más pequeñas
  @media (max-width: 768px) {
    grid-template-columns: 1fr; // Cambiar a una sola columna en pantallas pequeñas
    gap: 10px; // Reducir el espacio entre elementos
    padding: 10px 0; // Reducir el padding
  }
`;

export const successMessageStyle = {
  color: "#38a169",
  backgroundColor: "#edf7ed",
  border: "1px solid #c6f6d5",
  padding: "10px",
  borderRadius: "8px",
  marginTop: "10px",
};

export const OrderSection = styled.div`
  padding: 15px 0;
  border-top: 1px solid #e2e8f0;
  margin-top: 20px;

  // Media query para pantallas más pequeñas
  @media (max-width: 768px) {
    padding: 10px 0; // Reducir el padding
    margin-top: 15px; // Reducir el margen superior
  }
`;

export const SectionTitle = styled.h4`
  font-weight: 600; // Más negrita
  margin-bottom: 10px;
  font-size: 18px;
  color: #4a5568;
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
  }
  @media (max-width: 768px) {
    font-size: 16px; // Reducir el tamaño de fuente
    margin-bottom: 8px; // Reducir el margen inferior
  }
`;

export const ListItem = styled.li`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  color: #718096;
  div {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  @media (max-width: 768px) {
    flex-direction: column; // Cambiar a una disposición en columna
    align-items: flex-start; // Alinear elementos al inicio para una mejor disposición
    gap: 10px; // Aumentar el espacio entre elementos
  }
`;
