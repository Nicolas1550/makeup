import styled from "styled-components";
import { Button as MuiButton } from "@mui/material";

const primaryColor = "#FF6B6B";
const secondaryColor = "#4ECDC4";

export const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 800px;
  background-color: #fff5f5;
  padding: 2.5rem;
  border-radius: 15px;
  outline: none;
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.12);
  color: #333;
  max-height: 80vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
    background-color: #faf3e0;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #c06c84;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #f67280;
  }
  @media (max-width: 768px) {
    width: 90%; // Más ancho en dispositivos más pequeños
    max-width: none; // Eliminar el max-width
    padding: 1.5rem; // Padding más pequeño
    border-radius: 10px; // Bordes ligeramente menos redondeados
  }
`;

export const Total = styled.div`
  font-weight: bold;
  margin-top: 2rem;
  font-size: 1.6rem;
  border-top: 3px solid ${primaryColor}; // Usar el color primario
  padding-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    font-size: 1.4rem; // Ligeramente más pequeño en móviles
    padding-top: 1rem; // Menor padding
  }
`;

export const Button = styled(MuiButton)`
  margin-top: 1.5rem;
  width: 100%;
  background-color: ${secondaryColor} !important;
  color: #fff !important; // Texto blanco
  transition: background-color 0.3s !important;

  &:hover {
    background-color: ${primaryColor} !important;
  }
  @media (max-width: 768px) {
    font-size: 1rem; // Tamaño de letra ajustado
    padding: 1rem 0; // Padding más alto para un toque más fácil
  }
`;

export const ProductRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 3px solid #f7c6d0; // Borde más grueso
  padding: 2rem 0; // Más relleno para un mejor espacio
  transition: background-color 0.3s;

  &:hover {
    background-color: #fff0f0; // Fondo sutilmente rosado al pasar el cursor
  }
  @media (max-width: 768px) {
    flex-direction: column; // Cambiar la dirección de flex a columna
    align-items: flex-start; // Alinear elementos al inicio
  }
`;
export const ProductImage = styled.div`
  flex: 1;
  img {
    width: 70px; // Un poco más grande
    height: 70px;
    object-fit: cover;
    border-radius: 10px;
    border: 1px solid #f7c6d0; // Borde sutil
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); // Sombra más prominente
  }
  @media (max-width: 768px) {
    width: auto; // Cambiar de 100% a auto
    margin-right: 1rem; // Agregar un margen derecho para separar imagen y nombre
    border: 2px solid #c06c84; // Agregar un borde sólido
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // Agregar una sombra ligera
    margin: 0.5rem; // Agregar un margen alrededor de la imagen
  }
`;
export const ProductName = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-left: 2rem;
  font-size: 1.1rem; // Más grande
  font-weight: 600; // Más negrita
  color: #444; // Un poco más oscuro
  @media (max-width: 768px) {
    flex-grow: 1; // Permitir que crezca para ocupar espacio disponible
    margin-left: 0; // Quitar margen izquierdo
    justify-content: flex-start; // Alinear al inicio
    gap: 0.5rem; // Reducir el espacio entre la imagen y el texto
  }
`;
export const ProductPrice = styled.span`
  flex: 2;
  text-align: right;
  font-size: 1.4rem; // Más grande
  font-weight: 700; // Más negrita
  margin-right: 3rem; // Más margen
  color: ${primaryColor};
  @media (max-width: 768px) {
    font-size: 1.2rem; // Reducir el tamaño de la fuente
    text-align: center; // Cambiar la alineación a izquierda
    margin-right: 0rem; // Reducir el margen derecho
    display: none;
  }
`;
export const ProductQuantity = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  gap: 1rem; // Más espacio entre elementos
  justify-content: flex-end;

  button {
    background: none;
    border: none;
    padding: 0.5rem; // Relleno para hacerlos más clickeables
    border-radius: 5px; // Esquinas redondeadas
    transition: background-color 0.3s;

    &:hover {
      background-color: #f7c6d0; // Fondo sutilmente rosado al pasar el cursor
    }
  }

  svg {
    // Iconos
    font-size: 1.5rem; // Más grandes
  }
  @media (max-width: 768px) {
    width: 100%; // Ocupar el ancho completo
    justify-content: space-around; // Espaciar los botones uniformemente
    margin-top: 1rem; // Añadir un margen superior
  }
`;
