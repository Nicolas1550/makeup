import styled from "styled-components";
import Modal from "react-modal";
import { Button } from "@mui/material";
import Slider from "react-slick";

export const StyledButton = styled(Button)`
  && {
    margin: 10px;
    background: linear-gradient(45deg, #f67280 30%, #c06c84 90%);
    color: #fff; // Texto blanco para mejor contraste
    border-radius: 8px;
    box-shadow: 0 3px 5px 2px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      background: linear-gradient(45deg, #c06c84 30%, #f67280 90%);
      transform: scale(1.03);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
  }
  @media (max-width: 768px) {
    padding: 8px 16px; // Reducir el padding
    font-size: 14px; // Reducir el tamaño de la fuente
    // Otros ajustes que consideres necesarios
  }
`;

// Estilo para contenedores
export const ActionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
  flex-wrap: wrap; // Para que los botones se ajusten si hay poco espacio
  @media (max-width: 768px) {
    flex-direction: column; // Cambiar a disposición en columna
    gap: 10px; // Reducir el espacio entre elementos
  }
`;

export const ActionButton = styled.button`
  background: linear-gradient(45deg, #f67280 30%, #c06c84 90%);
  color: #fff; // Texto blanco para mejor contraste
  padding: 8px 15px; // Padding interno para los botones
  border: none; // Remover bordes predeterminados del botón
  border-radius: 8px;
  cursor: pointer; // Cambiar el cursor a pointer cuando se pasa el mouse sobre el botón
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background: linear-gradient(45deg, #c06c84 30%, #f67280 90%);
    transform: scale(1.03);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:focus {
    outline: none; // Remover el contorno predeterminado al enfocar el botón
  }
`;

export const ServiceModalContent = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column; // Cambio a columna para que se ordene verticalmente
  align-items: center;
  justify-content: space-between;
  gap: 20px; // Aumento del espacio entre elementos
  font-family: "Roboto", sans-serif;
  text-align: left; // Cambio a alineación izquierda

  p {
    color: #1a1a1a; // Oscurecer un poco el color del texto
    font-size: 18px; // Aumentar el tamaño de la fuente
    line-height: 1.7; // Aumento del espacio entre líneas
    margin-bottom: 25px; // Aumento del margen inferior
    max-width: 80%; // Limitar el ancho para mejorar la legibilidad
  }

  img {
    max-width: 100%;
    width: 200px;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin-bottom: 25px; // Aumento del margen inferior
  }

  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    margin-bottom: 20px;
    color: #000;
  }
  textarea::placeholder {
    color: #888;
  }
`;
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center; // Centrar horizontalmente
  align-items: center; // Centrar verticalmente
  @media (max-width: 768px) {
    padding: 15px; // Reducir el padding
    gap: 15px; // Reducir el espacio entre elementos
    // Otros ajustes que consideres necesarios
  }
`;

export const PrimaryButton = styled(StyledButton)`
  margin-right: 10px;
  padding: 12px 24px; // Aumenta el padding para un botón más grande
  font-size: 18px; // Aumenta el tamaño de la fuente
  border-radius: 5px; // Bordes redondeados para un aspecto moderno
  transition: transform 0.2s; // Efecto de transición al pasar el mouse

  &:hover {
    // Efecto al pasar el mouse
    transform: scale(1.05); // Aumenta un poco el tamaño del botón
    background-color: #f67280; // Cambia el color de fondo si lo deseas
  }

  &:active {
    // Efecto al hacer clic en el botón
    transform: scale(0.95); // Reduce un poco el tamaño del botón
  }
`;

export const SecondaryButton = styled(StyledButton)`
  background: linear-gradient(45deg, #6c5b7b 30%, #c06c84 90%);
`;

export const CloseButton = styled(StyledButton)`
  margin-top: 20px;
`;

export const StyledModal = styled(Modal)`
  overflow-y: auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #faf3e0;
  padding-right: 10px;
  box-sizing: border-box;
  border-radius: 15px;
  width: 90%;
  max-width: 1100px;
  max-height: 80vh;
  padding-top: 40px;
  padding-bottom: 40px;
  z-index: 1000;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;

  @media (max-width: 768px) {
    width: 95%;
    padding: 20px;
  }

  .description-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex: 1;
    overflow-x: hidden;

    @media (max-width: 768px) {
      flex-direction: row;
      text-align: justify; /* Alineación justa en dispositivos móviles */
      align-items: flex-start;
      word-break: break-word; /* Rompe las palabras si no caben en el contenedor */
    }
  }
`;

// Para el textarea (no olvides incluir el estilo para tu textarea en caso de que no lo hayas hecho)
export const StyledTextarea = styled.textarea`
  width: 100%;
  height: 100%;
  resize: none;
`;

export const InnerScrollContainer = styled.div`
  max-height: calc(
    80vh - 80px
  ); // Ajustar la altura máxima, resta el padding superior e inferior
  overflow-y: auto;
  padding-right: 10px; // Añade un relleno a la derecha para el scrollbar
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 8px;
    background-color: #faf3e0;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #c06c84;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #f67280;
  }
`;
export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  border-bottom: 3px solid #f67280;
  padding-bottom: 10px;
  position: fixed; // Fija el elemento
  top: -1; // Asegura que se ubica en la parte superior de la página
  left: 0; // Alinea a la izquierda
  width: 100%; // Ocupa todo el ancho de la página
  background-color: #faf3e0; // Beige suave
  z-index: 10; // Asegura que el header esté por encima de otros elementos
`;

export const ModalTitle = styled.h2`
  margin: 0px 0px 0px 10px;
  color: #2a2a2a; // Texto oscuro
  font-weight: 600;
  font-size: 26px;
`;

export const CalendarContainer = styled.div`
  height: 600px;
  margin-top: 20px;
  background: linear-gradient(
    315deg,
    #e4dcdc 0%,
    #a8a0a0 74%
  ); // Fondo más oscuro
`;

// Resto de tus estilos...
export const CalendarWrapper = styled.div`
  height: 400px;
  overflow-y: auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  /* Cambia el color de los números del mes */
  .rbc-date-cell {
    color: #6c5b7b !important;
    transition: color 0.3s ease;
    &:hover {
      color: #f67280 !important;
    }
  }

  /* Cambia el color de los horarios en la vista de día/semana */
  .rbc-time-header-content .rbc-time-content > .rbc-time-gutter,
  .rbc-time-header-content .rbc-time-content > * > .rbc-day-slot .rbc-time-slot,
  .rbc-agenda-view {
    /* Cambia el color de fondo y el color de texto para mejorar el contraste y la legibilidad */
    background-color: #f5f5f5; /* Fondo más claro */
    color: #333; /* Texto más oscuro */

    .rbc-agenda-date-cell,
    .rbc-agenda-time-cell,
    .rbc-agenda-event-cell {
      /* Asegúrate de que los textos sean legibles */
      color: #333; /* Texto oscuro sobre fondo claro */
    }
  }

  /* Cambia el color de los horarios en la etiqueta rbc-label */
  .rbc-label {
    color: #6c5b7b !important;
    font-weight: bold;
  }

  /* Mejorar el botón "Mostrar más" en el calendario */
  .rbc-button-link.rbc-show-more {
    background-color: #f67280;
    color: white;
    padding: 5px 10px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #c06c84;
    }
  }

  /* Estilo para el botón genérico rbc-button-link */
  .rbc-button-link {
    color: #6c5b7b !important;
    transition: color 0.3s ease;

    &:hover {
      color: #f67280 !important;
    }
  }

  /* Estilo para el encabezado del día actual */
  /* Estilo para el encabezado del día actual en el calendario */
  /* Estilo para el encabezado del día actual en el calendario */
  /* Estilos específicos para .rbc-header cuando tiene la clase .rbc-today */
  .rbc-header.rbc-today {
    background-color: #f67280 !important;
    font-weight: bold !important;
    border-radius: 8px !important;
    padding: 5px !important;
    border-bottom: 2px solid #c06c84 !important; /* Cambiar el color del borde inferior */
    transition: background-color 0.3s ease !important;

    &:hover {
      background-color: #c06c84 !important;
    }

    /* Estilos específicos para el <span> dentro de .rbc-header.rbc-today */
    > span {
      color: #333 !important; /* Gris oscuro */

      &:hover {
        color: #f67280 !important; /* Cambia al color rosado al pasar el ratón */
      }
    }
  }

  /* Intenta aumentar la especificidad para el border-bottom */
  div.rbc-header {
    border-bottom: none !important; /* Elimina el borde inferior */
  }

  /* Cambia el estilo del evento en el calendario */
  .rbc-event {
    background-color: #f67280 !important;
    border: none !important;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2) !important;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: scale(1.03);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25) !important;
    }

    .rbc-event-content {
      color: white !important;
    }
  }

  /* Estilo para la etiqueta del toolbar */
  .rbc-toolbar-label {
    color: #6c5b7b !important;
    font-size: 1.5em;
    font-weight: bold;
  }

  /* Estilo para elementos activos en el calendario */
  .rbc-active {
    background-color: #f67280 !important;
    color: white !important;
    border-radius: 8px;
    transition: background-color 0.3s ease;
  }

  /* Mejorar botones generales MUI */
  .MuiButtonBase-root {
    background-color: #6c5b7b;
    color: white;
    border-radius: 8px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #f67280;
    }
  }
  /* Estilo específico para el header del mes */
  .rbc-row.rbc-month-header {
    background-color: #faf4f4 !important; /* o el color que desees */
    color: #6c5b7b !important; /* ajusta el color de texto según sea necesario */

    /* Estilos para el encabezado de cada día dentro del header del mes */
    .rbc-header {
      color: #6c5b7b !important;
      border-bottom: 2px solid #c06c84 !important;

      /* Estilos para el día actual dentro del encabezado de cada día */
      &.rbc-today {
        background-color: #f67280 !important;
        color: white !important; /* color de texto para el día actual */

        > span {
          color: #fff !important; /* color de texto del <span> para el día actual */
        }
      }
    }
  }
  @media (max-width: 768px) {
    height: auto; // Ajusta la altura para pantallas más pequeñas
    font-size: 0.8em; // Reduce el tamaño de la fuente

    // Reduce el tamaño de los botones y otros controles
    .MuiButtonBase-root {
      padding: 6px 12px; // Reduce el padding
      font-size: 0.7em; // Reduce el tamaño de la fuente
    }
    .rbc-toolbarbutton.rbc-btn-group: nth-child(1) {
      /* Este selector puede variar según la estructura de tu DOM */
      display: none;
    }
    // Ajusta el tamaño y la disposición de los elementos del header
    .rbc-toolbar {
      flex-direction: column; // Cambia a disposición en columna
      align-items: stretch; // Estira los elementos para llenar el ancho
    }

    // Ajusta el tamaño de los encabezados de día y semana
    .rbc-header,
    .rbc-date-cell {
      padding: 4px 2px; // Reduce el padding
      font-size: 0.7em; // Reduce el tamaño de la fuente
    }

    // Ajustes para los eventos dentro del calendario
    .rbc-event {
      font-size: 0.7em; // Reduce el tamaño de la fuente en los eventos
    }
  }
`;
export const ImageUploadInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: border 0.2s ease;

  &:hover {
    border-color: #c06c84; // Cambiar el color del borde al pasar el mouse
  }
`;
export const StyledSlider = styled(Slider)`
  width: 90%;
  max-width: 600px;
  margin: 30px auto;
`;
export const ImageContainer = styled.div`
  cursor: pointer; // Cambia el cursor cuando pasa sobre una imagen

  img {
    width: 300px;
    height: 200px;
    object-fit: cover;
    transition: transform 0.5s, box-shadow 0.5s, filter 0.5s; // Transiciones suaves
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.3);
    border-radius: 15px;
    filter: brightness(90%) saturate(1.2);

    &:hover {
      transform: scale(1.05); // Efecto de escala al pasar el cursor
      box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.4); // Sombra más pronunciada al pasar el cursor
      filter: brightness(100%) saturate(1.4); // Hace la imagen más brillante y saturada al pasar el cursor
    }
  }
`;

export const StyledCarouselContainer = styled.div`
  max-width: 80%;
  margin: 40px auto;
  perspective: 1000px;
  padding: 20px;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.1);
  border-radius: 15px; // Bordes redondeados

  .swiper-slide {
    transform: scale(0.85);
    opacity: 0.5;
    transition: transform 0.5s, opacity 0.5s;
  }

  .swiper-slide-active {
    transform: scale(1);
    opacity: 1;
  }

  // Media query para dispositivos móviles
  @media (max-width: 768px) {
    margin: 20px auto; // Reducir el margen
    margin-top: 100px;
    padding: 10px; // Reducir el padding

    .swiper-slide {
      // Aquí puedes ajustar los estilos específicos de los slides para móviles
      transform: scale(0.95); // Un escalamiento menor para dar más espacio
    }
  }
`;

export const DeleteIconButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

export const ImageEditingSection = styled.div`
  background-color: #eee;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  margin: 20px auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 10px 20px; // Reducir el padding para disminuir la altura

  padding: 8px 15px; // Reducimos el padding para disminuir la altura

  h4 {
    font-size: 18px; // Reducimos aún más el tamaño del encabezado
    margin-bottom: 10px; // Reducimos el espacio debajo del encabezado
  }
  div {
    display: flex;
    align-items: center;
    gap: 10px; // Reducimos el espacio entre los elementos
  }
`;

export const StyledImageUploadInput = styled.input`
  padding: 6px; // Reducimos el padding
  height: 35px; // Ajustamos la altura del input
  line-height: 24px; // Ajustar el line-height para centrar el texto  border: 2px dashed #c06c84;
  border-radius: 10px;
  background-color: #fafafa;
  cursor: pointer;
  transition: border-color 0.3s ease, background-color 0.3s ease;

  &:hover {
    border-color: #f67280;
    background-color: #fcf9f9;
  }
`;

export const StyledUploadButton = styled(Button)`
  && {
    background-color: #c06c84;
    color: white;
    font-weight: 600;
    padding: 8px 18px; // Reducimos el padding
    border-radius: 8px;
    transition: background-color 0.3s ease, transform 0.3s ease;

    &:hover {
      background-color: #f67280;
      transform: translateY(-2px);
    }
  }
`;
