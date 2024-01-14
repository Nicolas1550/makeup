import Image from "next/image";
import styled from "styled-components";

// Definir una interfaz para las props
interface ProductImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  width?: number;
  height?: number;
}
const size = {
  mobile: "768px",
  tablet: "1024px",
  desktop: "2560px",
};

export const breakpoints = {
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(max-width: ${size.tablet})`,
  desktop: `(max-width: ${size.desktop})`,
};
// Estilos aplicados al contenedor de la imagen
const ProductImageContainer = styled.div`
  border-radius: 15px;
  overflow: hidden; // Para mantener el border-radius
  width: 150px;
  height: 150px;
  display: block;
  margin: auto;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.1);
  }

  @media only screen and (max-width: ${breakpoints.mobile}) {
    width: 100px;
    height: 100px;
  }
`;

const ProductImagee = ({
  src,
  alt,
  priority,
}: ProductImageProps) => (
  <ProductImageContainer>
    <Image
      src={src}
      alt={alt}
      priority={priority}
      layout="fill" // Hace que la imagen llene el contenedor
      objectFit="cover" // Mantén tu estilo original de object-fit
    />
  </ProductImageContainer>
);

export default ProductImagee;
