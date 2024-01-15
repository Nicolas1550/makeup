import styled from "styled-components";
import { colors } from "../../bar/sideBarStyles/sideBarStyle";
import { motion } from "framer-motion";

const breakpoints = {
  tablet: "768px",
  mobile: "480px",
};

export const HighlightedContainer = styled.div`
  background-color: #efefef;
  padding: 20px;
  border-radius: 10px;

  @media only screen and (max-width: ${breakpoints.tablet}) {
    padding: 15px;
  }

  @media only screen and (max-width: ${breakpoints.mobile}) {
    padding: 10px;
  }
`;

export const SectionTitle = styled(motion.h2)`
  font-size: 2em;
  color: ${colors.pinkDark};
  display: flex;
  justify-content: center;
  text-align: center;
  margin-bottom: 2.5rem; // Margen para escritorio
  margin-top: 2.5rem;
  @media only screen and (max-width: 768px) {
    margin-bottom: 1rem; // Margen para tablet
  }

  @media only screen and (max-width: 480px) {
    margin-bottom: 0.5rem; // Margen para móvil
  }
`;
export const SectionDescription = styled(motion.div)`
  font-size: 1.1em;
  display: flex;
  justify-content: center;
  text-align: center;
  margin-bottom: 2.5rem; // Margen para escritorio
  @media only screen and (max-width: 768px) {
    margin-bottom: 1rem; // Margen para tablet
  }

  @media only screen and (max-width: 480px) {
    margin-bottom: 0.5rem; // Margen para móvil
  }
`;
