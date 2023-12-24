import styled from "styled-components";

export const CardContainer = styled.div`
  font-family: "Roboto", sans-serif;
  border: 1px solid #f2e0e4; // Borde rosa suave
  padding: 20px;
  margin: 20px 0;
  border-radius: 15px; // Bordes más redondeados
  box-shadow: 0px 2px 10px rgba(216, 174, 191, 0.5); // Sombra rosa
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: linear-gradient(to bottom, #fefefe 0%, #fdf6f8 100%);
  transition: all 0.3s;
  max-width: 400px; // Limitar el ancho máximo

  &:hover {
    box-shadow: 0px 5px 15px rgba(216, 174, 191, 0.7);
    transform: translateY(-5px);
    background: linear-gradient(to bottom, #fdf6f8 0%, #fcebef 100%);
  }
  @media (max-width: 768px) {
    padding: 15px;
    margin: 15px 10px;
    // Ajustes adicionales para pantallas más pequeñas...
  }
`;
export const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;

  &::before {
    content: ""; // Puedes añadir un separador entre los detalles si lo prefieres
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #e0e0e0;
  }
  @media (max-width: 768px) {
    gap: 8px;
    // Ajustes adicionales para pantallas más pequeñas...
  }
`;

export const CardLabel = styled.span`
  font-weight: 500;
  color: #444;
  font-size: 0.95em;
  margin-right: 10px;
  @media (max-width: 768px) {
    font-size: 0.85em;
    // Ajustes adicionales para pantallas más pequeñas...
  }
`;
export const CardValue = styled.span`
  color: #222;
  font-size: 1em;
  display: flex;
  align-items: center;
  gap: 6px; /* Espacio entre el icono y el texto */
  @media (max-width: 768px) {
    font-size: 0.9em;
    // Ajustes adicionales para pantallas más pequeñas...
  }
`;

export const CardButton = styled.button`
  padding: 10px 20px; // Botones ligeramente más grandes
  border-radius: 20px; // Bordes más redondeados
  border: none;
  cursor: pointer;
  color: #fff;
  font-weight: 500;
  transition: all 0.3s;
  background: linear-gradient(
    to right,
    #f9d1d8 0%,
    #f2a1b3 100%
  ); // Gradiente rosa

  &:hover {
    transform: translateY(-2px);
    background: linear-gradient(to right, #f2a1b3 0%, #e4708a 100%);
  }

  &.delete {
    background: linear-gradient(to right, #e7748f 0%, #d54f6d 100%);

    &:hover {
      background: linear-gradient(to right, #d54f6d 0%, #c23352 100%);
    }
  }

  &.complete {
    background-color: #2ecc71;

    &:hover {
      background-color: #27ae60;
    }
  }

  &.pending {
    background-color: #f39c12;

    &:hover {
      background-color: #d35400;
    }
  }

  & + & {
    margin-left: 14px;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 0.9em;
    // Ajustes adicionales para botones en pantallas más pequeñas...
  }
`;

export const CardLink = styled.a`
  color: #d63384; // Color rosa para enlaces
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #b91d6b; // Color rosa más oscuro en hover
    text-decoration: underline;
  }
`;

// Estilos adicionales para los iconos
export const IconWrapper = styled.span`
  color: #d5a1b8; // Color rosa claro para iconos
  font-size: 20px;

  &.money {
    color: #e5c2d1;
  }
`;
