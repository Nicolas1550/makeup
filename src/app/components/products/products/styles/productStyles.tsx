import styled from "styled-components";
import { Button} from "@mui/material";

const secondaryColor = "#4ECDC4";
const softPink = "#f8c6d1";
const darkPink = "#c06c84";

export const ProductPageContainer = styled.div`
  background-color: #f9f8f6;
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
`;

export const CenteredContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const ProductDetailContainer = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 50px;
`;

export const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const DetailContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 15px;

  h2 {
    font-size: 2.2rem;
    font-weight: 600;
    color: #333;
  }

  p {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.1rem;
    color: #555;
  }

  svg {
    font-size: 1.3rem;
    color: ${secondaryColor};
  }
`;

export const StyledButton = styled(Button)`
  background-color: ${softPink}; // Un rosa suave que encaje con el esquema de color del contenedor
  color: white; // Texto blanco para mantener la legibilidad
  font-weight: 600; // Fuente en negrita pero no demasiado gruesa para un aspecto moderno
  text-transform: uppercase; // Uso de mayúsculas para que el botón se destaque y mantenga la consistencia
  letter-spacing: 0.05em; // Espaciado de letras para mejorar la estética
  padding: 12px 30px; // Un padding que equilibre el tamaño del botón con el contenido del contenedor
  border-radius: 5px; // Bordes menos redondeados para un estilo contemporáneo
  border: none; // Sin bordes para un aspecto limpio
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // Una sombra ligera para dar profundidad
  transition: all 0.3s ease; // Transición suave para todos los estados

  &:hover {
    background-color: ${darkPink}; // Un color más oscuro en hover para un efecto sutil
    color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15); // Sombra más pronunciada en hover para un efecto de elevación
  }

  // Ajusta el estilo del botón para dispositivos móviles
  @media only screen and (max-width: 777px) {
    padding: 10px 20px;
    font-size: 0.8em; // Un tamaño de fuente más pequeño para dispositivos con pantallas más pequeñas
  }
`;
