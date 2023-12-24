import styled from "@emotion/styled";
import { Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { FaBuilding, FaAward, FaHandshake } from "react-icons/fa";

// Colores y estilos
const COLORS = {
  NEUTRAL_LIGHT: "#FAF3E0",
  DARKER_GRAY: "#808080",
  PINK_DARK: "#FF69B4",
  GLASS: "rgba(255, 255, 255, 0.7)", // Fondo más transparente para efecto de vidrio
};

export const RootContainer = styled(Container)`
  padding: 5rem 0;
  text-align: center;
  const gradient = "linear-gradient(to right, #ece9e6 0%, #ffffff 100%)";
  backdrop-filter: blur(15px); // Aumentar el efecto de desenfoque
  border-radius: 25px; // Bordes más redondeados
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); // Sombra más pronunciada
  margin: 2rem; // Añadir margen para resaltar el contenedor
  
  &:hover {
    transform: scale(1.02); // Ligera animación de escala al pasar el ratón
    transition: transform 0.3s ease;
  }
  span{
    color:black;
  }
`;
export const Title = styled(Typography)`
  margin-bottom: 1rem;
  font-weight: 600;
  color: ${COLORS.DARKER_GRAY}; // Asegurando contraste
`;

export const Subtitle = styled(Typography)`
  margin-bottom: 3rem;
  color: ${COLORS.PINK_DARK}; // Color llamativo para el subtítulo
`;

export const IconContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  margin-bottom: 1rem;
  color: ${COLORS.PINK_DARK};
  &:hover {
    color: ${COLORS.DARKER_GRAY}; // Cambiar el color al pasar el ratón
  }
`;

export const GridTitle = styled(Typography)`
  margin-bottom: 1rem;
  font-weight: 600;
  color: ${COLORS.DARKER_GRAY}; // Manteniendo coherencia en los títulos
`;

export const GridText = styled(Typography)`
  color: ${COLORS.DARKER_GRAY};

  span {
    color: black !important; // Aplica el color negro solo a los elementos <p> dentro de GridText
  }
`;


// Estilos personalizados para cada icono
export const BuildingIcon = styled(FaBuilding)`
  font-size: 3rem;
  color: ${COLORS.PINK_DARK};
`;

export const AwardIcon = styled(FaAward)`
  font-size: 3rem;
  color: ${COLORS.PINK_DARK};
`;

export const HandshakeIcon = styled(FaHandshake)`
  font-size: 3rem;
  color: ${COLORS.PINK_DARK};
`;

// Ejemplo de animaciones con Framer Motion
export const AnimatedIconContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  margin-bottom: 1rem;
  color: ${COLORS.PINK_DARK};
  whileHover: { scale: 1.1, rotate: 10 };
  transition: { type: 'spring', stiffness: 300 };
`;