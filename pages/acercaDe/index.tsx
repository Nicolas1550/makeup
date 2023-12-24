// index.tsx
import React from "react";
import FeatureRow from "@/app/components/acercaDe/featureRow";
import AcercaaDe from "@/app/components/acercaDe/acercaDe";
import styled from "@emotion/styled";
import BackgroundImageWithTitle from "@/app/components/acercaDe/backgroundImageWithTitle";

const RowContainer = styled.div`
  display: flex;
  flex-direction: row; // Los FeatureRow estarán uno encima del otro
  justify-content: space-between; // Separar los FeatureRow

  align-items: center; // Centra los FeatureRow en el eje transversal
  gap: 30px;
  padding: 2rem;
  body {
    background: linear-gradient(to right, #f5f7fa, #ffe3e3);
    background-size: cover;
  }
  // Ejemplo de gradiente

  // Aplicamos el estilo zigzag o escalonado aquí
  > div:nth-of-type(odd) {
    // Selecciona cada FeatureRow impar
    align-self: flex-start; // Alinea al inicio (izquierda)
  }

  > div:nth-of-type(even) {
    // Selecciona cada FeatureRow par
    align-self: flex-end; // Alinea al final (derecha)
  }

  @media (max-width: 1750px) {
    // En pantallas más pequeñas, los FeatureRow se apilan verticalmente
    flex-direction: column;
    align-items: stretch; // Los FeatureRow se estiran para ocupar todo el ancho disponible

    > div {
      align-self: center; // Centra los FeatureRow
    }
  }
`;
const MainContainer = styled.div`
  display: flex;
  justify-content: center; // Centra horizontalmente
  align-items: center; // Centra verticalmente
  margin-bottom: 20px;
`;

const AcercaDe: React.FC = () => {
  return (
    <div>
      <BackgroundImageWithTitle />
    
      <RowContainer>
        <FeatureRow
          imageSrc="/img/asd.webp"
          title="Innovación en Maquillaje: Explora el Arte de la Belleza Contemporánea"
          description="En [Nombre de tu Empresa o Marca], creemos que el maquillaje es mucho más que un toque de color; es una forma de expresión, una obra de arte en constante evolución. Es por ello que nos dedicamos a descubrir y aplicar las técnicas más avanzadas en maquillaje, asegurándonos de que estés siempre a la vanguardia de las últimas tendencias."
          marginTop
        />
        <FeatureRow
          imageSrc="/img/asdd.webp"
          title="Calidad en Cada Producto"
          description="Nuestros productos están diseñados para realzar tu belleza y confianza."
          reverse
        />
      </RowContainer>
      <MainContainer>
        <AcercaaDe />
      </MainContainer>
    </div>
  );
};

export default AcercaDe;
