import styled from "styled-components";
import { motion } from "framer-motion";
import { colors } from "../../bar/sideBarStyles/sideBarStyle";

const breakpoints = {
  tablet: "768px",
  mobile: "780px",
};

export const ProductName = styled.h3`
  text-decoration: none !important;
  color: #222;
  margin-top: 0.8rem; // Aumenta el margen superior para dar espacio entre la imagen y el nombre
  margin-bottom: 1rem;
  font-size: 1.5em;
  font-weight: 700;
  transition: color 0.3s;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; // Ejemplo de fuente moderna

  &:hover {
    color: ${colors.secondary};
  }

  @media only screen and (max-width: ${breakpoints.tablet}) {
    font-size: 1.3em;
  }

  @media only screen and (max-width: ${breakpoints.mobile}) {
    font-size: 1.1em;
  }
`;

export const ProductImage = styled.img`
  border-radius: 15px;
  width: 150px; /* Ancho fijo */
  height: 150px; /* Alto fijo */
  object-fit: cover;
  object-position: center;
  max-width: 100%;

  display: block;

  margin: auto;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.1);
  }

  @media only screen and (max-width: ${breakpoints.tablet}) {
    width: 130px;
    height: 130px;
  }

  @media only screen and (max-width: ${breakpoints.mobile}) {
    width: 100px;
    height: 100px;
  }
`;

export const ProductPrice = styled.p`
  color: ${colors.gold};
  font-weight: bold;
  font-size: 1.4em;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  transition: transform 0.3s ease-in-out;

  @media only screen and (max-width: ${breakpoints.tablet}) {
    font-size: 1.2em;
  }

  @media only screen and (max-width: ${breakpoints.mobile}) {
    font-size: 1em;
  }
`;

export const ProductDescription = styled.p`
  color: #555;
  margin-top: 0.5rem; // Agregar un poco de espacio arriba para no tocar otros elementos
  font-style: normal; // Remover cursiva para un look más moderno
  font-size: 0.9em;
  line-height: 1.4; // Un valor más estándar para una mejor legibilidad
  transition: transform 0.3s ease-in-out;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%; // Esto garantizará que los puntos suspensivos se muestren si el texto es demasiado largo
  margin: 0.5rem 0 1rem 0; // Ajustar márgenes para un espaciado uniforme

  @media only screen and (max-width: ${breakpoints.tablet}) {
    font-size: 0.85em;
  }

  @media only screen and (max-width: ${breakpoints.mobile}) {
    font-size: 0.8em;
  }
`;

export const ProductColor = styled.p`
  color: #444;
  margin-top: 0.5rem;
  font-weight: bold;
  font-size: 0.95em;
  transition: transform 0.3s ease-in-out;

  &:hover {
    color: ${colors.primary};
  }

  @media only screen and (max-width: ${breakpoints.tablet}) {
    font-size: 0.9em;
  }
`;

export const ProductBrand = styled.p`
  color: #666;
  margin-top: 0.3rem;
  text-transform: uppercase;
  font-size: 0.85em;
  letter-spacing: 1.2px;
  transition: transform 0.3s ease-in-out;

  @media only screen and (max-width: ${breakpoints.tablet}) {
    font-size: 0.8em;
  }
`;

export const ProductOptions = styled.div`
  position: static; // Cambiar a static para mantener el botón dentro del flujo del documento
  margin-top: auto; // Empujar el botón hacia abajo

  bottom: 7 %;
  left: 50%;
  transform: translate(-0%, 50%);
  opacity: 0;
  visibility: hidden;
  transition: all 0.5s ease-in-out;

  // Estilo para dispositivos móviles - Haz el botón siempre visible
  @media only screen and (max-width: ${breakpoints.mobile}) {
    opacity: 1 !important;
    visibility: visible !important;
    bottom: 10%; // Posición más baja
    transform: translate(0%, 50%);
  }

  &:hover {
    @media only screen and (min-width: ${breakpoints.mobile}) {
      opacity: 1;
      visibility: visible;
    }
  }
`;

export const ProductCardContainer = styled(motion.div)`
  position: relative;
  background: linear-gradient(to bottom, #ffffff, #fff0e1);
  padding: 1.5rem; // Reducir el padding para un look más ajustado
  border-radius: 20px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1); // Sombra más sutil
    inset 0 0 50px rgba(255, 255, 255, 0.1); // Sombra interna
  text-align: center;
  transition: all 0.4s ease-in-out, color 0.6s ease-in-out; // Transición de color más suave
  margin: 15px;
  width: 290px;
  min-height: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  overflow: hidden; // Para mantener cualquier efecto interno
  @media only screen and (max-width: ${breakpoints.tablet}) {
    width: 240px;
    min-height: 380px;
  }

  @media only screen and (max-width: ${breakpoints.mobile}) {
    width: 220px;
    min-height: 360px;
  }

  &:hover {
    transform: translateY(-10px) rotate(-2deg); // Efecto hover con rotación
    box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.12),
      inset 0 0 50px rgba(255, 255, 255, 0.2); // Sombra interna más prominente al hacer hover
  }

  &:hover ${ProductOptions} {
    opacity: 1;
    visibility: visible;
  }
`;
export const AddToCartButton = styled.button`
  padding: 15px 30px;
  background: linear-gradient(
    145deg,
    ${colors.primary},
    ${colors.secondary}
  ); // Gradiente para el fondo

  color: white;
  border: none;
  border-radius: 30px;
  font-size: 1.1em;
  cursor: pointer;
  transition: all 0.4s ease-in-out, background 0.6s ease-in-out; // Transición de fondo más suave
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  position: relative;

  &:before {
    content: "🛍";
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.2em;
  }

  &:hover {
    background: linear-gradient(
      145deg,
      ${colors.secondary},
      ${colors.primary}
    ); // Invertir gradiente
    transform: translateY(-15px) scale(1.10) rotate(2deg); // Efecto hover con rotación
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
  }
  @media only screen and (max-width: ${breakpoints.mobile}) {
    padding: 12px 24px; // Reducir el padding para hacer el botón más pequeño
    top: -20px;
    font-size: 0.9em; // Reducir el tamaño de la fuente
    &:before {
      font-size: 1em; // Reducir el tamaño del ícono
    }
  }
`;
