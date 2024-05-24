// External Libraries
import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { Typography, Grid, Button } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

// Styles & Assets
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/app/globals.css";
const StyledTypography = styled(Typography)`
  &.MuiTypography-h2 {
    font-size: 2.5em; // Tamaño más adaptable
    color: #ff69b4;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);

    @media (max-width: 768px) {
      font-size: 2em;
    }
  }

  &.MuiTypography-h6 {
    font-size: 1.4em;
    color: #a48f73; // Cambia según el estilo deseado
  }

  &.MuiTypography-body1 {
    color: #808080; // Cambia según el estilo deseado
    line-height: 1.7;
  }
`;

// Constants
const COLORS = {
  NEUTRAL_LIGHT: "#FAF3E0",
  DARKER_GRAY: "#808080",
  PINK_LIGHT: "#FFD1DC",
  PINK_DARK: "#FF69B4",
  PURPLE_LIGHT: "#D8BFD8",
  GOLD: "#FFD700",
};

const SLIDER_SETTINGS = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 1024, 
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768, 
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const ITEM_DATA = [
  { img: "/img/trabajosMaquillaje/1.webp", title: "Título 1" },
  { img: "/img/trabajosMaquillaje/2.webp", title: "Título 2" },
  { img: "/img/trabajosMaquillaje/3.webp", title: "Título 3" },
  { img: "/img/trabajosMaquillaje/4.webp", title: "Título 4" },
  { img: "/img/trabajosMaquillaje/5.webp", title: "Título 5" },
  { img: "/img/trabajosMaquillaje/2.webp", title: "Título 6" },
];

// Styled Components
const Section = styled.section`
  background-color: ${COLORS.NEUTRAL_LIGHT};
  padding: 4rem 0;

  @media (max-width: 768px) {
    padding: 2rem 0;
  }
`;
const ContentWrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const HighlightedText = styled.span`
  color: ${COLORS.PINK_DARK};
  font-weight: 600;
`;

const PinkButton = styled(Button)`
  background-color: ${COLORS.PINK_DARK};
  color: white;
  padding: 12px 24px;
  border-radius: 50px;
  font-size: 1.1rem;
  margin-top: 2.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.4s;
  &:hover {
    background-color: ${COLORS.PURPLE_LIGHT};
    transform: translateY(-4px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.12); // Agregar sombra en hover
  }
  &:active {
    transform: translateY(2px);
  }
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const CarouselContainer = styled.div`
  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const CarouselImageWrapper = styled.div`
  display: inline-flex; // Cambio a inline-flex para centrar la imagen
  justify-content: center;
  align-items: center;
  max-width: 100%;
  width: 100%;
  height: 361px; // Establecer una altura base
  overflow: hidden; // Esconder cualquier exceso de la imagen
  border-radius: 20px;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.12);
  transition: transform 0.4s, box-shadow 0.4s;
  padding: 0 10px;

  &:hover {
    transform: scale(1.08);
    box-shadow: 0 8px 14px rgba(0, 0, 0, 0.15);
  }

  // Ajustes para tablets y laptops pequeñas
  @media (max-width: 1024px) {
    height: 280px;
  }

  // Ajustes para tablets en modo retrato y móviles en modo paisaje
  @media (max-width: 768px) {
    padding: 0;
    height: 200px;
  }
`;
const AcercaDe: React.FC = () => (
  <Section>
    <Grid container spacing={6}>
      <Grid item xs={12} md={6}>
        <ContentWrapper>
          <StyledTypography variant="h2" gutterBottom>
            Acerca de <HighlightedText>Sofia Luciuk</HighlightedText>
          </StyledTypography>
          <StyledTypography variant="h6" gutterBottom>
            Transformando la belleza, un rostro a la vez.
          </StyledTypography>
          <StyledTypography variant="body1" paragraph>
            Makeup Magic ha sido líder en la industria del maquillaje desde
            2020. Nuestro equipo de artistas talentosos trabaja incansablemente
            para proporcionar a nuestros clientes los servicios y productos de
            la más alta calidad.
          </StyledTypography>
          <Link href="/acercaDe" passHref>
            <PinkButton variant="contained" className="btn-12">
              Más sobre nosotros
            </PinkButton>
          </Link>
        </ContentWrapper>
      </Grid>
      <Grid item xs={12} md={6}>
        <CarouselContainer>
          <Slider {...SLIDER_SETTINGS}>
            {ITEM_DATA.map((item) => (
              <div key={item.img}>
                <CarouselImageWrapper>
                  <Image
                    src={item.img}
                    width={361}
                    height={361}
                    alt={item.title}
                  />
                </CarouselImageWrapper>
              </div>
            ))}
          </Slider>
        </CarouselContainer>
      </Grid>
    </Grid>
  </Section>
);

export default AcercaDe;
