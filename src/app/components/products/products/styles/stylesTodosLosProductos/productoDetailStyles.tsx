import styled from "styled-components";

const breakpoints = {
  tablet: "768px",
  mobile: "770px",
};

const darkPink = "#c06c84";

export const CenteredContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 5rem;
  padding: 8rem;
  align-items: center;
  height: auto;
  background: linear-gradient(to bottom, #fff7e6, #ffdab3, #fff7e6);
  @media only screen and (max-width: ${breakpoints.tablet}) {
    padding: 2rem;
  }
`;

export const ProductDetailContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, #ffffff, #fff0e1);

  padding: 50px;
  border-radius: 20px;
  box-shadow: 0 5px 20px rgba(192, 108, 132, 0.1); // Sombra más sutil
  max-width: 110%;
  width: 110%;

  @media only screen and (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    padding: 30px;
    align-items: center;
    text-align: center;
    align-items: center;
    text-align: center;

    h2 {
      font-size: 24px;
    }

    p {
      font-size: 16px;
      justify-content: center; /* Asegura que los íconos y textos estén centrados */
    }
  }
`;

export const ImageContainer = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 40px; // Espacio adicional a la derecha

  img {
    width: 100%;
    height: auto;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(192, 108, 132, 0.2); // Sombra rosa
    transition: transform 0.3s ease-in-out;

    &:hover {
      transform: scale(1.08);
    }
  }

  @media only screen and (max-width: ${breakpoints.tablet}) {
    padding-right: 0;
    margin-bottom: 30px;
    align-items: center;
    margin-bottom: 20px;
    padding-right: 0;
  }
`;

export const ProductDetailSection = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0;

  svg {
    margin-right: 10px;
    color: ${darkPink}; // Iconos en rosa oscuro
  }
`;

export const DetailContainer = styled.div`
  flex: 1.3;
  display: flex;
  flex-direction: column;
  gap: 25px;
  position: relative;

  h2 {
    margin-bottom: 1rem; // Agrega espacio debajo del título para separarlo de los iconos/texto

    font-size: 32px;
    color: ${darkPink}; // Título en rosa oscuro
    font-weight: bold;
  }

  p {
    display: flex;
    align-items: center;
    gap: 15px;
    font-size: 20px;
    color: #555;

    svg {
      font-size: 26px;
    }
  }

  @media only screen and (max-width: ${breakpoints.tablet}) {
    justify-content: center;

    h2 {
      font-size: 28px;
    }
    p {
      font-size: 18px;
    }
  }

  @media only screen and (max-width: ${breakpoints.mobile}) 
  justify-content: center;

    h2 {
      font-size: 24px;
    }
    p {
      font-size: 16px;
    }
  }
`;

export const IconText = styled.p`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  color: #555;

  svg {
    font-size: 24px;
    color: ${darkPink}; // Color rosa oscuro para los íconos
  }
`;
export const ColorBox = styled.div`
  width: 40px;
  height: 40px;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  background-image: linear-gradient(
    45deg,
    ${(props) => props.color} 50%,
    white 50%
  );
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.2s, transform 0.2s;

  &:hover {
    box-shadow: 5px 5px 12px rgba(0, 0, 0, 0.25);
    transform: translateY(-3px);
  }
`;
export const ColorPreview = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;

  svg {
    font-size: 24px;
    color: ${darkPink}; // Color rosa oscuro para los íconos
  }

  div {
    width: 40px;
    height: 40px;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    background-image: linear-gradient(
      45deg,
      ${(props) => props.color} 50%,
      white 50%
    );
    box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.2s, transform 0.2s;

    &:hover {
      box-shadow: 5px 5px 12px rgba(0, 0, 0, 0.25);
      transform: translateY(-3px);
    }
  }
  @media only screen and (max-width: ${breakpoints.mobile}) {
    justify-content: center;
  }
`;
export const DescriptionHeader = styled.h3`
  font-size: 1.25em; // Un tamaño más proporcional al resto del contenido
  color: ${darkPink}; // Mantiene el esquema de color
  font-weight: 600; // Menos negrita para un look más limpio

  margin-bottom: 0.5rem;
  position: relative;
  padding-bottom: 5px;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 2px;
    background-color: ${darkPink};
  }
  @media only screen and (max-width: ${breakpoints.mobile}) {
    text-align: center; /* Asegura que el título esté centrado */
  }
`;

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column; // Elementos en columna para colocar el título sobre el texto
  align-items: flex-start; // Alinea los elementos al inicio
  gap: 0.5rem; // Espacio entre el título y el texto de descripción
  margin-top: 1rem; // Espacio arriba para separar de otros elementos
  @media only screen and (max-width: ${breakpoints.mobile}) {
    align-items: center; /* Centra la descripción y la etiqueta */
  }
`;

export const DescriptionLabel = styled.span`
  font-size: 22px;
  color: ${darkPink};
  margin: 0; // Restablece el margen
  padding: 0; // Restablece el relleno
`;

export const DescriptionText = styled.span`
  font-size: 1.1em; // Tamaño más acorde al diseño
  color: #555; // Color para mejorar la legibilidad
  line-height: 1.5; // Espaciado entre líneas para legibilidad
  margin-top: 0; // Restablece el margen superior
  flex: 1; // Ocupa el espacio disponible
  margin: 0;
  padding: 0;
  @media only screen and (max-width: ${breakpoints.mobile}) {
    text-align: center;
  }
`;
