import Slider from "@mui/material/Slider";
import styled from "styled-components";
import React, { forwardRef } from "react";
import { motion } from "framer-motion";

export const colors = {
  neutralLight: "#FAF3E0",
  borderGray: "#A0A0A0", // Un poco más oscuro
  pinkLight: "#FFC1DC", // Un poco más saturado
  pinkDark: "#FF59B4", // Un poco más saturado
  purpleLight: "#D8BFD8",
  gold: "#FFD700",
  primary: "#FFA6C1", // Un poco más saturado
  secondary: "#FF59B4", // Un poco más saturado
  background: "#FFFFFF",
  cardShadow: "rgba(0, 0, 0, 0.1)",
  text: "#333333",
  darkerGray: "#707070", // Un poco más oscuro
};
export const FilterButtons = styled.div`
  display: flex;
  flex-direction: row; // Asegura que los botones estén en línea horizontal
  justify-content: flex-start; // Alinea los botones al inicio del contenedor
  align-items: center; // Centra los botones verticalmente
  gap: 10px; // Espacio entre los botones

  button {
    flex: 0; // No permitas que los botones crezcan o se encojan
    margin: 0; // No margen extra
  }

  // Ajustes para dispositivos móviles
  @media (max-width: 768px) {
    flex-direction: column; // Coloca los botones en columna en dispositivos móviles
    width: 100%; // Ocupa todo el ancho disponible en dispositivos móviles

    button {
      width: 100%; // Los botones ocupan todo el ancho disponible
      margin-bottom: 10px; // Espacio debajo de cada botón
    }
  }
`;

export const SidebarTitle = styled.h2`
  font-size: 1em; // Aumentar el tamaño de fuente para un mejor aspecto
  color: ${colors.pinkDark};
  margin-bottom: 15px; // Aumentar el margen inferior
  text-align: center;
  font-weight: 600;
`;

export const StyledFilterBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
  align-items: center;
  width: 100%;
  border-radius: 15px;
  box-shadow: 0px 5px 15px ${colors.cardShadow};
  transition: box-shadow 0.3s ease;
  background-color: rgba(
    255,
    250,
    240,
    0.7
  ); /* Cambiar el color de fondo para que sea semi-transparente */
  &:hover {
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  }
`;

export const FilterSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  .price-section,
  .color-section,
  .brand-section {
    /* Estilos comunes para cada sección */
    border-radius: 25px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 105px;

    label {
      margin-bottom: 10px;
      color: ${colors.pinkDark};
      font-weight: 600;
      text-align: center; // Asegúrate de que el texto del label esté centrado
    }
  }

  @media (max-width: 768px) {
    /* Estilos para móviles */
    flex-direction: column;

    .price-section,
    .color-section,
    .brand-section {
      /* Estilos específicos para cada sección en móviles si son necesarios */
      margin: 10px 0; // Añade un margen vertical
      align-items: center; // Centra los elementos de cada sección
    }
  }
`;

export const FilterSectionItem = styled.div`
  overflow: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center; // Centrado horizontal
  justify-content: center; // Centrado vertical
  margin: 0 10px;
  label {
    margin-bottom: 0px;
    color: ${colors.pinkDark};
    font-weight: 600;
    text-align: center; // Asegura que el texto esté centrado
  }

  label {
    margin-bottom: 0; /* Eliminar el margen inferior */
  }
  .react-select__control {
    margin-top: 0; /* Eliminar el margen superior */
    /* Asegúrate de usar la clase correcta aquí, puede variar según tu versión de react-select */
  }
  .react-select-container {
    margin-top: -50px; /* Ajusta este valor según necesites */
  }
  @media (max-width: 768px) {
    width: 100%; // Ocupa todo el ancho disponible
    margin: 10px 0; // Añade un margen vertical en dispositivos móviles

    // Centrado de los elementos Select

    .Select__control,
    .Select__menu {
      width: 100%; // Ocupa todo el ancho disponible
    }

    // Centrado del texto dentro del Select
    .Select__single-value {
      text-align: center;
    }
  }
`;

export const FilterSelect = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${colors.pinkLight};
  border-radius: 25px;
  font-size: 1em;
  outline: none;
  color: ${colors.text};
  background-color: white;
  transition: border-color 0.3s, box-shadow 0.3s, background-color 0.3s;
  text-align-last: center; // Centra el texto en el menú desplegable
  cursor: pointer; // Cambia el cursor a mano al pasar por encima

  // Estilo de las opciones
  option {
    text-align: center; // Centra el texto de las opciones
    padding: 8px 12px; // Añade padding para más espacio
    background-color: white; // Fondo blanco para las opciones
    cursor: pointer; // Cambia el cursor a mano al pasar por encima

    // Estilo al pasar el mouse por encima de las opciones
    &:hover {
      background-color: ${colors.pinkLight};
      color: white;
    }
  }

  // Estilo al enfocar el menú desplegable
  &:focus {
    border-color: ${colors.pinkDark};
    box-shadow: 0px 4px 12px rgba(255, 105, 180, 0.2);
    background-color: ${colors.neutralLight}; // Cambia el fondo al enfocar
  }

  // Estilo al pasar el mouse por encima del menú desplegable
  &:hover {
    border-color: ${colors.pinkDark};
  }
`;
interface StickyFilterContainerProps {
  isSticky: boolean;
  isExpanded: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  children?: React.ReactNode;
  className?: string;
}

const StickyFilterContainerBase = forwardRef<
  HTMLDivElement,
  StickyFilterContainerProps
>(
  (
    { isExpanded, onMouseEnter, onMouseLeave, children, className, ...rest },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={className}
        {...rest}
        initial={{ y: -100, opacity: 0, scale: 0.95 }}
        animate={{
          y: isExpanded ? 0 : 20,
          opacity: isExpanded ? 1 : 0.7,
          scale: isExpanded ? 1 : 0.95,
        }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    );
  }
);

StickyFilterContainerBase.displayName = "StickyFilterContainerBase";

export const StickyFilterContainer = styled(StickyFilterContainerBase)`
  position: ${({ isSticky }) => (isSticky ? "fixed" : "static")};
  top: ${({ isSticky, isExpanded }) =>
    isSticky ? (isExpanded ? "70px" : "-30%") : "0"};
  z-index: 2;
  background-color: #fffaf0;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-top: ${({ isSticky }) => (isSticky ? "0" : "30px")};
  margin-bottom: ${({ isSticky }) => (isSticky ? "0" : "29px")};
  display: flex;
  flex-direction: column;
  width: auto;
  max-height: ${({ isExpanded }) =>
    isExpanded ? "calc(100vh - 60px)" : "30%"};
  overflow-y: hidden;
  opacity: ${({ isExpanded }) => (isExpanded ? "1" : "0.7")};
  transition: top 0.5s ease-in-out, max-height 0.3s ease-in-out,
    opacity 0.3s ease-in-out;

  &.collapsed {
    top: -110px;
    opacity: 0.6;
    transition: top 0.5s ease-in-out, opacity 0.5s ease-in-out;
  }

  &:hover {
    max-height: 70%;
    opacity: 1;
  }

  @media (max-width: 768px) {
    position: fixed;

    top: ${({ isExpanded }) => (isExpanded ? "20" : "-90%")};
    left: 0;
    right: 0;
    margin: 0;
    width: 100%;
    height: ${({ isExpanded }) => (isExpanded ? "auto" : "0")};
    border-radius: 0;
    padding: ${({ isExpanded }) => (isExpanded ? "20px" : "0")};
    transform: ${({ isExpanded }) =>
      isExpanded ? "translateY(0)" : "translateY(-100%)"};
    box-shadow: ${({ isExpanded }) =>
      isExpanded ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none"};
    overflow-y: ${({ isExpanded }) => (isExpanded ? "auto" : "hidden")};

    &.collapsed {
      top: -110px;
      opacity: 0 !important;
      transition: top 0.5s ease-in-out, opacity 0.5s ease-in-out;
    }
  }
`;

export const HamburgerButton = styled.button`
  display: none; // Por defecto está oculto
  background-color: #333; // Color principal
  color: white;
  border: none;
  cursor: pointer;
  z-index: 3;
  position: sticky;
  top: 90px; // Ajusta este valor según la altura de tu navbar
  width: 100%; // Ocupar todo el ancho
  padding: 10px 0; // Espaciado vertical
  text-align: center; // Centrar el texto
  border-radius: 8px; // Bordes redondeados
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2); // Sombra robusta
  transition: background-color 0.3s, color 0.3s, transform 0.2s, box-shadow 0.2s; // Transiciones suaves

  &:hover {
    background-color: #555; // Color al pasar el ratón por encima
    color: #f5f5f5;
    box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.25); // Sombra más prominente al pasar el ratón por encima
  }

  &:active {
    background-color: #444; // Color al hacer clic
    transform: scale(0.98); // Ligeramente más pequeño al hacer clic
    box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.2); // Reducir la sombra al hacer clic
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

export const StyledInputRange = styled(Slider)`
  color: ${colors.pinkLight}; // Cambia el color principal del Slider

  &.input-range {
    .input-range__track {
      background-color: #000;
    }

    .input-range__track--active {
      background-color: #000;
    }

    .input-range__slider {
      background-color: #000;
      border: 1px solid #000;
    }

    .input-range__label {
      color: #000;
    }
  }
  & .MuiSlider-thumb {
    background-color: ${colors.pinkDark}; // Color del pulgar (thumb)
  }

  & .MuiSlider-track {
    background-color: ${colors.pinkLight}; // Color de la pista (track) ya recorrida
  }

  & .MuiSlider-rail {
    background-color: ${colors.borderGray}; // Color de la pista (rail) restante
  }
`;
const breakpoints = {
  tablet: "768px",
  mobile: "770px",
};
import { createGlobalStyle } from "styled-components";
export const GlobalRangeStyles = createGlobalStyle`

/* .css-1n6sfyn-MenuList {
  max-height: none; /* Elimina cualquier límite en la altura */
  overflow-y: hidden; /* Oculta el scroll vertical */
} */


.hamburger-icon {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 1000;
  background-color: ${colors.background};
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  } 
  .input-range {
    .input-range__track {
      background-color: #000 !important;
    }

    .input-range__track--active {
      background-color: #000 !important;
    }

    .input-range__slider {
      background-color: #000 !important;
      border: 1px solid #000 !important;
    }

    .input-range__label {
      color: #000 !important;
    }
  }
  a {
    text-decoration: none !important; 
  }

  body.menu-open {
    overflow: hidden; // Ya lo tienes
    position: fixed;
    width: 100%;
    height: 100vh;
  }
  .unique-modal-container {
    z-index: 1000 !important;
  }
  div[role="dialog"] {
    z-index: 1000 !important;
  }
  .ReactModal__Overlay {
    background-color: rgba(0, 0, 0, 0.5) !important; // Negro con opacidad
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
  }
  /* Estilos para los íconos sociales */
  .social-icons {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .social-icons a {
    margin: 0 15px; /* Espaciado entre los íconos */
    font-size: 28px; /* Tamaño de los íconos */
    color: #FFB6C1; /* Color rosa claro */
    transition: color 0.3s ease, transform 0.3s ease; /* Transición suave */
  }
  
  .social-icons a:hover {
    color: #FF69B4; /* Color rosa más oscuro al pasar el mouse */
    transform: scale(1.1); /* Efecto zoom al pasar el mouse */
  }
  
  /* Estilos para la edición de enlaces sociales */
  .social-links-edit-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }
  
  .social-link-field {
    display: flex;
    flex-direction: column; /* Cambiado a columna para dispositivos móviles */
    background-color: #FFF0F5; /* Fondo rosa muy claro */
    border-radius: 8px; /* Bordes redondeados */
    padding: 0.5rem;
  }
  
  .social-input {
    width: 100%; /* Ajuste del ancho para ocupar el contenedor completo */
    padding: 0.5rem;
    border: none;
    background: transparent; /* Transparente para tomar el color de fondo del contenedor */
    color: #FF69B4; /* Color rosa oscuro */
    font-size: 1rem;
    transition: all 0.3s ease; /* Transición suave */
  }
  
  .social-input::placeholder {
    color: #FFB6C1; /* Color rosa claro para el texto placeholder */
  }
  
  .social-input:focus {
    outline: none;
    box-shadow: 0 0 5px #FF69B4; /* Sombra rosa al enfocar */
  }
  
  .social-icon {
    font-size: 2rem; /* Tamaño más grande para los íconos */
    color: #FF69B4; /* Color rosa oscuro */
  }
  .Toastify__toast-container {
    /* Centrar el contenedor de tostadas en dispositivos móviles */
    @media only screen and (max-width: ${breakpoints.mobile}) {
      width: calc(100% - 20px); /* Ajusta el ancho con un poco de espacio en los lados */
      max-width: 320px; /* Establece un ancho máximo para las tostadas */
      left: 50%;
      transform: translateX(-50%);
      bottom: 1rem; /* Espacio desde el fondo de la pantalla */
    }
  }
  body {
    background: linear-gradient(to right, #f5f7fa, #ffe3e3);
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    min-height: 100vh;
  }


  .Toastify__toast {
    /* Estilos comunes para tostadas */
    border-radius: 8px; /* Bordes redondeados para un look moderno */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra suave para dar profundidad */
    margin-bottom: 1rem; /* Espacio entre tostadas */
    font-size: 0.875rem; /* Tamaño de fuente adecuado */
    padding: 16px; /* Padding interno más generoso */
    @media only screen and (max-width: ${breakpoints.mobile}) {
      margin-bottom: 0; /* En móviles, puede que no necesites espacio extra entre tostadas */
    }
  }
  p{
    color: #6e6e6e;
  }
  .Toastify__close-button {
    /* Estilos para el botón de cerrar */
    color: #999; /* Color menos llamativo para el botón */
    opacity: 0.9; /* Ligeramente transparente para no distraer */
    &:hover {
      color: #666; /* Oscurecer al pasar el ratón por encima para indicar interactividad */
    }
  }

  .Toastify__toast--error {
    /* Estilos específicos para tostadas de error */
    background-color: #fee; /* Un fondo rojo claro para indicar error */
    color: #c00; /* Texto en rojo oscuro para contraste */
  }

  .Toastify__toast--success {
    /* Estilos específicos para tostadas de éxito */
    background-color: #eaffea; /* Un fondo verde claro para indicar éxito */
    color: #080; /* Texto en verde oscuro para contraste */
  }
  .react-big-calendar .rbc-toolbar button:contains('Month') {
    display: none;
  }
  
  /* Ocultar el botón 'Agenda' */
  .react-big-calendar .rbc-toolbar button:contains('Agenda') {
    display: none;
  }

  @media (max-width: 768px) {
    .react-big-calendar .rbc-toolbar button:contains('Semana')    
      display: none !important;
    }
  }
  input[type="text"],
  input[type="email"],
  input[type="password"] {
    text-transform: lowercase !important;
  }
  
`;
