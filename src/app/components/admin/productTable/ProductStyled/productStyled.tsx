import styled, { keyframes } from "styled-components";

type StyledButtonProps = {
  $isDeleteButton?: boolean;
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const StyledSelect = styled.select`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #e5ded0;
  border-radius: 5px;
  background-color: #f7f2e8;
  color: #6d6d6d;
  font-size: 16px;
  font-family: "Georgia", serif;
  appearance: none;
  cursor: pointer;
  transition: background-color 0.3s, border 0.3s;

  &:hover {
    background-color: #e5ded0;
    border-color: #d3c9bb;
  }

  &:focus {
    outline: none;
    background-color: #e5ded0;
    border-color: #d3c9bb;
  }
`;

export const ProductContainer = styled.div`
  margin: 2rem;
  font-family: "Georgia", serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 1s ease-in;
  color: #6d6d6d;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  overflow: hidden;
  animation: ${fadeIn} 1.5s ease-in;

  thead {
    background-color: #ff97b5;
    color: white;
    font-size: 1.2em;
  }

  th,
  td {
    padding: 1em;
    text-align: center;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #f7f2e8;
    }
  }

  th {
    border-bottom: 2px solid #f7f2e8;
  }

  tbody tr {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;

    &:hover {
      box-shadow: 0 4px 12px rgba(255, 151, 181, 0.2);
    }
  }
`;

export const StyledButton = styled.button<StyledButtonProps>`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-family: "Georgia", serif;
  transition: background-color 0.3s, transform 0.3s ease;
  background-color: ${({ $isDeleteButton }) =>
    $isDeleteButton ? "#e74c3c" : "#ff97b5"};
  color: white;

  &:hover {
    background-color: ${({ $isDeleteButton }) =>
      $isDeleteButton ? "#c0392b" : "#e8719e"};
    transform: scale(1.05);
  }
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #e5ded0;
  border-radius: 5px;
  background-color: #f7f2e8;
  color: #6d6d6d;
  font-size: 16px;
  font-family: "Georgia", serif;
  transition: background-color 0.3s, border 0.3s;

  &:hover {
    background-color: #e5ded0;
    border-color: #d3c9bb;
  }

  &:focus {
    outline: none;
    background-color: #e5ded0;
    border-color: #d3c9bb;
  }
`;

export const StyledH2 = styled.h2`
  color: #6d6d6d;
  font-family: "Georgia", serif;
  font-size: 24px;
  margin-bottom: 25px;
  text-align: center;
  border-bottom: 2px solid #ff97b5;
  padding-bottom: 10px;
`;
export const SuccessMessage = styled.div`
  margin: 10px 0;
  padding: 10px 15px;
  border-radius: 5px;
  background-color: #d3f9d8;
  color: #05840a;
  font-weight: 500;
`;

export const ErrorMessage = styled(SuccessMessage)`
  background-color: #ffe2e2;
  color: #e01e1e;
`;

export const PrimaryButton = styled(StyledButton)`
  background-color: #ff97b5;

  &:hover {
    background-color: #e8719e;
  }
`;

export const SecondaryButton = styled(StyledButton)`
  background-color: #a7a4e0;

  &:hover {
    background-color: #8e89d1;
  }
`;
