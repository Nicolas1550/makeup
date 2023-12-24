import styled from "styled-components";
const breakpoints = {
  tablet: "768px",
  mobile: "480px",
};

export const CarouselContainer = styled.div`
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  overflow: hidden;
  width: 100%;
  padding: 40px 0;
  background: linear-gradient(to right, #fdfbfb, #ebedee);
  position: relative;
  transition: transform 0.4s ease, box-shadow 0.4s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.15);
  }

  @media only screen and (max-width: ${breakpoints.tablet}) {
    padding: 30px 0;
  }

  @media only screen and (max-width: ${breakpoints.mobile}) {
    padding: 40px 0;
  }
`;

export const HighlightedProductCardContainer = styled.div`
  margin: 25px;
  width: 240px;
  min-height: 350px;
  transition: transform 0.5s, opacity 0.5s;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
  opacity: 0.7;

  &.slick-center {
    transform: scale(1.2) perspective(1000px) rotateY(0deg);
    opacity: 1;
    z-index: 2;
  }

  &.slick-slide:not(.slick-center) {
    transform: scale(0.9) perspective(1000px) rotateY(30deg);
    opacity: 0.6;
    z-index: 1;
  }

  .productOptions {
    display: none;
  }

  &:hover .productOptions {
    display: block;
  }

  @media only screen and (max-width: ${breakpoints.tablet}) {
    width: 220px;
    min-height: 330px;
  }

  @media only screen and (max-width: ${breakpoints.mobile}) {
    width: 200px;
    min-height: 310px;
  }
`;
