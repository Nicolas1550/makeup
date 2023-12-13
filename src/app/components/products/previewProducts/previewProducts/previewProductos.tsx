import React from "react";
import Slider from "react-slick";
import Link from "next/link";
import Image from "next/image";

import {
  PreviewContainer,
  ProductFlowWrapper,
  ProductSlide,
  Title,
  ViewAllButton,
} from "../preview-flow-productStyles/previewProductsStyle";
import ProductFlow from "../productFlow/productFlow";
import { Product } from "../../../admin/productAction-reducer-types/types/types";

type ProductPreviewProps = {
  onProductClick: () => void;
  productList: Product[];
  isModalOpen: boolean;
};

const ProductPreview: React.FC<ProductPreviewProps> = ({ productList }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const imageBackgrounds = [
    "/img/12.webp",
    "/img/34.webp",
    "/img/23.webp",
    "/img/22.webp",
  ];

  return (
    <PreviewContainer>
      <Title>Descubre nuestros productos destacados</Title>{" "}
      {/* Título añadido para dar contexto */}
      <Slider {...settings}>
        {imageBackgrounds.map((imageUrl, index) => (
          <ProductSlide key={index}>
            <Image
              src={imageUrl}
              alt="Product Image"
              width={1500}
              height={500}
              quality={100} // Máxima calidad de imagen
            />
          </ProductSlide>
        ))}
      </Slider>
      <ProductFlowWrapper>
        <ProductFlow products={productList} />
      </ProductFlowWrapper>
      <Link href="/products">
        <ViewAllButton variant="contained" size="large">
          Ver todos los productos
        </ViewAllButton>
      </Link>
    </PreviewContainer>
  );
};

export default ProductPreview;
