import React from "react";
import { Grid } from "@mui/material";
import { FaBuilding, FaAward, FaHandshake } from "react-icons/fa";
import { motion } from "framer-motion";
import {
  RootContainer,
  Title,
  Subtitle,
  IconContainer,
  GridTitle,
  GridText,
  // LearnMoreButton, // Descomenta si vas a usar el botón
} from "./acercaDeStyles";

// Variante de animación para los íconos
const iconVariants = {
  hover: {
    scale: 1.1,
    rotate: 10,
    transition: {
      duration: 0.5,
      yoyo: Infinity,
    },
  },
};

// Variante de animación para los textos
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const AcercaaDe: React.FC = () => {
  return (
    <RootContainer>
      <Title variant="h2">Acerca de Nuestra Empresa</Title>
      <Subtitle variant="h6">
        Comprometidos con la excelencia y la innovación.
      </Subtitle>
      <Grid container spacing={4}>
        {[
          {
            icon: FaBuilding,
            title: "Fundación",
            text: "Fundada en 2020, hemos crecido rápidamente gracias a nuestra dedicación y pasión.",
          },
          {
            icon: FaAward,
            title: "Reconocimientos",
            text: "Reconocidos por nuestra excelencia en el servicio y la calidad de nuestros productos.",
          },
          {
            icon: FaHandshake,
            title: "Compromiso",
            text: "Estamos comprometidos con nuestros clientes y buscamos superar sus expectativas.",
          },
        ].map(({ icon: Icon, title, text }, index) => (
          <Grid item xs={12} md={4} key={title}>
            <motion.div variants={iconVariants} whileHover="hover">
              <IconContainer>
                <Icon />
              </IconContainer>
            </motion.div>
            <motion.div
              variants={textVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.5 }}
            >
              <GridTitle variant="h5">{title}</GridTitle>
              <GridText variant="body1">
                <span>{text}</span>
              </GridText>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </RootContainer>
  );
};

export default AcercaaDe;
