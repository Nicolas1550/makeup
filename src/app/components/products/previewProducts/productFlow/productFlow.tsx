import React from "react";
import styled from "@emotion/styled";
import {
  ProductDetailsContainer,
  ProductFlowContainer,
} from "../preview-flow-productStyles/previewProductsStyle";
import { Product } from "@/app/components/admin/productAction-reducer-types/types/types";
import { ProductImage as StyledProductImage } from "../../products/styles/styleProducts"; 

type ProductFlowProps = {
  products: Product[];
};

const AnimatedProductDetailsContainer = styled(ProductDetailsContainer)`
  animation: slide-left 30s linear infinite;
  @keyframes slide-left {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(-100%);
    }
  }
`;

const ProductFlow: React.FC<ProductFlowProps> = ({ products }) => {
  const loopedProducts = [...products, ...products]; 

  return (
    <ProductFlowContainer>
      {loopedProducts.map((product, index) => (
        <AnimatedProductDetailsContainer key={`product-${index}`}>
          <StyledProductImage 
            src={
              product.imagen_url
                ? `https://sofiaportafolio.online${product.imagen_url}`
                : "/path/to/default/image.png"
            }
            alt={product.nombre}
            width={140}
            height={100}
          />
          <h4>{product.nombre}</h4>
          <p>{product.descripcion}</p>
        </AnimatedProductDetailsContainer>
      ))}
    </ProductFlowContainer>
  );
};

export default React.memo(ProductFlow);
