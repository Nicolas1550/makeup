import styled from "styled-components";
import { lighten } from "polished";

// Utilizamos un color de fondo suave que aporta un toque moderno y fresco
export const SummaryContainer = styled.div`
  background: #f8f0fb;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  font-family: "Open Sans", sans-serif;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 800px;
  margin: auto;
  margin-top: 100px; 
  margin-bottom: 100px;

  overflow: hidden;
`;

// Mejoramos el diseño responsivo y la claridad visual de los inputs
export const InputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// Agregamos más claridad y enfasis a los labels
export const Label = styled.label`
  color: #a391b1;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

// Ajustamos el heading para que sea más prominente y moderno
export const Heading = styled.h2`
  color: #8e7796;
  font-size: 26px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 2rem;
`;

// Ajustamos la tabla para mejorar la legibilidad y el estilo moderno
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;
  thead {
    th {
      background-color: #f4f1f8;
      color: #666;
      font-weight: 600;
      padding: 16px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }
  tbody {
    tr {
      &:nth-child(odd) {
        background-color: #fafafa;
      }
      &:hover {
        background-color: #f0eef6;
      }
      td {
        padding: 16px;
        color: #666;
      }
    }
  }
`;

export const Button = styled.button`
  background-color: #ad4a92;
  color: white;
  border: none;
  padding: 0.8rem 1.6rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.25s;
  &:hover {
    background-color: #9c4283;
  }
  &:disabled {
    background-color: #e0cce0;
    color: #c7b2cf;
  }
`;

export const DateInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem; // Aumentamos el espacio para una mejor separación visual
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem; // Añadimos un margen superior para separar de otros elementos
`;

export const InputLabel = styled(Label)`
  display: flex;
  flex-direction: column;
  gap: 1rem; // Aumentamos el espacio para una mejor separación visual

  input[type="date"] {
    padding: 0.9rem;
    border: 2px solid ${lighten(0.3, "#ad4a92")}; // Mantenemos la coherencia con los colores del tema
    border-radius: 0.5rem;
    font-size: 1.1rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.12); // Ajustamos la sombra para más profundidad
  }
`;

export const TableHead = styled.thead`
  background-color: ${lighten(0.05, "#e8e0e8")};
  th {
    color: #333;
    font-weight: 600;
    padding: 18px 12px;
    text-transform: uppercase;
    letter-spacing: 0.75px;
    text-align: left; // Alineación a la izquierda
  }
`;

export const TableBody = styled.tbody`
  tr {
    border-bottom: 2px solid ${lighten(0.7, "#e8e0e8")};
    &:hover {
      background-color: ${lighten(0.45, "#f4a1c0")};
    }
    td {
      padding: 18px 12px;
      color: #666;
      text-align: left; // Alineación a la izquierda
    }
  }
`;

export const ErrorText = styled.p`
  color: #b85c5c;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 500;
  margin-top: 1.5rem;
`;

export const SummaryDetails = styled.div`
  margin-top: 2.5rem;
  background: #fafafa;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
`;

export const SummaryHeading = styled.h3`
  color: #8e7796;
  font-size: 22px;
  margin-bottom: 1.5rem;
  font-weight: 600;
  text-align: left; // Alineación a la izquierda
`;

export const SummaryParagraph = styled.p`
  color: #666;
  margin-bottom: 0.8rem;
  font-size: 1rem;
  text-align: left; // Alineación a la izquierda
`;

export const CloseButton = styled(Button)`
  background-color: #ccc;
  &:hover {
    background-color: #b2b2b2;
  }
`;
