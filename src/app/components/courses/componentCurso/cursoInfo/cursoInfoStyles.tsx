import { Box } from "@mui/material";
import styled from "styled-components";
export const StyledModal = styled(Box)`
  background: linear-gradient(135deg, #fffaf0 0%, #f8f8f8 100%);

  background-color: #fffaf0;
  padding: 30px;
  border-radius: 10px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15);
  border: 1px solid #e0e0e0;
  margin: auto;

  @media (max-width: 768px) {
    padding: 20px;
    max-width: 90%;
  }

  @media (max-width: 480px) {
    padding: 15px;
    max-width: 100%;
  }
`;
export const DisponibilidadContainerr = styled.div`
  background-color: #f0e6d2; // Un tono claro que combina con el beige
  padding: 15px;
  margin-top: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
  h3 {
    color: #4a4a4a; // Un tono oscuro para el título
  }
`;

export const DisponibilidadInfoo = styled.p`
  color: #5a5a5a; // Un color gris oscuro para el texto
  margin: 5px 0;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const StyledLabel = styled.label`
  position: absolute;
  top: 65%;
  left: 10px;
  transform: translateY(-50%);
  background: none;
  transition: all 0.3s;
  pointer-events: none;
  color: #aaa; // color del texto inicial
`;

export const StyledInputContainer = styled.div`
  position: relative;
  padding-top: 15px;
  margin-bottom: 10px

`;
export const StyledTitle = styled.h3`
  font-family: 'Roboto', sans-serif; // Asegúrate de que estés usando esta fuente o elige una que prefieras
  color: #4a4a4a; // Un color que combine con tu esquema
  text-align: center; // Centrar el título para darle un aspecto más moderno
  margin-bottom: 25px; // Espacio antes de los inputs
  font-size: 1.5em; // Un tamaño destacado pero no excesivo
  font-weight: bold; // Texto en negrita para destacar
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box;

  &:focus {
    border-color: #ff69b4;
    outline: none;
  }

  &:focus + label, &:not(:placeholder-shown) + label {
    top: 0;
    left: 0;
    font-size: 0.8em;
    color: #ff69b4;
    background: #fffaf0; // el mismo color que el fondo del modal
    padding: 0 5px;
    transform: translateY(-36%);
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
  background-color: #ff69b4;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-family: "Roboto", sans-serif;
  margin-right: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 10px 15px;
    font-size: 0.9em;
  }
`;
export const StepContainer = styled.div`
  margin-bottom: 20px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const HorarioContainer = styled.div`
  margin-top: 15px;
  padding: 10px;
  background-color: #f8f8f8; // Un color de fondo sutil
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
  h4 {
    margin-bottom: 10px;
    color: #333; // Color oscuro para el título de horarios
  }

  p {
    margin-bottom: 5px;
    color: #555; // Color ligeramente más claro para los detalles
  }
`;

export const StepperContainer = styled.div`
  margin-bottom: 20px;
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
