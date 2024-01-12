import styled from "styled-components";

export const ProductGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

export const ProductListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  flex-grow: 1;
`;

const ProductContainerBase = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  margin: 20px auto;
  max-width: 1200px;
  border-radius: 10px;
  width: 100%;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);  /* Sombra sutil */
  border: 1px solid rgba(0, 0, 0, 0.1);       
`;

interface ProductContainerProps {
  displayType: "highlighted" | "fullList" | "both";
  children: React.ReactNode;
}

export const ProductContainer: React.FC<ProductContainerProps> = ({
  displayType,
  children,
}) => {
  let backgroundColor;

  switch (displayType) {
    case "highlighted":
      backgroundColor = "#EFEFEF";
      break;
    case "fullList":
      backgroundColor = "white";
      break;
    case "both":
      backgroundColor = "linear-gradient(#EFEFEF 50%, white 50%)";
      break;
    default:
      backgroundColor = "white";
  }

  return (
    <ProductContainerBase style={{ background: backgroundColor }}>
      {children}
    </ProductContainerBase>
  );
};
