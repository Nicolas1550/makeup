import { Button } from "@mui/material";
import styled from "styled-components";

export const ContenedorPrincipal = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  margin: auto;

  @media (max-width: 768px) {
    padding: 0px;
    margin-top: 0px;
  }

  @media (max-width: 480px) {
    padding: 1px;
    margin-top: 0px;
  }
  width: 100%;     // Asegura que el componente cubra todo el ancho de la página

  background-image: url('/img/12.webp'); // Ruta a tu imagen
  background-size: cover;  // Asegura que la imagen cubra completamente el área sin deformarse
  background-position: center; // Centra la imagen en el contenedor
  background-repeat: no-repeat; // Evita que la imagen se repita
  background-color: #FAF3E0;

`;

export const InfoYClasesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  gap: 30px;
  margin-top: 50px;

  @media (max-width: 1350px) {
    flex-direction: column;
    gap: 20px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 15px;
    margin-top: 20px;
  }
`;

export const CarruselYCursoInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 15px;
  }
`;
export const ClasesContainer = styled.div`
  max-height: 860px;
  overflow-y: auto;
  width: calc(50% - 4rem);
  padding: 2rem;
  color: #5C5C5C;
  margin: 2rem;
  transition: transform 0.3s ease-out, box-shadow 0.3s ease-out, background-color 0.3s ease-out;
  background-color: rgba(255, 255, 255, 0.3); // Fondo blanco con transparencia
  border-radius: 10px;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
    background-color: rgba(255, 255, 255, 0.4); // Fondo más opaco al pasar el cursor
  }

  // Estilos de la barra de desplazamiento
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #2d2d2d;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #a0aec0;
    border-radius: 10px;
    border: 3px solid #2d2d2d;
  }

  @media (max-width: 1350px) {
    width: auto;
    max-height: 400px;
    padding: 1rem;
    margin-top: 1rem;
  }
`;

export const StyledButton = styled(Button)`
  background-color: #d4b895;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  margin: 10px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background-color: #b08968;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 8px 15px;
    font-size: 0.9em;
  }

  @media (max-width: 480px) {
    padding: 6px 10px;
    font-size: 0.8em;
  }
`;
const colors = {
  neutralLight: "#F5EAE0",
  darkerGray: "#5C5C5C",
  gradientPink: "linear-gradient(45deg, #FFB6C1, #FF69B4)",
  gold: "#FFD700",
  backgroundImage:
    "linear-gradient(to right, #000000, #332525, #664b4b, #997070, #ccb5b5, #997070, #664b4b, #332525, #000000)",

  backgroundColor:
    "linear-gradient(to right, #f4e4d7, #f8e2cf, #fde0c8, #fff1e1)",
};
export const ClaseItem = styled.div`
  margin-bottom: 30px;
  padding: 25px;
  background-color: #4b5563;
  color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    background-color: ${colors.backgroundColor}; // Cambio de color al pasar el ratón
  }

  @media (max-width: 768px) {
    padding: 20px;
    margin-bottom: 20px;
  }
`;

export const ClaseTitulo = styled.h3`
  font-weight: bold;
  color: #d4b895;
  margin-bottom: 12px;
  font-size: 1.6em;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 1em;
  }
`;

export const ClaseDescripcion = styled.p`
  color: #f5eae0;
  font-size: 1.2em;
  line-height: 1.8;

  @media (max-width: 768px) {
    font-size: 1em;
  }
`;

export const CursoInfoContainer = styled.div`
  padding: 2rem; // Unidades relativas para mejor responsividad
  background-color: #333333; // Fondo oscuro para contraste
  color: #f5eae0; // Color claro para el texto, mejora la legibilidad
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15); // Sombra sutil para un diseño elegante
  border-radius: 12px; // Bordes redondeados suaves
  width: calc(100% - 4rem); // Ancho ajustado al padding
  margin: 2rem auto; // Centra el contenedor
  transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;

  &:hover {
    transform: scale(1.05); // Escala sutil al pasar el ratón
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2); // Sombra más pronunciada al pasar el ratón
  }

  @media (max-width: 768px) {
    width: calc(100% - 2rem); // Ajuste del ancho en dispositivos móviles
    margin: 1rem; // Margen reducido en móviles
    padding: 1.5rem; // Padding reducido en móviles
  }

  h2 {
    color: #d4b895; // Color suave y atractivo para los encabezados
    font-size: 1.75rem; // Tamaño de fuente para encabezados
    margin-bottom: 1rem; // Espacio debajo del encabezado
  }

  p, strong {
    margin-bottom: 1rem; // Espaciado uniforme para el texto
    line-height: 1.5; // Espaciado de línea para mejorar la legibilidad
    color: #e5d4c0; // Un tono más claro para mejorar el contraste
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 1.5rem; // Tamaño de fuente más pequeño en móviles
    }
    p, strong {
      font-size: 0.95rem; // Tamaño de fuente ligeramente más pequeño en móviles
    }
  }
}`;
