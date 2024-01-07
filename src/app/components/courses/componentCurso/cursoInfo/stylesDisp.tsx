import styled from "styled-components";
export const StyledModal = styled.div`
  background-color: #fffaf0; // Fondo beige claro
  padding: 30px;
  border-radius: 15px;
  max-width: 600px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  margin: auto;

  @media (max-width: 768px) {
    padding: 20px;
    max-width: 90%;
  }
`;
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #f7f7f7; // Fondo gris claro
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 15px;
`;

export const StyledLabel = styled.label`
  color: #4a4a4a; // Color gris oscuro
  font-size: 1.1rem;
  font-weight: bold;
`;

export const StyledInput = styled.input`
  padding: 12px;
  border-radius: 5px;
  border: 2px solid #e0e0e0; // Borde beige
  &:focus {
    border-color: #ff69b4; // Borde rosa al enfocar
    box-shadow: 0 0 5px rgba(255, 105, 180, 0.5); // Sombra rosa
  }
`;

export const StyledSelect = styled.select`
  padding: 12px;
  border-radius: 5px;
  border: 2px solid #e0e0e0;
  &:focus {
    border-color: #ff69b4;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledButton = styled.button`
  background-color: #ff69b4; // Botones rosa
  color: white;
  padding: 12px 20px;
  border-radius: 6px;
  font-weight: bold;
  &:hover {
    background-color: #ff1493; // Rosa más oscuro al pasar el mouse
  }
`;

export const StyledAddButton = styled(StyledButton)`
  background-color: #ff69b4; // Rosa claro para agregar
`;

export const StyledSubmitButton = styled(StyledButton)`
  background-color: #ff69b4; // Rosa oscuro para enviar
`;