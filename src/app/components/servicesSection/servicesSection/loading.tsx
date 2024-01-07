import styled, { keyframes } from "styled-components";
import { FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: beige;
`;

const SpinnerIcon = styled(FaSpinner)`
  animation: ${spin} 2s linear infinite;
  font-size: 3rem;
  color: pink;
`;

const LoadingText = styled(motion.div)`
  margin-top: 20px;
  font-size: 1.5rem;
  color: black;
`;

const loadingVariants = {
  start: { opacity: 0 },
  end: { opacity: 1, transition: { duration: 0.5, yoyo: Infinity } },
};

const LoadingComponent = () => {
  return (
    <LoadingContainer>
      <SpinnerIcon />
      <LoadingText variants={loadingVariants} initial="start" animate="end">
        Cargando...
      </LoadingText>
    </LoadingContainer>
  );
};

export default LoadingComponent;
