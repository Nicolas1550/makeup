import { RadioGroup, TextField } from "@mui/material";
import styled from "styled-components";

export const StyledSeleccionEnvio = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 420px;
  margin: 24px auto;
  padding: 30px;
  border-radius: 15px;
  background: linear-gradient(145deg, #f5f5f5, #ffffff);
  box-shadow: 10px 10px 20px #e0e0e0, -10px -10px 20px #ffffff;
  font-family: "Poppins", sans-serif;

  h6 {
    font-size: 1.6em;
    margin-bottom: 20px;
    color: #e74c6f;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }

  .MuiFormControlLabel-root {
    margin-left: 0;
    margin-right: 0;

    .MuiRadio-root {
      color: #e74c6f;
    }

    .MuiTypography-root {
      font-size: 1em;
      color: #555;
      font-weight: 500;
    }
  }

  .MuiButton-root {
    align-self: center;
    background: linear-gradient(45deg, #f67280 30%, #e74c6f 90%);
    color: white;
    transition: transform 0.3s ease;

    &:hover {
      background-color: #e74c6f;
      transform: scale(1.05);
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
`;

export const StyledTextField = styled(TextField)`
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: 4px 4px 10px #e0e0e0, -4px -4px 10px #ffffff;

  label.Mui-focused {
    color: #e74c6f;
  }

  .MuiOutlinedInput-root {
    &:hover fieldset {
      border-color: #e74c6f;
    }
    &.Mui-focused fieldset {
      border-color: #e74c6f;
    }
  }
`;

export const StyledRadioGroup = styled(RadioGroup)`
  .MuiFormControlLabel-root {
    margin-left: 0;
    margin-right: 0;

    .MuiRadio-root {
      color: #e74c6f;
    }

    .MuiTypography-root {
      font-size: 1.1em;
      color: #555;
      font-weight: 500;
    }
  }
`;
