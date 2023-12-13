import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  background-color: #fef3f8;
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  max-width: auto;
  margin: 40px auto;

  // Media query para pantallas más pequeñas
  @media (max-width: 768px) {
    padding: 15px; // Reducir el padding
    margin: 20px auto; // Reducir el margen superior e inferior
    max-width: 100%; // Aumentar el ancho máximo para llenar más espacio
  }
`;

export const Heading = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #9b4664;
  font-family: "Playfair Display", serif;

  // Media query para pantallas más pequeñas
  @media (max-width: 768px) {
    overflow: hidden; // Asegura que el contenido que desborde el contenedor sea ocultado
    white-space: normal; // Permite que el texto pase a la siguiente línea
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; // Limita el texto a 2 líneas
    -webkit-box-orient: vertical;
    font-size: 20px; // Reducir el tamaño de fuente si es necesario
  }
`;

export const RefreshButton = styled.button`
  background-color: #d47fa6; // Tono rosado
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-weight: 600; // Hacer el texto un poco más bold

  &:hover {
    background-color: #bf6c95; // Tono rosado más oscuro
  }
`;

export const ReservationDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;

  // Media query para pantallas más pequeñas
  @media (max-width: 768px) {
    flex-direction: column; // Cambiar a dirección de columna en pantallas pequeñas
    align-items: flex-start;
    gap: 10px; // Añadir un espacio entre elementos
  }
`;

export const DetailLabel = styled.span`
  font-weight: bold;
  margin-right: 10px;
  color: #9b4664; // Tono rosado oscuro
`;

export const DetailValue = styled.span`
  color: #b48b9f; // Tono rosado claro
`;

export const ReservationsList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
`;

export const ReservationItem = styled.li`
  padding: 10px;
  background-color: #fff;
  border: 1px solid #fee2e7; // Un borde rosado claro
  margin-top: 10px;
  border-radius: 5px;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  }
  @media (max-width: 768px) {
    margin-top: 5px; // Reducir el margen superior
  }
`;
export const StyledSelect = styled.select`
  margin-top: 20px;
  padding: 8px 12px;
  border: 1px solid #fee2e7; // Un borde rosado claro
  border-radius: 5px;
  background-color: #fff;
  color: #9b4664; // Tono rosado oscuro
  font-size: 16px;
  cursor: pointer;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:hover,
  &:focus {
    border-color: #d47fa6; // Tono rosado al pasar el cursor por encima o al enfocarse
    box-shadow: 0px 0px 5px rgba(212, 127, 166, 0.5); // Una sombra rosada suave
  }

  & option {
    padding: 6px 10px;
    background-color: #fef3f8; // Fondo rosado muy suave
    color: #9b4664; // Tono rosado oscuro
  }
`;
