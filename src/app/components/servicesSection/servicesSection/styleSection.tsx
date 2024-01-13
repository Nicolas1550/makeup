import { motion } from "framer-motion";
import styled from "styled-components";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.5 } },
};
export const colors = {
  neutralLight: "#FAF3E0",
  darkerGray: "#808080",
  pinkLight: "#FFD1DC",
  pinkDark: "#FF69B4",
  purpleLight: "white",
  gold: "#808080",
};
export const CategoryContainer = styled(motion.div).attrs(() => ({
  initial: "hidden",
  animate: "visible",
  variants: fadeIn,
}))`
  background: ${colors.neutralLight};
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const EditButton = styled.button`
  background: #808080; 
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s;
  font-size: 14px;
  margin-top: 10px;

  &:hover {
    background: #666666; 
    transform: translateY(-3px);
  }
`;

export const CategoryTitle = styled.h2`
  display: flex;
  justify-content: center;
  font-family: "Roboto", sans-serif;
  font-size: 42px;
  color: ${colors.darkerGray};
  margin-bottom: 25px;

  @media (max-width: 720px) {
    font-size: 32px; // Tamaño de fuente más pequeño para móviles
    text-align: center; // Asegura que el texto esté centrado
  }
`;

export const CategoryDescription = styled.p`
  font-family: "Roboto", sans-serif;
  text-align: center;
  color: ${colors.pinkDark};
  margin-bottom: 50px;
  max-width: 800px;
  font-size: 22px;
`;
export const ServicesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  width: 100%;
  max-width: 1200px;
`;
export const ServiceCard = styled.div`
  background: ${colors.purpleLight};
  padding: 35px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  margin: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s, box-shadow 0.3s;
  width: 250px;
  flex: 1;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  }
`;

export const ServiceIcon = styled.div`
  font-size: 50px;
  margin-bottom: 20px;
  color: ${colors.gold};
`;

export const ServiceTitle = styled.h3`
  display: flex;
  justify-content: center;
  aling-items: center;
  font-family: "Roboto", sans-serif;
  font-size: 25px;
  margin-bottom: 18px;
  color: ${colors.darkerGray};
`;

export const ServiceDescription = styled.p`
  font-family: "Roboto", sans-serif;
  text-align: center;
  color: ${colors.pinkLight};
  margin-bottom: 25px;
  font-size: 18px;
`;
export const ServiceModalContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  font-family: "Roboto", sans-serif;
  text-align: center;

  & > img {
    width: 200px; 
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  & > p {
    flex: 1;
    color: ${colors.pinkLight};
    font-size: 18px;
  }
`;
export const SeeMoreButton = styled.button`
  background: ${colors.pinkDark};
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s;
  font-size: 16px;

  &:hover {
    background: ${colors.gold};
    transform: translateY(-3px);
  }
`;
