import styled, { keyframes } from "styled-components";
import { FaPalette } from "react-icons/fa"; 
import { motion } from "framer-motion";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f6d5c8 0%, #f4c1d0 100%);
`;

const SpinnerIcon = styled(FaPalette)`
  animation: ${spin} 2s linear infinite;
  font-size: 3rem;
  color: #8a4f7d; // Un color que combina bien con el fondo
`;

const LoadingText = styled(motion.div)`
  margin-top: 20px;
  font-size: 1.5rem;
  color: #3a3845;
`;

const containerVariants = {
  start: { opacity: 0 },
  end: { opacity: 1, transition: { duration: 1 } }
};

const textVariants = {
  start: { y: 20, opacity: 0 },
  end: { y: 0, opacity: 1, transition: { duration: 0.5, yoyo: Infinity } }
};

const LoadingComponent = () => {
  return (
    <LoadingContainer variants={containerVariants} initial="start" animate="end">
      <SpinnerIcon />
      <LoadingText variants={textVariants}>
        Cargando...
      </LoadingText>
    </LoadingContainer>
  );
};

export default LoadingComponent;
