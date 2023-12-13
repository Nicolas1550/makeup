// index.tsx
import React from "react";
import FeatureRow from "@/app/components/acercaDe/featureRow";
import AcercaaDe from "@/app/components/acercaDe/acercaDe";

const AcercaDe: React.FC = () => {
  return (
    <div>
      <FeatureRow
        imageSrc="/img/makeup-session.jpg"
        title="Innovación en Maquillaje"
        description="Descubre las técnicas más avanzadas y tendencias actuales que ofrecemos."
        marginTop
      />
      <AcercaaDe />
      <FeatureRow
        imageSrc="/img/makeup-products.jpg"
        title="Calidad en Cada Producto"
        description="Nuestros productos están diseñados para realzar tu belleza y confianza."
        reverse
      />
    </div>
  );
};

export default AcercaDe;
