// hooks/useProductSocket.ts
import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

export type ProductType = {
  id: number;
  imagen_url: string;
  nombre: string;
  precio: number;
  marca: string;
  stock: number;
  descripcion: string;
  color: string;
};

const useProductSocket = (initialProduct?: ProductType) => {
  const [productList, setProductList] = useState<ProductType[]>([]);
  const [currentProduct, setCurrentProduct] = useState<ProductType | null>(
    initialProduct || null
  );

  useEffect(() => {
    const socket = io("http://localhost:3002");

    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3002/api/products");
        setProductList(response.data);
        if (currentProduct) {
          const updatedProduct = response.data.find(
            (prod: ProductType) => prod.id === currentProduct.id
          );
          // Verificar si el producto ha cambiado antes de actualizarlo
          if (
            updatedProduct &&
            JSON.stringify(updatedProduct) !== JSON.stringify(currentProduct)
          ) {
            setCurrentProduct(updatedProduct);
          }
        }
      } catch (error) {
      }
    };

    // Escuchando eventos
    const events = [
      "stock-updated",
      "product-updated",
      "product-added",
      "product-edited",
      "product-deleted",
      "prices-updated", 
    ];
    events.forEach((event) => socket.on(event, fetchProducts));

    // Obtener productos iniciales
    fetchProducts();

    // Desconexión del socket al desmontar el componente
    return () => {
      events.forEach((event) => socket.off(event, fetchProducts));
      socket.disconnect();
    };
  }, [currentProduct]);

  return {
    productList,
    currentProduct,
    setCurrentProduct,
  };
};

export default useProductSocket;
