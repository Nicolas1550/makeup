import styled from "styled-components";
import Modal from "react-modal";

export const StyledModal = styled(Modal)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff5f5;
  padding: 60px;
  border-radius: 15px;
  max-width: 550px;
  box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.25);
  z-index: 1000;
  font-family: "Poppins", sans-serif;
  max-height: calc(
    80vh - 120px
  ); // Ajustar la altura máxima, resta el padding superior e inferior
  overflow-y: auto;
  padding-right: 70px; // Añade un relleno a la derecha para el scrollbar y un poco más para espacio visual
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 8px;
    background-color: #faf3e0;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #c06c84;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #f67280;
  }
  @media (max-width: 768px) {
    top: 10%;
    left: 5%;
    right: 5%;
    bottom: 10%;
    width: auto;
    transform: none; // Anula la transformación para dispositivos móviles
    padding: 20px; // Padding reducido para pantallas pequeñas
  }
`;

export const ServiceOptionsContainer = styled.div`
  background-color: #fff; // Un color de fondo blanco
  border: 1px solid #e74c6f; // Borde rosa claro
  border-radius: 10px; // Esquinas redondeadas
  padding: 20px; // Espaciado interno
  margin: 20px 0; // Espaciado exterior (top & bottom)
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // Sombra suave

  @media (max-width: 768px) {
    margin: 10px; // Reduce el margen para pantallas pequeñas
  }
`;

export const OptionTitle = styled.h3`
  font-size: 24px;
  color: #e74c6f; // Color rosa claro
  margin-bottom: 20px; // Espaciado después del título
  text-align: center; // Centrar el título
`;

export const OptionDescription = styled.p`
  font-size: 18px;
  color: #333; // Un gris oscuro para el texto
  margin-bottom: 15px; // Espaciado entre líneas
`;

export const TotalPriceDescription = styled(OptionDescription)`
  font-weight: bold; // Texto en negrita
  text-align: right; // Alinear a la derecha
`;

export const OptionButton = styled.button`
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 8px;
  background-color: #fff5f5;
  color: #e74c6f;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: #fdd7da;
  }

  @media (max-width: 768px) {
    width: 100%; // Botones de ancho completo en dispositivos móviles
    margin: 10px 0; // Espacio vertical para separar los botones
  }
`;

export const SelectedOption = styled(OptionButton)`
  background-color: #e74c6f;
  color: #ffffff;
`;

export const StyledText = styled.p`
  font-size: 18px;
  color: #7c7c7c;
  margin-bottom: 35px;
  text-align: center;
  line-height: 1.6;
`;
export const Button = styled.button`
  padding: 15px 30px;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  cursor: pointer;
  background-color: #f7c6d0;
  color: #fff;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.12);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 6px 25px rgba(0, 0, 0, 0.16);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 10px;
  }
`;

export const CancelButton = styled(Button)`
  background-color: #fdd7da;
  color: #e74c6f;

  &:hover {
    background-color: #e74c6f;
    color: #fff;
  }
`;

export const ConfirmButton = styled(Button)`
  background-color: #d49f6a;

  &:hover {
    background-color: #bf8b58;
  }
`;

export const Subtitle = styled.h4`
  font-size: 24px;
  color: #e74c6f;
  margin-bottom: 20px;
  text-align: center;
`;

export const PaymentDetails = styled.div`
  width: 100%;
  margin-bottom: 40px;
`;

export const FileInput = styled.input`
  display: block;
  width: 100%;
  padding: 15px;
  margin: 25px 0;
  border: 2px solid #f7c6d0;
  border-radius: 10px;
  font-size: 17px;
  color: #7c7c7c;

  &:hover {
    border-color: #e74c6f;
  }
`;

export const ThankYouText = styled.p`
  font-size: 22px;
  color: #7c7c7c;
  margin-top: 20px;
  text-align: center;
  font-weight: 500;
`;

export const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 25px;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const BackButton = styled(Button)`
  background-color: #fdd7da;
  color: #e74c6f;

  &:hover {
    background-color: #e74c6f;
    color: #fff;
  }
`;

export const NextButton = styled(Button)`
  background-color: #86d2f2;
  color: #ffffff;

  &:hover {
    background-color: #65bde1;
    color: #fff;
  }
`;

export const Title = styled.h2`
  font-size: 32px;
  color: #e74c6f;
  margin-bottom: 30px;
  text-align: center;
`;

export const OptionList = styled.ul`
  list-style-type: none;
  padding-left: 0;
  width: 100%;
`;

export const OptionItem = styled.li`
  padding: 10px 0;
`;

export const OptionCard = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #fef3f7;
  padding: 8px 12px;
  border: 1px solid #f7c6d0;
  border-radius: 8px;
  margin: 5px 0;
`;

export const OptionName = styled.span`
  font-size: 18px;
  color: #555;
  font-weight: 500;
`;

export const OptionPrice = styled.span`
  font-size: 18px;
  color: #e74c6f;
  font-weight: bold;
`;

export const TotalPrice = styled.h5`
  font-size: 22px;
  color: #e74c6f;
  margin-top: 30px;
  border-top: 2px solid #f7c6d0;
  padding-top: 20px;
`;
