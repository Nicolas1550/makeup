import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";



const Title = styled(motion.h1)`
  position: absolute;
  top: 54%;
  left: 30%;
  transform: translate(-50%, -50%);
  color: #fff0f5; // Asegúrate de que el color del texto contraste con la imagen
  font-size: 2.5rem; // Tamaño del título
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.6); // Añade sombra al texto para mejorar la legibilidad
  @media (max-width: 480px) {
    top: 35%;
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
