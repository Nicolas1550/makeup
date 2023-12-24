import { Box } from "@mui/material";
import styled from "styled-components";

export const StyledModal = styled(Box)`
  background-color: #fffaf0; // Un tono suave de fondo
  padding: 30px;
  border-radius: 10px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  margin: auto; // Para centrar el modal

  @media (max-width: 768px) {
    padding: 20px;
    max-width: 90%;
  }

  @media (max-width: 480px) {
    padding: 15px;
    max-width: 100%;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: "Roboto", sans-serif;
  @media (max-width: 768px) {
    gap: 0px;
  }
`;

export const StyledInput = styled.input`
  padding: 12px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-family: "Roboto", sans-serif;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const StyledSelect = styled.select`
  padding: 12px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-family: "Roboto", sans-serif;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const StyledButton = styled.button`
  background-color: #ff69b4; // Color rosa intenso para botones
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-family: "Roboto", sans-serif;

  &:hover {
    background-color: #ff1493; // Un tono más oscuro en hover
  }
  @media (max-width: 768px) {
    padding: 10px 15px;
    font-size: 0.9em;
  }
`;
export const DisponibilidadContainer = styled.div`
  border: 1px solid #4a4a4a; // Borde más oscuro
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: #2d2d2d; // Fondo oscuro
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); // Sombra más sutil
`;

export const DisponibilidadInfo = styled.p`
  color: #e0e0e0; // Mejora el contraste con un tono más claro
  font-size: 1rem; // Tamaño estándar para mejorar la legibilidad
  line-height: 1.5; // Espaciado entre líneas para mejorar la legibilidad
`;

export const HorarioInfo = styled.p`
  color: #cccccc;
  font-size: 0.9rem; // Un poco más pequeño para diferenciar de la info principal
  line-height: 1.4;
`;

export const ReservarButton = styled.button`
  background-color: #db7093; // Color rosa palo elegante
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c56282; // Un tono más oscuro al pasar el mouse
  }
`;
export const ScrollableContainer = styled.div`
  max-height: 500px;
  overflow-y: auto;
  padding-right: 5px; // Para evitar que el contenido toque directamente la barra de desplazamiento

  // Personalización de la barra de desplazamiento
  &::-webkit-scrollbar {
    width: auto;
  }

  &::-webkit-scrollbar-track {
    background: #2d2d2d; // Color de fondo del track, igual al fondo del contenedor
  }

  &::-webkit-scrollbar-thumb {
    background-color: #db7093; // Color del thumb, similar al de tus botones
    border-radius: 5px; // Bordes redondeados para el thumb
    border: 3px solid #2d2d2d; // Borde para separar el thumb del track
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #c56282; // Un tono más oscuro cuando se pasa el ratón sobre el thumb
  }
`;
export const VerMasButton = styled.button`
  background-color: #ff69b4; // Un color rosado intenso, similar a StyledButton
  color: white;
  padding: 10px 20px;
  margin: 10px 0; // Agrega un poco de margen arriba y abajo
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-family: "Roboto", sans-serif;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff1493; // Un tono más oscuro al pasar el mouse, similar a StyledButton
  }
`;
