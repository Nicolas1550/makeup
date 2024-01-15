import styled from "styled-components";
import { motion } from "framer-motion";

export const colors = {
  neutralLight: "#FAF3E0",
  darkerGray: "#555",
  pinkLight: "#FFD1DC",
  pinkDark: "#FF69B4",
  purpleLight: "#7B4B94",
  gold: "#FFD700",
};

export const NavbarContainer = styled.nav`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0px;
  zindex: 1000;
  background-color: ${colors.neutralLight};
  color: ${colors.darkerGray};
  box-shadow: 0 8px 10px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid ${colors.pinkLight};
  transition: box-shadow 0.3s;
  padding: 10px 20px;
  z-index: 1000 !important;
  @media (max-width: 1000px) {
    padding: 5px 10px; // Reducción del padding
  }
  @media (max-width: 768px) {
    padding: 5px 15px; // Reducción del padding en pantallas aún más pequeñas
  }
`;

export const NavbarInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  @media (max-width: 768px) {
    justify-content: space-around; // Ajustar la distribución en pantallas pequeñas
  }
`;

export const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 2; /* z-index definido aquí */
  @media (max-width: 1000px) {
    gap: 5px; // Reducción del espacio entre el logo y el texto
  }
  @media (max-width: 768px) {
    flex-direction: row; // Asegurar que el logo y el texto estén en línea
    gap: 26px;
  }
`;
export const LogoImage = styled.img`
  width: 80px;
  height: 80px;
  @media (max-width: 1000px) {
    width: 40px; // Reducción del tamaño del logo
    height: 50px;
  }
  @media (max-width: 768px) {
    width: 50px; // Reducir el tamaño del logo en pantallas pequeñas
    height: 60px;
  }
`;

export const LogoText = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 0.8px;
  color: ${colors.pinkDark};
  transition: color 0.3s;
  &:hover {
    color: ${colors.purpleLight};
  }
  @media (max-width: 1000px) {
    font-size: 1rem; // Reducción del tamaño del texto
    margin-right: 5px; // Reducción del margen
  }
  @media (max-width: 1368px) {
    font-size: 1.2rem; // Reducir el tamaño del texto en pantallas pequeñas
    margin-right: 70px;
  }
  @media (max-width: 1130px) {
    font-size: 1.2rem; // Reducir el tamaño del texto en pantallas pequeñas
    margin-right: 0px;
  }
`;

const buttonStyles = `
  margin-left: 1rem;
  padding: 0.4rem 1rem;
  border-radius: 15px; 
  font-size: 1rem;
  font-weight: 600;
  color: ${colors.neutralLight};
  background: linear-gradient(90deg, ${colors.pinkDark}, ${colors.purpleLight}); /* Gradiente */
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${colors.purpleLight};
    transform: translateY(-2px) scale(1.02); /* Efecto hover mejorado */
  }
`;
export const AdminButton = styled.button`
  ${buttonStyles}
`;

export const LoginButton = styled.button`
  ${buttonStyles}
`;

export const DesktopNavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  @media (max-width: 768px) {
    display: none; // Ocultar en pantallas pequeñas
  }
`;

export const NavLink = styled.a`
  display: inline-flex; // Centra el contenido verticalmente y mantiene la estructura del botón
  align-items: center; // Alinea el contenido verticalmente
  justify-content: center; // Centra el contenido horizontalmente
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: ${colors.darkerGray};
  background-color: ${colors.neutralLight};
  border: 1px solid ${colors.pinkDark};
  transition: background-color 0.3s, color 0.3s, transform 0.3s;
  white-space: nowrap;
  text-decoration: none; // Elimina el subrayado de los enlaces
  cursor: pointer; // Cambia el cursor al pasar el mouse para indicar que es clickeable

  &:hover {
    background-color: ${colors.pinkDark};
    color: ${colors.neutralLight};
    transform: translateY(-2px) scale(1.05); // Efecto hover con un poco más de énfasis
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); // Agrega una sombra suave al hacer hover
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); // Sombra más suave al hacer clic
  }
  @media (max-width: 1000px) {
    font-size: 0.8rem; // Reducción del tamaño de la fuente
    padding: 0.3rem 0.6rem; // Ajuste del padding
    margin-left: 0.5rem; // Reducción del margen
  }
  @media (max-width: 768px) {
    margin-left: 0.5rem; // Menos margen para pantallas pequeñas
    padding: 0.4rem 0.8rem; // Ajusta el padding para pantallas pequeñas
    font-size: 0.9rem; // Tamaño de fuente más pequeño para pantallas pequeñas
  }

  @media (max-width: 480px) {
    font-size: 0.8rem; // Tamaño de fuente aún más pequeño para pantallas muy pequeñas
    padding: 0.3rem 0.7rem; // Ajusta aún más el padding
  }
`;
export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: -35px;
  background-color: ${colors.neutralLight};
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 0.8rem;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  align-items: center; // Centrar botones horizontalmente
  gap: 12px;
  transition: all 0.2s ease-in-out;

  @media (max-width: 768px) {
    width: calc(
      100% - 1.6rem
    ); // Ajusta el ancho para que no llegue hasta el borde
    margin: 0.8rem auto; // Centra el menú en la ventana
    right: auto; // Restablece el derecho para centrar en pantallas más pequeñas
    left: 50%; // Ajusta hacia la izquierda
    transform: translateX(-50%); // Utiliza transform para centrar precisamente
    box-shadow: none; // Opcional: Elimina la sombra para un diseño más plano
  }
`;

export const CartIconContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 0; /* z-index definido aquí */

  /* Estilos para dispositivos móviles */
  @media (max-width: 480px) {
    /* Ajusta estos estilos según las necesidades de tu diseño móvil */
    padding: 10px; /* Añadir algo de padding para facilitar la interacción */
    margin: 0; /* Ajustar el margen si es necesario */
    font-size: 20px; /* Ajustar el tamaño de fuente si el contenedor incluye texto */
    /* Otras propiedades que puedas necesitar ajustar */
  }
`;
export const Badge = styled.div`
  position: relative;
  z-index: 0;
`;

export const UserSection = styled.div`
  position: relative;
  z-index: 0; /* z-index definido aquí */
`;
export const UserButton = styled.button`
  ${buttonStyles}
  position: relative;
  z-index: 0; /* z-index definido aquí */
`;

export const MobileMenu = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex; // Mostrar el menú móvil como flexbox
    justify-content: flex-end; // Alinear al final
  }
`;

/* export const MenuWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.7);
`; */

export const AnimatedMenuContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 250px;
  height: 100%;
  background-color: ${colors.neutralLight};
  overflow-y: auto;
`;

export const MobileMenuContainer = styled(motion.div)`
  padding: 1rem;
`;

export const InnerMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InnerMenuContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; // Centrar elementos horizontalmente
  gap: 1.5rem; // Espacio mayor entre elementos para una mejor visualización
  padding: 1.2rem; // Padding ligeramente aumentado

  a,
  button {
    min-width: 250px; // Ancho mínimo para mantener la uniformidad
    text-align: center; // Centrar texto
    padding: 0.7rem 1.2rem; // Aumentar el padding para un mejor aspecto
    border-radius: 15px; // Bordes más redondeados

    // Transiciones y efectos para interacción
    transition: background-color 0.3s ease, transform 0.3s ease,
      box-shadow 0.3s ease;
    &:hover {
      background-color: ${colors.purpleLight}; // Color al hacer hover
      transform: translateY(-4px); // Elevación al hacer hover
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); // Sombra suave al hacer hover
    }
  }

  // Estilos específicos para enlaces y botones
  a {
    background-color: ${colors.neutralLight};
    color: ${colors.darkerGray};
    border: 1px solid ${colors.pinkDark};
  }

  button {
    background-color: ${colors.pinkDark};
    color: ${colors.neutralLight};
    border: none;
  }

  // Ajustes para dispositivos móviles más pequeños
  @media (max-width: 480px) {
    gap: 1rem;
    padding: 1rem;
    a,
    button {
      min-width: 200px; // Ancho mínimo ajustado para pantallas más pequeñas
    }
  }
`;

/* export const MobileMenuButton = styled.button`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`; */

export const CartItemCount = styled.span`
  margin-left: 0.5rem;
`;
