import React from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import Link from "next/link";

const BackgroundContainer = styled.div`
  width: 100%;
  height: 300px; // Altura ajustable según necesidad
  position: relative;
  overflow: hidden;
  margin-top: 85px;
  display: flex;
  justify-content: center; // Centra horizontalmente el contenido
  align-items: center; // Centra verticalmente el contenido
  @media (max-width: 768px) {
    height: 200px; // Altura ajustable según necesidad
    margin-top: 74px;

  }
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

const Title = styled(motion.h1)`
  position: absolute;
  color: #fff0f5 !important; // Color del texto para contraste con la imagen
  font-size: 2.5rem; // Tamaño del título
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.6); // Sombra para mejorar legibilidad
  text-align: center; // Alineación del texto
  padding: 0 20px; // Espaciado para evitar que el texto toque los bordes en pantallas pequeñas
  @media (max-width: 768px) {
    font-size: 2rem; // Tamaño más pequeño para pantallas más estrechas
  }
  @media (max-width: 480px) {
    font-size: 1.7rem; // Tamaño aún más pequeño para móviles
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.9); // Sombra para mejorar legibilidad

  }
`;


const BackgroundImageWithTitle = () => {
  return (
    <BackgroundContainer>
      <BackgroundImage
        src="/img/p.webp"
        alt="Fondo de maquillaje"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1 }}
      />
      <Title
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Productos de Belleza
      </Title>
    </BackgroundContainer>
  );
};

export default BackgroundImageWithTitle;
