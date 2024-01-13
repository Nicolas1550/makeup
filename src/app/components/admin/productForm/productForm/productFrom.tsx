import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  StyledForm,
  StyledDiv,
  StyledLabel,
  StyledInput,
  StyledButton,
  StyledFormContainer,
  StyledSelect,
} from "../productFormStyled/productFormStyled";
import {
  setMessage,
  setError,
  setLoading,
  apiAddProduct,
  ProductManagementState,
} from "../../../../redux/productManagementSlice/productManagementSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/store/appHooks";
import {
  ErrorMessage,
  SuccessMessage,
} from "../../productTable/ProductStyled/productStyled";
const CATEGORIAS = ["Ojos", "Rostro", "Labios", "Uñas"];

interface FormData {
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen_url: string | File;
  marca: string;
  color: string;
  categoria: string | null;
}

const ProductForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    descripcion: "",
    precio: 0,
    stock: 0,
    imagen_url: "",
    marca: "",
    color: "",
    categoria: null,
  });

  const dispatch = useAppDispatch();
  const isLoading = useSelector(
    (state: ProductManagementState) => state.isLoading
  );
  const message = useAppSelector((state) => state.productManagement.message);
  const error = useAppSelector((state) => state.productManagement.error);
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => dispatch(setMessage(null)), 3000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  // Efecto para limpiar el mensaje de error después de 3 segundos
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => dispatch(setError(null)), 3000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "precio" || name === "stock") {
      const numValue = parseFloat(value);
      setFormData({
        ...formData,
        [name]: numValue,
      });
    } else {
      // Solo actualiza formData si el valor no es una cadena vacía
      if (value.trim() !== "") {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    }
  };
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === "" ? null : e.target.value; // Maneja la no selección
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setFormData({
        ...formData,
        imagen_url: file,
      });
    }
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const adaptedFormData = {
      ...formData,
      categoria: formData.categoria || undefined, // Convertir null a undefined
      color: formData.color || undefined, // Convertir cadena vacía a undefined
    };

    e.preventDefault();
    dispatch(setLoading(true));
    dispatch(setMessage(null));
    dispatch(setError(null));
    dispatch(apiAddProduct(adaptedFormData));
  };

  return (
    <>
      <StyledFormContainer>
        <StyledForm onSubmit={handleSubmit}>
          {message && <SuccessMessage>{message}</SuccessMessage>}
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <StyledDiv>
            <StyledLabel>Nombre:</StyledLabel>
            <StyledInput
              type="text"
              name="nombre"
              placeholder="Ejemplo: Lápiz labial"
              onChange={handleChange}
              required
            />
          </StyledDiv>
          <StyledDiv>
            <StyledLabel>Imagen:</StyledLabel>{" "}
            {/* Cambio de "URL de la imagen" a "Imagen" */}
            <StyledInput
              type="file"
              name="imagen_url"
              onChange={handleFileChange}
              required
            />
          </StyledDiv>
          <StyledDiv>
            <StyledLabel>Descripción:</StyledLabel>
            <StyledInput
              type="text"
              name="descripcion"
              placeholder="Ejemplo: Lápiz labial de larga duración en tono rojo"
              onChange={handleChange}
              required
            />
          </StyledDiv>

          <StyledDiv>
            <StyledLabel>Precio:</StyledLabel>
            <StyledInput
              type="number"
              name="precio"
              placeholder="Ejemplo: 150"
              onChange={handleChange}
              required
            />
          </StyledDiv>

          <StyledDiv>
            <StyledLabel>Stock:</StyledLabel>
            <StyledInput
              type="number"
              name="stock"
              placeholder="Ejemplo: 50"
              onChange={handleChange}
              required
            />
          </StyledDiv>

          <StyledDiv>
            <StyledLabel>Marca:</StyledLabel>
            <StyledInput
              type="text"
              name="marca"
              placeholder="Ejemplo: MARY KEY"
              onChange={handleChange}
              required
            />
          </StyledDiv>

          <StyledDiv>
            <StyledLabel>Color:</StyledLabel>
            <StyledInput
              type="text"
              name="color"
              placeholder="Ejemplo: Rojo carmesí"
              onChange={handleChange}
            />
          </StyledDiv>

          <StyledDiv>
            <StyledLabel>Categoría:</StyledLabel>
            <StyledSelect
              name="categoria"
              value={formData.categoria || ""} // Maneja el valor null
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
          </StyledDiv>

          <StyledButton type="submit">
            {isLoading ? "Cargando..." : "Agregar Producto"}
          </StyledButton>
        </StyledForm>
      </StyledFormContainer>
    </>
  );
};

export default ProductForm;
