import styled from "styled-components";
import { TextField } from "@mui/material";

export const StyledFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 500px;
  margin: 20px auto;
  padding: 25px;
  border: 1px solid #f7c6d0; // Borde rosa claro
  border-radius: 12px;
  background-color: #fff5f5; // Fondo rosado claro
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);

  h6 {
    font-size: 1.5em;
    margin-bottom: 20px;
    color: #e74c6f; // Color rosa claro
    font-weight: 600;
  }
`;

export const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;

  .MuiButton-root {
    background: linear-gradient(
      45deg,
      #f67280 30%,
      #e74c6f 90%
    ); // Colores rosados
    color: white;
    transition: transform 0.3s ease;

    &:hover {
      background-color: #fdd7da; // Color rosado claro
      transform: scale(1.05);
    }
  }
`;

export const StyledTextField = styled(TextField)`
  background-color: #fef3f7; // Fondo sutilmente rosado
  border-radius: 6px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.05);

  label.Mui-focused {
    color: #e74c6f; // Color rosa claro
  }

  .MuiOutlinedInput-root {
    &:hover fieldset {
      border-color: #e74c6f; // Color rosa claro
    }
    &.Mui-focused fieldset {
      border-color: #e74c6f; // Color rosa claro
    }
  }
`;
