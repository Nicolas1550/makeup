import styled from "styled-components";
/* contenedor de ambos componente en el componente de curso */
export const CursoDetalleContainer = styled.div`
  min-height: 100vh;
  padding: 40px;
  background: linear-gradient(145deg, #FADADD, #FAF3E0);
  padding-top: 130px;
  @media (max-width: 768px) {
    padding: 20px;
    
  }
  @media (max-width: 480px) {
    padding: 10px; // Reduce aún más el padding para dispositivos móviles

    .CursoDetalleContainer {
      width: calc(
        100% - 20px
      ); /* Ajusta el ancho al padding para prevenir desbordamiento */
    }
    .ClasesContainer {
      width: calc(
        100% - 40px
      ); /* Considera cualquier padding o margen interno */
      /* Otros estilos según sea necesario */
    }

    /* Ajusta los estilos de otros elementos internos para asegurar que no desborden */
  }
`;
/* clasesList */
export const CursoTitulo = styled.h1`
  margin-top: 60px;
  margin-bottom: 30px;
  font-size: 3em;
  font-weight: 600;
  color: #2a3d45;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2em;
    margin-top: 40px;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    font-size: 1.5em;
    margin-top: 20px;
    margin-bottom: 10px;
  }
`;
export const CursoDescripcion = styled.h2`
  margin-bottom: 40px;
  font-size: 1.5em;
  color: #3b4f59;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.2em;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    font-size: 1em;
    margin-bottom: 15px;
  }
`;
interface ClasesContainerProps {
  mostrarTodas?: boolean;
}

export const ClasesContainer = styled.div<ClasesContainerProps>`
  max-height: 500px;
  overflow-y: auto;
  width: 50%;
  margin: 40px auto;
  padding: 20px;
  background-color: #f8f9fa;
  border: 1px solid #e0e2e5;
  border-radius: 10px;
  transition: max-height 0.3s ease-out;
  @media (max-width: 768px) {
    width: 70%;
    max-height: 600px;
  }

  @media (max-width: 400px) {
    width: 90%; // Ocupar la mayor parte del ancho de la pantalla
    margin: 20px auto; // Reducir el margen para dispositivos más pequeños
    padding: 10px; // Reducir el padding también ayuda
    max-height: 70vh; // Permitir que la altura sea un porcentaje de la altura de la pantalla
  }
`;

export const ClaseItem = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
  border: 1px solid #ccd6dd;
  padding: 20px;
  width: auto;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.06);
  background-color: #ffffff;
  border: 1px solid #e0e2e5;
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  }
  @media (max-width: 480px) {
    font-size: 1em !important;
  }
`;

export const ClaseTitulo = styled.h3`
  font-weight: 500;
  color: #2a3d45;
  margin-bottom: 10px;
`;

export const ClaseDescripcion = styled.p`
  color: #6e7c85;
  
`;

export const ClasesAdicionalesContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
  width: 100%;
  margin-top: 20px;
`;
