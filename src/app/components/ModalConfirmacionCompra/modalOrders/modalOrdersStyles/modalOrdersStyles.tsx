import styled from "styled-components";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

export const StyledDialog = styled(Dialog)`
.MuiDialog-paper {
  max-width: 550px;
  width: auto; // Cambia a 'auto' para permitir un ancho flexible
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

    /* Estilos personalizados para la barra de desplazamiento */
    scrollbar-width: thin;
    scrollbar-color: #d63384 rgba(245, 182, 203, 0.5);

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background: #d63384;
      border-radius: 8px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(245, 182, 203, 0.5);
    }
  }
  @media (max-width: 768px) {
    width: 100%; // Aumenta el ancho en pantallas pequeñas
  }
}
`;

export const StyledDialogTitle = styled(DialogTitle)`
  font-size: 1.5rem; // Tamaño de fuente para el título
  font-weight: bold;
  color: #d63384; // Color rosa para el título
  margin-bottom: 1rem;

  // Media query para pantallas más pequeñas
  @media (max-width: 768px) {
    font-size: 1.5rem !important; // Tamaño de fuente más pequeño para el título
  }
`;

export const StyledDialogContent = styled(DialogContent)`
  font-size: 1rem;
  color: #666;
  padding: 20px; // Añade un padding uniforme para un mejor espaciado

  // Ajustes para pantallas más pequeñas
  @media (max-width: 768px) {
    font-size: 0.9rem; // Ligeramente más pequeño para adaptarse a pantallas reducidas
    padding: 15px; // Reduce el padding para maximizar el espacio disponible
  }

  // Para pantallas muy pequeñas como móviles
  @media (max-width: 480px) {
    font-size: 0.8rem; // Tamaño de fuente aún más pequeño para pantallas muy pequeñas
    padding: 10px; // Padding aún más reducido para aprovechar el espacio
  }
`;
export const StyledDialogActions = styled(DialogActions)`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
`;

export const StyledButton = styled(Button)`
  font-size: 1rem; // Tamaño de fuente para el botón
  padding: 0.5rem 1rem;
  color: white;
  background-color: #d63384; // Color rosa para el botón
  transition: background-color 0.3s;

  &:hover {
    background-color: #b82774; // Color al pasar el mouse sobre el botón
  }
`;

export const OrderContainer = styled.div`
  display: flex;
  flex-direction: column; // Cambia a columna en dispositivos móviles
  margin: 1rem 0;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 10px;
  background-color: #fff;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    flex-direction: column; // Cambia a disposición en columna
  }
`;

export const ProductsContainer = styled.div`
  flex: 2;
  padding-right: 1rem;
  border-right: 1px solid #ddd;

  @media (max-width: 768px) {
    border-right: none; // Elimina el borde en pantallas pequeñas
    padding-right: 0; // Elimina el padding
    margin-bottom: 1rem; // Añade un margen inferior
  }
`;

export const ShippingInfoContainer = styled.div`
  flex: 1;
  padding-left: 1rem;
  background-color: #f8f8f8;
  border-radius: 10px;

  @media (max-width: 768px) {
    padding-left: 0; // Elimina el padding en pantallas pequeñas
  }
`;

export const UserDetail = styled.p`
  font-weight: bold;
  color: #d63384; /* Color rosa para el detalle del usuario */
  margin-bottom: 0.5rem;
`;

export const ProductDetail = styled.li`
  list-style-type: none;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    font-size: 0.8rem; // Reduce el tamaño de fuente en pantallas pequeñas
  }
`;

export const Image = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 1rem;
  object-fit: cover;
  border-radius: 5px;
  border: 1px solid #ddd;
  @media (max-width: 768px) {
    width: 40px; // Reduce el tamaño de la imagen en pantallas pequeñas
    height: 40px;
  }
`;

export const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  @media (max-width: 768px) {
    flex-direction: column; // Ajusta a columna
    align-items: flex-start; // Alinea al inicio
  }
`;
