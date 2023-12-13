import styled from "styled-components";

export const StyledH1 = styled.h1`
  font-size: 3.5em;
  font-family: "Georgia", serif;
  color: #ff97b5;
  text-align: center;
  margin-bottom: 2em;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
`;

export const Button = styled.button`
  font-size: 1.3em;
  font-family: "Georgia", serif;
  margin: 0 0.5em;
  padding: 0.8em 1.4em;
  border: 2px solid #ff97b5; // Añadiendo un borde
  border-radius: 15px;
  background-color: #fff;
  color: #ff97b5;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #ff97b5;
    color: #fff;
  }
`;

export const Message = styled.div<{ $variant: "error" | "success" }>`
  color: ${(props) => (props.$variant === "error" ? "#e01e1e" : "#05840a")};
  border: 2px solid
    ${(props) => (props.$variant === "error" ? "#ffe2e2" : "#d3f9d8")};
  padding: 1em;
  border-radius: 10px;
  font-size: 1.3em;
  text-align: center;
  margin: 2em 0;
  background-color: ${(props) =>
    props.$variant === "error"
      ? "rgba(224, 30, 30, 0.1)"
      : "rgba(5, 132, 10, 0.1)"};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); // Añadimos una sombra sutil
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2em;
  gap: 20px;
  flex-wrap: wrap; // Permitir que los botones se envuelvan si no hay suficiente espacio
`;
