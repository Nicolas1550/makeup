"use client";
import React from "react";
import StyledCard from "../courses/courses";
import styled from "styled-components";
import { motion } from "framer-motion";
const colors = {
  neutralLight: "#F5EAE0",
  darkerGray: "#5C5C5C",
  gradientPink: "linear-gradient(45deg, #FFB6C1, #FF69B4)",
  gold: "#FFD700",
  backgroundImage: "url('/img/aaa.webp')", // Asegúrate de que la ruta es accesible desde la ubicación donde se utiliza

  backgroundColor:
    "linear-gradient(to right, #f4e4d7, #f8e2cf, #fde0c8, #fff1e1)",
};

const containerStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: "2rem",
  justifyContent: "center",
  backgroundColor: colors.backgroundColor,
};
interface CoursesSectionProps {
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const CoursesSection: React.FC<CoursesSectionProps> = ({ style, children }) => {
  return <div style={{ ...containerStyles, ...style }}>{children}</div>;
};
const CoursesIntroContainer = styled.div`
  padding: 4rem 2rem;
  position: relative;
  z-index: 0;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  background-image: ${colors.backgroundImage};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (max-width: 1300px) {
    background-image: url("/img/aa.webp"); // Imagen diferente para móviles
   
  }
`;

const AnimatedIntroDescription = styled(motion.p)`
  font-family: "Raleway", sans-serif; /* Seleccionamos una tipografía moderna y elegante */
  font-size: 20px; /* Aumentamos el tamaño para mejorar la legibilidad */
  color: #fff; /* Cambiamos a un color claro para mayor contraste con el fondo */
  line-height: 1.6; /* Ajustamos el interlineado para una mejor lectura */
  max-width: 800px;
  margin: 0 auto;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7); /* Sombra de texto para mejorar la legibilidad */
`;

const DescriptionContainer = styled.div`
  backdrop-filter: blur(
    10px
  ); /* Aumentamos el desenfoque para un fondo más suave */
  background-color: rgba(
    0,
    0,
    0,
    0.5
  ); /* Hacemos el fondo un poco más claro para suavizar el efecto */
  padding: 20px; /* Aumentamos el padding para más espacio alrededor del texto */
  border-radius: 12px; /* Suavizamos un poco más los bordes */
  text-align: center;
  width: fit-content;
  margin: 0 auto 30px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5); /* Sombra de caja más suave */
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(
      -5px
    ); /* Cambiamos la animación para un movimiento más sutil */
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5); /* Sombra más dramática al pasar el ratón por encima */
  }
`;

const CoursesContainer: React.FC = () => {
  return (
    <>
      <CoursesIntroContainer>
        {/*         <TitleContainer>
          <AnimatedIntroTitle
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Cursos de Maquillaje Profesional
          </AnimatedIntroTitle>
        </TitleContainer>*/}

        <DescriptionContainer>
          <AnimatedIntroDescription
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Sumérgete en el mundo del maquillaje con nuestros cursos
            especializados. Aprende técnicas avanzadas y conviértete en un
            experto.
          </AnimatedIntroDescription>
        </DescriptionContainer>

        <CoursesSection style={containerStyles}>
          <StyledCard
            courseId="1"
            $imageUrl="/img/curso/cursos-de-maquillaje-aprende-2ImagenUrl.webp"
            bgUrl="/img/curso/abstract-pink-background-pink-modern-shapes-background-vectorBgUrl.webp"
            cutUrl="/img/curso/cursos-de-maquillaje-aprende-2-removebg.png"
            title="Carrera De Maquillador Profesional Inicial!"
            description="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
            price="15000"
            borderStyle="lb"
          />
          <StyledCard
            courseId="2"
            $imageUrl="/img/curso/cursos-de-maquillaje-aprende-2ImagenUrl.webp"
            bgUrl="/img/curso/abstract-pink-background-pink-modern-shapes-background-vectorBgUrl.webp"
            cutUrl="/img/curso/cursos-de-maquillaje-aprende-2-removebg.png"
            title="Clases De Automaquillaje Avanzado!"
            description="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
            price="15000"
            borderStyle="lb"
          />
          <StyledCard
            courseId="3"
            $imageUrl="/img/curso/cursos-de-maquillaje-aprende-2ImagenUrl.webp"
            bgUrl="/img/curso/abstract-pink-background-pink-modern-shapes-background-vectorBgUrl.webp"
            cutUrl="/img/curso/cursos-de-maquillaje-aprende-2-removebg.png"
            title="Clases De Automaquillaje Inicial!"
            description="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
            price="15000"
            borderStyle="lb"
          />
        </CoursesSection>
      </CoursesIntroContainer>
    </>
  );
};

export default CoursesContainer;
