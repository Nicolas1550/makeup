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
  imagen_url: string | File; // <-- Modificación aquí
  marca: string;
  color: string;
  categoria: string;
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
    categoria: "",
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
    const value =
      e.target.name === "precio" || e.target.name === "stock"
        ? parseFloat(e.target.value)
        : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    console.log(`Categoría seleccionada: ${value}`); // Agregar esto
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
    e.preventDefault();
    console.log("Form data before submitting:", formData); // Agregar este log
    dispatch(setLoading(true));
    dispatch(setMessage(null));
    dispatch(setError(null));
    dispatch(apiAddProduct(formData));
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
              type="file" // <-- Cambio aquí
              name="imagen_url"
              onChange={handleFileChange} // <-- Cambio aquí
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
              required
            />
          </StyledDiv>

          <StyledDiv>
            <StyledLabel>Categoría:</StyledLabel>
            <StyledSelect
              name="categoria"
              value={formData.categoria}
              onChange={handleSelectChange}
              required
            >
              <option value="" disabled>
                -- Selecciona una categoría --
              </option>
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
