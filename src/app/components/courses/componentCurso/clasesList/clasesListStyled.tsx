import { Button } from "@mui/material";
import styled from "styled-components";

export const ContenedorPrincipal = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 40px;
  background-image: linear-gradient(135deg, #6b7280 0%, #1f2937 100%);
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
`;

export const InfoYClasesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  gap: 30px;
  margin-top: 50px;

  @media (max-width: 768px) {
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
  max-height: 800px; // Altura fija para mantener la uniformidad
  overflow-y: auto;
  width: calc(50% - 4rem); // Mismo cálculo de ancho que CursoInfoContainer
  padding: 2rem; // Padding uniforme
  color: #f5eae0;
  border-radius: 15px; // Radio consistente con CursoInfoContainer
  margin: 2rem; // Margen uniforme para alinear con CursoInfoContainer
  transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;

  &:hover {
    transform: scale(1.03); // Asegúrate de que el efecto hover es el mismo que en CursoInfoContainer
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  }

  // Personalización de la barra de desplazamiento para que sea visible siempre
  &::-webkit-scrollbar {
    width: 8px; // Ancho más delgado para un look más elegante
  }

  &::-webkit-scrollbar-track {
    background: #2d2d2d; // Fondo oscuro para coherencia
  }

  &::-webkit-scrollbar-thumb {
    background-color: #a0aec0; // Color del thumb para contrastar con el track
    border-radius: 10px; // Bordes redondeados
    border: 3px solid #2d2d2d; // Borde entre el thumb y el track
  }

  @media (max-width: 768px) {
    width: auto; // Toma todo el ancho en dispositivos móviles
    max-height: 400px; // Ajuste de la altura para dispositivos móviles
    padding: 1rem; // Padding reducido en móviles
    margin-top: 1rem; // Margen superior para mantener la estructura
  }
}`;
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
    font-size: 1.0em;
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
  padding: 2rem; // Uso de unidades relativas para una mejor respuesta
  background-color: #333333;
  color: #f5eae0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25); // Sombra más suave para coherencia
  border-radius: 15px; // Radio un poco más pequeño para una apariencia más moderna
  width: calc(50% - 4rem); // Calcula el ancho basado en el padding para evitar el desbordamiento
  margin: 2rem; // Margen consistente para separar los contenedores
  transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;

  &:hover {
    transform: scale(1.03); // Un ligero aumento para una interacción más notable
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 100%; // Ocupa todo el ancho en dispositivos móviles
    margin: 1rem 0; // Ajusta el margen superior e inferior en móviles
  }

  // Estilos para encabezados y párrafos
  h2, p, strong {
    margin-bottom: 1rem; // Espaciado consistente
    line-height: 1.5; // Aumento de la legibilidad
  }

  h2 {
    color: #d4b895;
    font-size: 1.75rem; // Tamaño de fuente consistente
  }

  // Media queries para tamaños de texto en dispositivos móviles
  @media (max-width: 768px) {
    h2 {
      font-size: 1.5rem; // Tamaño de fuente ajustado para móviles
    }
    p, strong {
      font-size: 0.9rem; // Tamaño de fuente reducido para mantener la legibilidad
    }
  }
}`;
