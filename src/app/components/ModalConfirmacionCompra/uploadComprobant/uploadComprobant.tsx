import React, { ChangeEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import styled from "styled-components";

const FileInputLabel = styled.label`
  font-size: 1rem; // Puedes ajustar el tamaño como prefieras
  background-color: #f8f8f8;
  color: #333;
  padding: 10px 20px;
  display: inline-block;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;

  &:hover {
    background-color: #e8e8e8;
  }

  @media screen and (max-width: 573px) {
    font-size: 0.8rem; // Ajusta el tamaño para dispositivos móviles
    padding: 8px 15px;
  }
`;
const FileInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;
const CargarComprobanteContainer = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 20px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media screen and (max-width: 573px) {
    border: 0px solid #ccc;

    font-size: 15px !important;
    width: 150px;
    padding: 0px;
    margin: 0px;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

const LoadedComprobante = styled.div`
  margin-top: 10px;
`;

const DetailLabel = styled.strong`
  display: block; /* Hace que cada etiqueta esté en un renglón separado */
  margin-bottom: 5px; /* Agrega espacio entre las etiquetas */
`;

const DetailText = styled.p`
  font-size: 1.05em;
  color: #333;
  margin-bottom: 20px;
  white-space: pre-wrap; /* Permite saltos de línea */
`;
export interface UploadSuccessResponse {
  message: string;
  estado: string;
  comprobante: File;
}

interface CargarComprobanteProps {
  orderId: string | null;
  total?: number;
  onUploadSuccess: (data: { estado: string; comprobante: File }) => void;
  onUploadError: (error: Error) => void;
  loadedComprobante?: File | null;
}

interface ErrorResponse {
  message?: string;
}

const CargarComprobante: React.FC<CargarComprobanteProps> = ({
  orderId,
  total,
  onUploadSuccess,
  onUploadError,
  loadedComprobante,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log("Intentando subir archivo");

    if (e.target.files) {
      const file = e.target.files[0];

      if (!file) return;

      const formData = new FormData();
      formData.append("comprobante", file);

      setIsLoading(true);
      try {
        const response = await axios.post<UploadSuccessResponse>(
          `http://localhost:3002/api/orders/upload-comprobante/${orderId}`,
          formData
        );
        onUploadSuccess({ estado: 'Aprobado', comprobante: file });
        setIsLoading(false); // Indicador de carga desactivado
        console.log("Comprobante subido:", response.data);
      } catch (error) {
        console.error("Error al subir comprobante:", error);

        const axiosError = error as AxiosError<ErrorResponse>;
        onUploadError(axiosError);
        setIsLoading(false);
        if (axiosError.response?.data?.message) {
          setErrorMessage(axiosError.response.data.message);
        } else {
          setErrorMessage("Ocurrió un error al subir el archivo.");
        }
      }
    }
  };

  return (
    <CargarComprobanteContainer>
      <h6>Detalles para Transferencia Bancaria:</h6>
      <DetailLabel>Nombre de la Cuenta:</DetailLabel>
      <DetailText>Tu Nombre o Nombre de Empresa</DetailText>
      <DetailLabel>CBU:</DetailLabel>
      <DetailText>12345678901234567890</DetailText>
      <DetailLabel>Banco:</DetailLabel>
      <DetailText>Nombre del Banco</DetailText>
      <DetailLabel>Alias CBU:</DetailLabel>
      <DetailText>ALIASCBU</DetailText>
      <DetailLabel>Total a transferir:</DetailLabel>
      <DetailText>${total ? total.toFixed(2) : "N/A"}</DetailText>
      <FileInput type="file" id="file" onChange={handleUpload} />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <FileInputLabel htmlFor="file">Selecciona tu archivo</FileInputLabel>
      {loadedComprobante && (
        <LoadedComprobante>
          Archivo cargado: {loadedComprobante.name}
        </LoadedComprobante>
      )}
      {isLoading && <div>Cargando...</div>} {/* Indicador de carga */}
    </CargarComprobanteContainer>
  );
};

export default CargarComprobante;
