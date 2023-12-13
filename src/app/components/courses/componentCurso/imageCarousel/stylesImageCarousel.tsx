import styled, { keyframes } from "styled-components";

export const MainContainer = styled.div`
  width: 100%;
  margin-top: 100px;
  padding: 20px;
  background-color: #f2f2f2;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    margin-top: 60px;
  }
`;

const slideInFromRight = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideInFromLeft = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

export const CarouselContainer = styled.div`
  position: relative;
  width: 50%;
  overflow: hidden;
  border-radius: 10px;
  animation: ${slideInFromLeft} 1s ease-out forwards;

  @media (max-width: 768px) {
    width: 100%;
    order: 2;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  transition: transform 0.5s ease;
`;

export const CarouselImage = styled.img`
  width: 100%;
  height: auto;
  flex-shrink: 0;
`;

export const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 2;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }

  &.prev {
    left: 10px;
  }

  &.next {
    right: 10px;
  }

  @media (max-width: 768px) {
    display: none; // Oculta los botones en pantallas pequeñas
  }
`;

export const TextContainer = styled.div`
  width: 45%;
  padding: 20px;
  background-color: #ffffffdd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: ${slideInFromRight} 1s ease-out forwards;

  @media (max-width: 768px) {
    width: 100%;
    order: 1;
  }
`;

export const InnerTextBox = styled.div`
  text-align: left;
  color: #d4b895;

  h2 {
    font-size: 34px;
    font-weight: bold;
    color: #d4b895;
    margin-bottom: 20px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    @media (max-width: 768px) {
      font-size: 28px; // Tamaño más pequeño en pantallas pequeñas
    }
  }

  p {
    font-size: 18px;
    line-height: 1.8;
    color: #4a4a4a;
    margin-bottom: 10px;
    text-shadow: 0.5px 0.5px 1px rgba(0, 0, 0, 0.1);
    @media (max-width: 768px) {
      font-size: 16px; // Texto más pequeño en pantallas pequeñas
    }
  }
`;
