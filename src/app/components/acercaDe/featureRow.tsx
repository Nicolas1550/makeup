// FeatureRow.tsx
import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
/* linear-gradient(to right, #d7ccc8 0%, #ffffff 100%)*/
const textColor = "#4a4a4a"; // Un color oscuro para el texto que complementa el fondo beige

const Root = styled.div<RootProps>`
  display: flex;
  flex-direction: ${(props) => (props.reverse ? "row-reverse" : "row")};
  justify-content: center;
  align-items: center;
  padding: 2rem;
  margin: 2rem 0;
  max-width: 900px;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  background: #fff0f0;
  transition: transform 0.3s ease-in-out;
  width: calc(50% - 15px);

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 1880px) {
    // Ajusta este punto de interrupción a 1880px
    width: 100%;
    margin-top: 1rem;
    padding: 1rem;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%; // Ocupar todo el ancho en pantallas móviles
    margin-top: 1rem;
    padding: 1rem;
  }
`;

const ImageContainer = styled.div`
  width: 50%;
  height: auto;
  overflow: hidden;
  border-radius: 15px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Image = styled(motion.img)`
  width: 100%;
  height: auto;
  transition: transform 0.3s ease-in-out;
  border-radius: 15px; // Bordes redondeados para la imagen
`;

const TextContainer = styled(motion.div)<{ reverse?: boolean }>`
  flex: 1;
  width: 50%;
  padding: 1.5rem;
  background: ${(props) =>
    props.reverse
      ? "linear-gradient(to left, #f3e8d5 0%, #ffffff 100%)"
      : "linear-gradient(to right, #f3e8d5 0%, #ffffff 100%)"};
  backdrop-filter: blur(10px);
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: 1rem;
  text-align: left;
  min-height: 200px;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 1024px) {
    width: 100%;
    min-height: 150px;
  }
`;

const Title = styled(Typography)`
  margin-bottom: 1rem;
  font-size: 2rem;
  color: ${textColor};
  font-family: "Open Sans", sans-serif;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1); // Sombra de texto sutil para mejorar la legibilidad
`;

interface RootProps {
  reverse?: boolean;
}
interface FeatureRowProps {
  imageSrc: string;
  title: string;
  description: string;
  reverse?: boolean;
  marginTop?: boolean;
}

const FeatureRow: React.FC<FeatureRowProps> = ({
  imageSrc,
  title,
  description,
  reverse = false,
}) => {
  const [isClient, setIsClient] = useState(false);

  const imageVariants = {
    hidden: { opacity: 0, x: reverse ? 100 : -100 },
    visible: { opacity: 1, x: 0 },
  };

  const textHoverVariants = {
    rest: { scale: 0.95 },
    hover: { scale: 1 },
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <Root reverse={reverse}>
      <ImageContainer>
        <Image
          src={imageSrc}
          alt={title}
          initial="hidden"
          animate="visible"
          variants={imageVariants}
        />
      </ImageContainer>
      <TextContainer
        reverse={reverse} // Pasa la prop reverse a TextContainer
        variants={textHoverVariants}
        initial="rest"
        whileHover="hover"
      >
        <Title variant="h5">{title}</Title>
        <Typography variant="body1">{description}</Typography>
      </TextContainer>
    </Root>
  );
};

export default FeatureRow;
