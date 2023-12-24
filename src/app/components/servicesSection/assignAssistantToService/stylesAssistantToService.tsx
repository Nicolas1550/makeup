import { styled } from "styled-components";

export const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; // Centrar verticalmente en la pantalla
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(
    0,
    0,
    0,
    0.5,
  ); // Fondo semi-transparente para el overlay

  /* Animación suave para la aparición del modal */
  animation: fadeIn 0.3s ease-in-out;
  
`;

export const Dropdown = styled.select`
  width: 100%;
  padding: 12px 15px;
  margin: 10px 0;
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

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #6d6d6d;
  font-size: 18px;
  font-family: "Georgia", serif;
`;

export const ModalContent = styled.div`
  background: linear-gradient(135deg, #fff6e5 0%, #ffe8dc 100%);
  color: #6d6d6d;
  padding: 30px 40px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 600px;
  margin-top:100px;
  margin-bottom: 100px;
`;

export const AssignButton = styled.button`
  background-color: #ff97b5;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 20px;
  border-radius: 5px;
  font-size: 16px;
  font-family: "Georgia", serif;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(255, 151, 181, 0.2);
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #e8719e;
    box-shadow: 0 4px 12px rgba(232, 113, 158, 0.3);
  }
`;
export const Title = styled.h2`
  color: #6d6d6d;
  font-family: "Georgia", serif;
  font-size: 24px;
  margin-bottom: 25px;
  border-bottom: 2px solid #ff97b5;
  padding-bottom: 10px;
`;

export const SubTitle = styled.h3`
  color: #6d6d6d;
  font-family: "Georgia", serif;
  font-size: 20px;
  margin-top: 25px;
  margin-bottom: 15px;
`;

export const AssistantList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const AssistantItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e5ded0;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f7f2e8;
`;

export const RemoveButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  font-family: "Georgia", serif;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(231, 76, 60, 0.2);
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #c0392b;
    box-shadow: 0 4px 12px rgba(192, 57, 43, 0.3);
  }
`;
