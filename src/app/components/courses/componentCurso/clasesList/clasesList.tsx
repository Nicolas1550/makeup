// ClasesList.tsx
import React from "react";
import {
  ClaseDescripcion,
  ClaseItem,
  ClaseTitulo,
  ClasesContainer,
  StyledButton,
} from "./clasesListStyled";

type Clase = {
  titulo: string;
  descripcion: string;
};

type ClasesListProps = {
  clases?: Clase[];
  mostrarTodas: boolean;
  setMostrarTodas: React.Dispatch<React.SetStateAction<boolean>>;
  maxClasesInicial: number;
};

const ClasesList: React.FC<ClasesListProps> = ({
  clases = [],
  mostrarTodas,
  setMostrarTodas,
  maxClasesInicial,
}) => {
  return (
    <ClasesContainer>
      {clases
        .slice(0, mostrarTodas ? clases.length : maxClasesInicial)
        .map((clase, index) => (
          <ClaseItem
            key={index}
            style={{
              display:
                index < maxClasesInicial || mostrarTodas ? "block" : "none",
            }}
          >
            <ClaseTitulo>
              Clase {index + 1}: {clase.titulo}
            </ClaseTitulo>
            <ClaseDescripcion>{clase.descripcion}</ClaseDescripcion>
          </ClaseItem>
        ))}
      <StyledButton onClick={() => setMostrarTodas(!mostrarTodas)}>
        {mostrarTodas ? "Ocultar" : "Ver más"}
      </StyledButton>
    </ClasesContainer>
  );
};

export default ClasesList;
