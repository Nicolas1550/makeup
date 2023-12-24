import styled from "styled-components";
import { colors } from "./navbarStyles";
export const MobileMenuButton = styled.button`
  z-index: 1100; // Asegura que el botón esté sobre otros elementos
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px; // Un poco más de padding para una mejor área de clic
    font-size: 1.5rem;
    background-color: ${colors.pinkDark};
    color: ${colors.neutralLight};
    border: none;
    border-radius: 10px; // Bordes más redondeados
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2); // Sombra más pronunciada para dar profundidad
    cursor: pointer;
    transition: transform 0.2s ease, background-color 0.2s ease,
      box-shadow 0.2s ease; // Transiciones suaves para transform, color de fondo y sombra

    &:hover {
      background-color: ${colors.pinkLight}; // Un color ligeramente diferente al pasar el mouse
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); // Sombra más pronunciada en hover
      transform: scale(1.05);
    }

    &:active {
      background-color: ${colors.pinkDark}; // Vuelve al color original en active
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); // Sombra menos pronunciada en active
      transform: scale(0.95);
    }
  }
`;

export const NavLinksContainerDesktop = styled.div`
  display: flex;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const MenuWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000 !important;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const MobileMenuContainer = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  width: 100%;
  height: 100%;
  align-items: flex-start; // Cambio aquí
  padding-top: 4rem; // Añade un padding-top aquí
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  transition: transform 0.3s ease-out;
  @media (max-width: 768px) {
    display: ${(props) => (props.isOpen ? "flex" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 60px; // Espacio adicional para evitar la superposición con la barra de navegación
    z-index: 1001;
    overflow-y: auto;
  }
`;

export const InnerMenuContainer = styled.div<{
  onClick?: (e: React.MouseEvent) => void;
}>`
  position: absolute; // Cambiar de relative a absolute
  top: 50%; // Centrar verticalmente
  left: 50%; // Centrar horizontalmente
  transform: translate(-50%, -50%);
  background-color: #faf3e0;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);

  max-width: 800px;
  min-height: 300px;

  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px; // Incrementa el espaciado entre elementos si es necesario
  padding: 40px; // Aumenta el padding para dar más espacio
  text-align: center; // Centra el contenido de texto
  width: 90%;
  min-width: 350px;
  max-width: 1000px;
  a {
    margin-left: 0rem !important;
  }
  button {
    margin-left: 0 !important;
  }

  .innerMenuContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px; // Puedes ajustar este valor si es necesario
    width: 100%; // Asegura que el contenedor ocupe todo el espacio disponible
    z-index: 9999 !important;
  }
  & > * {
    flex: 1; // Hace que todos los elementos hijos ocupen el mismo espacio
    margin: 0;
    padding: 25px;
    text-align: center;
    max-width: 100%;

    box-sizing: border-box; // Asegura que el padding y el borde no aumenten el tamaño del elemento
  }

  @media (min-width: 481px) {
    width: 0%;
  }

  @media (min-width: 769px) {
    width: 80%;
  }
  @media (max-width: 768px) {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${colors.neutralLight};
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    width: 10%;
    max-width: 30px;
    padding: 20px;
    gap: 15px;
    align-items: center;
    justify-content: center;
    margin: 10;
    z-index: 0;
    height: auto; // Ajusta automáticamente la altura según el contenido
    max-height: 90vh; // Limita la altura máxima para evitar que se salga de la pantalla
    min-width: 300px;
    box-shadow: 0px 4px 12px rgba(255, 105, 180, 0.9);

    overflow-y: auto; // Permite desplazamiento si el contenido es muy largo
  }
`;
