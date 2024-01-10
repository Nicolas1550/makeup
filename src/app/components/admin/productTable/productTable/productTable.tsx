import React, { useState, useEffect } from "react";
import {
  StyledTable,
  StyledButton,
  StyledInput,
  StyledH2,
  ProductContainer,
  StyledSelect,
  SecondaryButton,
  PrimaryButton,
  ErrorMessage,
  SuccessMessage,
} from "../ProductStyled/productStyled";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/store/appHooks";
import {
  apiEditProduct,
  apiDeleteProduct,
  Product,
  apiGetAllProducts,
  setMessage,
  apiUpdateAllPrices,
  apiRevertAndApplyNewPercentage,
} from "../../../../redux/productManagementSlice/productManagementSlice";
import { io } from "socket.io-client";
interface ProductTableProps {
  products: Product[]; // Utiliza el tipo 'Product' en lugar de 'any[]'
}
const CATEGORIAS = ["Ojos", "Rostro", "Labios", "Uñas"];

const ProductTable: React.FC<ProductTableProps> = ({}) => {
  const allProducts = useAppSelector(
    (state) => state.productManagement.allProducts
  );
  const message = useAppSelector((state) => state.productManagement.message);
  const error = useAppSelector((state) => state.productManagement.error);
  const dispatch = useAppDispatch();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [updatedProduct, setUpdatedProduct] = useState<Product | null>(null);

  const [percentage, setPercentage] = useState<number>(0);

  useEffect(() => {
    dispatch(apiGetAllProducts());
  }, [dispatch]);

  useEffect(() => {
    const socket = io("https://asdasdasd3.onrender.com");

    socket.on("prices-updated", () => {
      dispatch(apiGetAllProducts());
    });

    return () => {
      socket.off("prices-updated");
      socket.disconnect();
    };
  }, [dispatch]);

  const startEditing = (product: Product) => {
    setEditingId(product.id);
    setUpdatedProduct(product);
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (updatedProduct) {
      // Actualiza solo si el valor no está vacío
      if (value !== "") {
        setUpdatedProduct({
          ...updatedProduct,
          [name]: value,
        });
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (updatedProduct) {
      // Asigna el valor directamente, incluso si es una cadena vacía
      setUpdatedProduct({
        ...updatedProduct,
        [name]: value,
      });
    }
  };

  const handleUpdate = async () => {
    if (updatedProduct) {
      const formData = new FormData();
      Object.entries(updatedProduct).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          formData.append(key, String(value));
        } else if (value === "" && key === "color") {
          // Si el campo 'color' es una cadena vacía, lo convierte en undefined
          formData.append(key, "undefined");
        }
      });
      console.log("Producto que se enviará al backend:", updatedProduct);

      try {
        const resultAction = await dispatch(
          apiEditProduct({ id: updatedProduct.id, formData })
        ).unwrap();

        // Suponiendo que el servidor devuelve el producto actualizado con una nueva ruta de imagen
        // Actualizamos el estado local con el producto actualizado
        setUpdatedProduct(resultAction); // actualiza el producto actual con los datos de respuesta
        setEditingId(null);
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await dispatch(apiDeleteProduct(id)).unwrap();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    productId: number
  ) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && updatedProduct && updatedProduct.id === productId) {
      setUpdatedProduct({
        ...updatedProduct,
        imagen_url: file,
      });
    }
  };
  const getImageUrl = (image: string | File | undefined) => {
    if (image instanceof File) {
      return URL.createObjectURL(image);
    } else if (typeof image === "string" && image.startsWith("/")) {
      // Asegúrate de que `image` comienza con `/`
      return `https://asdasdasd3.onrender.com${image}`;
    }
    // Retornar una imagen por defecto o un placeholder si no hay imagen
    return "/path_to_default_image.jpg";
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(setMessage(null)); // Limpiamos el mensaje después de 3 segundos
      }, 3000);

      // Limpiamos el temporizador si el componente se desmonta antes de que se ejecute
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  return (
    <ProductContainer>
      <StyledH2>Administrar Precios</StyledH2>

      <div>
        <StyledInput
          type="number"
          value={percentage}
          onChange={(e) => setPercentage(Number(e.target.value))}
          placeholder="Introduce el porcentaje"
        />
        <PrimaryButton onClick={() => dispatch(apiUpdateAllPrices(percentage))}>
          Aplicar Nuevo Porcentaje
        </PrimaryButton>
        <SecondaryButton
          onClick={() => dispatch(apiRevertAndApplyNewPercentage(percentage))}
        >
          Revertir y Aplicar Nuevo Porcentaje
        </SecondaryButton>
      </div>
      <StyledH2>Productos existentes</StyledH2>

      {message && <SuccessMessage>{message}</SuccessMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <StyledTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Imagen</th>
            <th>Categoría</th>
            <th>Descripción</th>
            <th>Color</th>
            <th>Marca</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {allProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                {editingId === product.id ? (
                  <StyledInput
                    name="nombre"
                    value={updatedProduct?.nombre}
                    onChange={handleInputChange}
                  />
                ) : (
                  product.nombre
                )}
              </td>
              <td>
                {editingId === product.id ? (
                  <StyledInput
                    name="precio"
                    value={updatedProduct?.precio}
                    onChange={handleInputChange}
                  />
                ) : (
                  product.precio
                )}
              </td>
              <td>
                {editingId === product.id ? (
                  <StyledInput
                    name="stock"
                    value={updatedProduct?.stock}
                    onChange={handleInputChange}
                  />
                ) : (
                  product.stock
                )}
              </td>
              <td>
                {editingId === product.id ? (
                  <input
                    type="file"
                    onChange={(e) => handleImageChange(e, product.id)}
                  />
                ) : (
                  <img
                    src={getImageUrl(product.imagen_url)}
                    alt={product.nombre}
                    width={50}
                    height={50}
                  />
                )}
              </td>
              <td>
                {editingId === product.id ? (
                  <StyledSelect
                    name="categoria"
                    value={updatedProduct?.categoria || ""}
                    onChange={handleSelectChange}
                  >
                    <option value="">Sin categoría</option>{" "}
                    {/* Opción para no seleccionar categoría */}
                    {CATEGORIAS.map((categoria) => (
                      <option key={categoria} value={categoria}>
                        {categoria}
                      </option>
                    ))}
                  </StyledSelect>
                ) : (
                  product.categoria || "Sin categoría" // Muestra "Sin categoría" si no hay una definida
                )}
              </td>
              <td>
                {editingId === product.id ? (
                  <StyledInput
                    name="descripcion"
                    value={updatedProduct?.descripcion}
                    onChange={handleInputChange}
                  />
                ) : (
                  product.descripcion
                )}
              </td>
              <td>
                {editingId === product.id ? (
                  <StyledInput
                    name="color"
                    value={updatedProduct?.color || ""}
                    onChange={handleInputChange}
                  />
                ) : (
                  product.color || "No definido" // Muestra "No definido" si color es undefined
                )}
              </td>

              <td>
                {editingId === product.id ? (
                  <StyledInput
                    name="marca"
                    value={updatedProduct?.marca}
                    onChange={handleInputChange}
                  />
                ) : (
                  product.marca
                )}
              </td>
              <td>
                {editingId === product.id ? (
                  <>
                    <PrimaryButton onClick={handleUpdate}>
                      Guardar
                    </PrimaryButton>
                    <StyledButton
                      $isDeleteButton
                      onClick={() => setEditingId(null)}
                    >
                      Cancelar
                    </StyledButton>
                  </>
                ) : (
                  <>
                    <SecondaryButton onClick={() => startEditing(product)}>
                      Editar
                    </SecondaryButton>
                    <StyledButton
                      $isDeleteButton
                      onClick={() => handleDelete(product.id)}
                    >
                      Eliminar
                    </StyledButton>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </ProductContainer>
  );
};

export default ProductTable;
