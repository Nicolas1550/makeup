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
  overflow: hidden;

  @media (max-width: 768px) {
    height: 40vh; // Altura más baja para dispositivos más pequeños
  }

  @media (max-width: 480px) {
    height: 50vh; // Altura aún más baja para pantallas de móviles
    width: auto;
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
  font-size: 3rem !important;
  font-family: "Playfair Display", serif !important;
  animation: ${fadeInScaleUp} 1.5s ease-in-out forwards;

  @media (max-width: 768px) {
    font-size: 1.8rem; // Fuente más pequeña para tabletas
    top: 200px;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem; // Fuente aún más pequeña para móviles
    top: 53%;
  }
`;
const StyledHeading = styled.div`
  font-size: 4rem; // Tamaño más grande para un h2, ajusta según tus necesidades
  font-weight: bold; // h2 suele ser en negrita
  margin: 0; // Remover márgenes por defecto
  color: #c0c0c0; // Ajusta el color según tus necesidades
  text-align: center;
  letter-spacing: 0.05em; // Ajusta el espaciado entre letras

  @media (max-width: 768px) {
    font-size: 2.8rem;
    letter-spacing: 0.04em; // Espaciado un poco más reducido para pantallas pequeñas
  }

  @media (max-width: 480px) {
    font-size: 2.5rem;
    letter-spacing: 0.03em; // Espaciado aún más reducido para pantallas muy pequeñas
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
    <ImagenPrincipalContainer>
      <StyledImage src={urlImagen} alt="Imagen Principal" />
      <Overlay />
      <OverlayText>
        <StyledHeading>
          Descubre la Belleza del Maquillaje
        </StyledHeading>
        {/* Puedes agregar más elementos aquí si lo deseas */}
      </OverlayText>
    </ImagenPrincipalContainer>
  );
};

export default ImagenPrincipal;