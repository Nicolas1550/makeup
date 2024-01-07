import { motion } from "framer-motion";
import React from "react";
import styled, { keyframes } from "styled-components";

const fadeInScaleUp = keyframes`
  from {
    transform: scale(0.5) translate(-50%, -50% ) translateY(-100px);
    opacity: 0;
  }
  to {
    transform: scale(1) translate(-50%, -50%) translateY(0);
    opacity: 1;
  }
`;

const ImagenPrincipalContainer = styled.div`
  position: relative;
  width: auto;
  height: 60vh; // Altura ajustada

  @media (max-width: 768px) {
    height: 40vh; // Altura más baja para dispositivos más pequeños
  }

  @media (max-width: 480px) {
    height: 50vh; // Altura aún más baja para pantallas de móviles
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; // Asegura que la imagen cubra todo el ancho y alto
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); // Capa semi-transparente negra
`;

const OverlayText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #c0c0c0;
  text-align: center;
  font-size: 3rem; // Tamaño de la fuente para pantallas grandes
  font-family: "Playfair Display", serif;
  animation: ${fadeInScaleUp} 1.5s ease-in-out forwards;

  @media (max-width: 768px) {
    font-size: 1.8rem; // Fuente más pequeña para tabletas
  }

  @media (max-width: 480px) {
    font-size: 1.5rem; // Fuente aún más pequeña para móviles
    transform: translate(
      -50%,
      -60%
    ); // Ajustar la posición para que no se pierda por lo alto
  }
`;

const Title = styled(motion.h1)`
  position: absolute;
  top: 48%;
  left: 30%;
  transform: translate(-50%, -50%);
  color: #fff0f5; // Asegúrate de que el color del texto contraste con la imagen
  font-size: 2.5rem; // Tamaño del título
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.6); // Añade sombra al texto para mejorar la legibilidad
  @media (max-width: 480px) {
    top: 50%;
    left: 10%;
  }
`;
const BackgroundContainer = styled.div`
  width: 100%;
  height: 300px; // Puedes ajustar el alto según necesites
  position: relative;
  overflow: hidden;
`;

const BackgroundImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.5; // Opacidad reducida para la imagen
  &:hover {
    transform: scale(1.05); // Efecto de zoom al pasar el cursor
    transition: transform 0.5s ease;
  }
`;
type ImagenPrincipalProps = {
  urlImagen?: string;
};

const ImagenPrincipal: React.FC<ImagenPrincipalProps> = ({ urlImagen }) => {
  if (!urlImagen) {
    return <div>No disponible</div>;
  }

  return (
    <BackgroundContainer>
      <BackgroundImage
        src={urlImagen}
        alt="Imagen Principal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1 }}
      />
      <Title
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Descubre la Belleza del Maquillaje{" "}
      </Title>
    </BackgroundContainer>
  );
};

export default ImagenPrincipal;
