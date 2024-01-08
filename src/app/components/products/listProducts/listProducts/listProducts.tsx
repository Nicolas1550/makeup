import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import ProductPreview from "../../previewProducts/previewProducts/previewProductos";

import { openModal } from "../../../../redux/sliceModal/modalSlice";
import { RootState } from "../../../../redux/store/rootReducer";
import { ProductType } from "../../../../redux/ProductsFilterSlice/filterSlice";

const ListProduct: React.FC = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state: RootState) => state.modal.isOpen);
  const searchTerm = useSelector((state: RootState) => state.filter.searchTerm);
  const priceRange = useSelector((state: RootState) => state.filter.priceRange);
  const selectedColor = useSelector(
    (state: RootState) => state.filter.selectedColor
  );
  const selectedMarca = useSelector(
    (state: RootState) => state.filter.selectedMarca
  );

  const [productList, setProductList] = useState<ProductType[]>([]);
  const [highlightedProductList, setHighlightedProductList] = useState<
    ProductType[]
  >([]);
  if (process.env.NODE_ENV === "development" && highlightedProductList) {
  }
  useEffect(() => {
    const socket = io("http://localhost:3002");
    socket.on("product-updated", () => {
      fetchProducts();
    });
    socket.on("product-added", fetchProducts);
    socket.on("product-edited", fetchProducts);
    socket.on("product-deleted", fetchProducts);
    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchProducts = () => {
    axios
      .get("http://localhost:3002/api/products")
      .then((response) => {
        setProductList(response.data);
        setHighlightedProductList(response.data.slice(0, 6));
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  useEffect(fetchProducts, []);

  const filterProducts = (products: ProductType[]): ProductType[] => {
    return products
      .filter(
        (product) =>
          product.precio >= priceRange[0] && product.precio <= priceRange[1]
      )
      .filter((product) =>
        selectedColor ? product.color === selectedColor : true
      )
      .filter((product) =>
        selectedMarca ? product.marca === selectedMarca : true
      )
      .filter((product) =>
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
  };

  const filteredProductList = filterProducts(productList);

  return (
    <>
      <ProductPreview
        onProductClick={() => dispatch(openModal())}
        productList={filteredProductList}
        isModalOpen={isModalOpen}
      />
    </>
  );
};

export default ListProduct;
