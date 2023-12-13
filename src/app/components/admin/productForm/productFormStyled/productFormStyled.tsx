import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const StyledFormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 1s ease-in;
  background: rgba(255, 255, 255, 0.8);
  padding: 2em;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  background: #f7f2e8; // Color de fondo modificado a crema claro

  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.3s ease;
  }
`;
export const StyledSelect = styled.select`
  width: 100%;
  padding: 0.7em;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
  transition: box-shadow 0.3s ease, border 0.3s ease;

  &:focus {
    box-shadow: 0 0 10px rgba(248, 151, 181, 0.6); // Color de sombra cambiado a rosa claro
    border: 2px solid #ff97b5; // Color de borde cambiado a rosa claro
  }
  option:disabled {
    color: #ccc;
  }
`;

export const StyledForm = styled.form`
  width: 100%;
  max-width: 400px;
  background: #fff;
  padding: 2em;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

export const StyledDiv = styled.div`
  margin-bottom: 1em;
  position: relative;
`;

export const StyledLabel = styled.label`
  font-family: "Georgia", serif; // Añadido tipo de letra
  font-size: 1.2em;
  color: #6d6d6d; // Color cambiado a gris oscuro para contraste
`;
export const StyledInput = styled.input`
  width: 100%;
  padding: 0.8em;
  border: 2px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #ff97b5; // Color de borde cambiado a rosa claro
  }
  &:hover,
  &:focus {
    border-color: #e8719e; // Color de borde hover/focus cambiado a rosa oscuro
    box-shadow: 0 0 10px rgba(248, 151, 181, 0.6); // Color de sombra hover/focus cambiado a rosa claro
  }
`;

export const StyledButton = styled.button`
  padding: 0.8em 1.5em;
  background-color: #009879;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  background-color: #ff97b5; // Color de fondo cambiado a rosa claro

  &:hover {
    background-color: #e8719e; // Color de fondo hover cambiado a rosa oscuro
    box-shadow: 0 0 10px rgba(248, 151, 181, 0.6); // Color de sombra hover cambiado a rosa claro
  }
  cursor: pointer; // Estilo del cursor
`;
