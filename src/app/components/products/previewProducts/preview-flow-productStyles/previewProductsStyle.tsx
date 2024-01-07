import styled, { keyframes } from "styled-components";
import { Button } from "@mui/material";

export const colors = {
  neutralLight: "#FAF3E0",
  pinkDark: "#FF69B4",
};

export const PreviewContainer = styled.div`
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, ${colors.neutralLight} 0%, #f5f5f5 100%);
  padding: 4rem 0;
  font-family: "Arial", sans-serif;
  z-index: 0 !important;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05); /* Sombra sutil para el contenedor */
  border-radius: 0px; /* Bordes redondeados para el contenedor */
  transition: transform 0.3s, box-shadow 0.3s;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

export const ProductSlide = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  position: relative;
  transition: transform 0.3s;

  & img {
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    transition: box-shadow 0.3s, filter 0.3s, transform 0.3s; // Agregar transición para transform
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

    &:hover {
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15); // Sombra más pronunciada en hover
      filter: brightness(105%); // Ligeramente más brillante en hover
      transform: scale(1.05); // Efecto de zoom sutil
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 0, 0, 0.1) 100%
    ); /* Gradient Overlay */
    z-index: 1;
  }

  &:hover {
    transform: scale(1.05);
  }

  &:hover img {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    filter: brightness(
      1.1
    ); /* Hacer que la imagen sea ligeramente más brillante al pasar el ratón */
  }
`;

export const ViewAllButton = styled(Button)`
  position: absolute;
  bottom: 2rem;
  left: 50%; // Centra el botón horizontalmente
  transform: translateX(-50%); // Ajusta la posición horizontalmente para centrar el botón
  color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 25px;
  padding: 0.7rem 2rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  background-color: ${colors.pinkDark};
  transition: all 0.3s;

  &:hover {
    background-color: ${colors.pinkDark};
    transform: translateX(-50%) translateY(-30%) scale(1.05); // Mantén el botón centrado incluso en hover
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1.5rem; // Reduce el tamaño del relleno para un botón más pequeño
    font-size: 0.9rem; // Reduce el tamaño de la fuente si es necesario
  }
`;
export const ProductFlowAnimation = keyframes`
  0% { transform: translateX(0%); }
  100% { transform: translateX(-30%); } /* Desplazamiento reducido para una visualización más lenta */
`;

export const ProductFlowContainer = styled.div`
  position: absolute;
  top: 30%;
  left: 0;
  transform: translateY(50%);
  width: 250%;
  height: 150%;

  display: flex;
  overflow-x: hidden;
  animation: ${ProductFlowAnimation} 60s linear infinite;
  @media (max-width: 768px) {
    width: 750%;
    height: 150%;
    position: absolute;
    top: 42%;
    left: 0;
  }
`;

export const ProductDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
  width: 300px;
  height: 250px;
  padding: 1.5rem;
  margin-right: 60px;
  background-color: rgba(253, 245, 230, 0.9); // Beige claro
  color: #3d2c1f; // Marrón oscuro para el texto
  border: 1px solid #a79b8e; // Borde en un tono beige más oscuro
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.03); // Efecto de zoom más sutil
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12); // Sombra más intensa al pasar el ratón
  }
  @media (max-width: 768px) {
    width: 10%; // Ajusta el ancho para dispositivos más pequeños
    height: 200px;

    margin-right: 60px;
    padding: 1rem; // Ajusta el padding para dispositivos más pequeños

    &:hover {
      width: 10%; // Mantén el mismo ancho al pasar el cursor
      transform: none; // Elimina la transformación en hover
    }
  }
  img {
    max-width: 100%;
    max-height: 70%;
    object-fit: cover;
    margin-bottom: 1rem;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;

    &:hover {
      transform: scale(1.05); // Aumentar el efecto de escala solo en la imagen
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15); // Sombra más pronunciada en la imagen
    }
  }
  h4,
  p {
    margin: 0;
    min-height: 25px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 90%;
  }

  h4 {
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
    font-weight: bold;
    color: #3d2c1f; // Marrón oscuro para el título
  }

  p {
    font-size: 1rem;
    color: #3d2c1f; // Marrón oscuro para la descripción
  }
  .productDescription {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.5rem;
    background-color: rgba(
      50,
      50,
      50,
      0.8
    ); // Mantenemos el fondo negro semi-transparente
    color: white; // Texto blanco para contraste
    font-size: 0.9rem; /* tamaño de fuente reducido */
    text-align: center; /* centrar el texto */
    transform: translateY(
      100%
    ); /* la descripción estará inicialmente fuera de vista */
    transition: transform 0.3s ease; /* transición suave al aparecer */
    border-radius: 0 0 15px 15px; /* bordes redondeados en la parte inferior */
    max-height: 50px; /* altura máxima para la descripción */
    overflow: hidden; /* en caso de que la descripción sea muy larga */
  }

  &:hover .productDescription {
    transform: translateY(
      0
    ); /* al pasar el cursor, la descripción se desplazará a su posición original */
  }
`;
export const Title = styled.h2`
  font-family: "Raleway", sans-serif;
  font-weight: 800;
  font-size: 32px;
  text-align: center;
  margin-bottom: 24px;
  background: linear-gradient(
    to right,
    #d5b895,
    #baaaa8
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 2px;
    background: linear-gradient(
      to right,
      #baa378,
      #d5b895
    );
    border-radius: 1px;
  }

  /* Media query para dispositivos móviles */
  @media (max-width: 768px) {
    -webkit-text-fill-color: #808080 !important; /* Cambia el color del texto a blanco */
    color: #808080 !important; /* Para navegadores que no soportan -webkit-text-fill-color */
  }
`;

export const ProductFlowWrapper = styled.div`
  margin-top: 40px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
