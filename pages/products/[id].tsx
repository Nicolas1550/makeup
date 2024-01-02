import React from "react";
import Navbar from "@/app/components/navbar/navbar/navbar";
import { GetServerSidePropsContext } from "next";
import { ProductPageContainer } from "../../src/app/components/products/products/styles/stylesTodosLosProductos/todosLosProductosStyles";
import {
  CenteredContainer,
  ColorPreview,
  DescriptionContainer,
  DescriptionHeader,
  DescriptionText,
  DetailContainer,
  IconText,
  ImageContainer,
  ProductDetailContainer,
} from "@/app/components/products/products/styles/stylesTodosLosProductos/productoDetailStyles";
import {
  FaTag,
  FaBox,
  FaTrademark,
  FaPalette,
} from "react-icons/fa";
import { useHandleAddToCart } from "@/app/components/products/products/products/cartActions";
import Image from "next/image";
import colorName from "color-name-list";
import useProductSocket, {
  ProductType,
} from "@/app/components/products/products/products/useProductSocket";
import axios from "axios";
import { StyledButton } from "@/app/components/products/products/styles/productStyles";
interface ProductProps {
  product: ProductType;
}

const getColorFromName = (colorNameInput: string) => {
  const foundColor = colorName.find(
    (color) =>
      color &&
      color.name &&
      typeof colorNameInput === "string" &&
      color.name.toLowerCase() === colorNameInput.toLowerCase()
  );
  return foundColor ? foundColor.hex : null;
};

const ProductDetail: React.FC<ProductProps> = ({ product }) => {
  const { currentProduct } = useProductSocket(product); // Pasando el producto completo
  const handleAddToCart = useHandleAddToCart();

  if (!currentProduct) {
    // Manejar el caso cuando currentProduct es null
    return <div>Loading...</div>;
  }

  const backgroundColor =
    getColorFromName(currentProduct.color) || currentProduct.color;

  return (
    <ProductPageContainer>
      <Navbar />
      <CenteredContainer>
        <ProductDetailContainer>
          <ImageContainer>
            <Image
              src={
                currentProduct.imagen_url
                  ? currentProduct.imagen_url.startsWith("http")
                    ? currentProduct.imagen_url
                    : `https://sofiacomar1.latincloud.app${currentProduct.imagen_url}`
                  : "/path_to_default_image.jpg"
              }
              alt={currentProduct.nombre}
              width={500}
              height={500}
              priority
            />

            <StyledButton
              variant="contained"
              color="primary"
              onClick={() => handleAddToCart(currentProduct)} // Pasamos currentProduct como argumento al llamar a la función
              style={{ marginTop: "20px", alignSelf: "center" }}
            >
              Agregar al carrito
            </StyledButton>
          </ImageContainer>
          <DetailContainer>
            <h2>{currentProduct.nombre}</h2>

            <IconText>
              <FaTrademark />
              Marca: {currentProduct.marca}
            </IconText>

            <IconText>
              <FaTag />
              Precio: $
              {currentProduct.precio ? currentProduct.precio.toFixed(2) : "N/A"}
            </IconText>

            <IconText>
              <FaBox />
              Stock: {currentProduct.stock}
            </IconText>

            <ColorPreview>
              <FaPalette size={20} />
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "white",
                  border: "1px solid rgba(0, 0, 0, 0.2)",
                  borderRadius: "8px",
                  backgroundImage: `linear-gradient(45deg, ${backgroundColor} 50%, white 50%)`,
                  boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.2)",
                  transition: "box-shadow 0.2s, transform 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow =
                    "5px 5px 12px rgba(0, 0, 0, 0.25)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow =
                    "3px 3px 8px rgba(0, 0, 0, 0.2)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              ></div>
            </ColorPreview>

            <DescriptionContainer>
              <DescriptionHeader>Descripción</DescriptionHeader>
              <DescriptionText>{currentProduct.descripcion}</DescriptionText>
            </DescriptionContainer>
          </DetailContainer>
        </ProductDetailContainer>
      </CenteredContainer>
    </ProductPageContainer>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params?.id;
  if (!id) {
    return { notFound: true };
  }
  let product = {};
  try {
    const response = await axios.get(
      `https://sofiacomar1.latincloud.app/api/products/${id}`
    );
    product = response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
  }
  return {
    props: {
      product,
    },
  };
};

export default ProductDetail;
