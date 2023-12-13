import styled from "styled-components";
const softPink = "#f7e0e0";
const darkPink = "#c06c84";
export const CartSidebarContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 350px;
  height: 100vh;
  background-color: ${softPink}; // Cambio de color de fondo para un toque más suave
  border-left: 1px solid ${darkPink}; // Borde más oscuro  border-left: 1px solid #ccc;
  overflow-y: auto;
  transition: transform 0.3s ease-in-out;
  transform: translateX(100%);

  &.open {
    transform: translateX(0);
  }
`;

export const CartContainer = styled.div`
  background-color: #fff; // Un fondo blanco para que los productos destaquen más
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin: 20px auto;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

export const CartHeader = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: ${darkPink}; // Un color de encabezado más oscuro para que destaque
`;

export const CartItem = styled.div`
  background-color: #fff;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid ${darkPink}; // Borde más oscuro

  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);
  }
`;

export const CartTotal = styled.div`
  font-weight: bold;
  text-align: right;
  margin-top: 20px;
  font-size: 18px;
  color: ${darkPink}; // Un color más oscuro para que destaque
`;

export const RemoveButton = styled.button`
  background-color: red;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  transition: 0.3s;
  background-color: ${darkPink}; // Un color más oscuro

  &:hover {
    background-color: #8a415d; // Un rojo más profundo al pasar el cursor
    transform: scale(1.05);
  }
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
  transition: color 0.3s, transform 0.3s;

  &:hover {
    color: ${darkPink}; // Cambio de color al pasar el cursor
    transform: rotate(15deg);
  }
`;

export const CartMainContainer = styled.div`
  width: 350px;
  height: 100vh;
  overflow-y: auto;
  position: fixed;
  top: 0;
  right: 0;
  background: linear-gradient(to bottom, #f9f9f9, #fff); // Degradado sutil
  border-left: 1px solid ${darkPink};
  box-shadow: -8px 0px 20px rgba(0, 0, 0, 0.15); // Sombra mejorada
  display: flex;
  flex-direction: column;
  z-index: 2000;
`;


export const CartHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${softPink}; // Un fondo más suave
  border-bottom: 1px solid #ccc;
`;

export const CartEmptyMessage = styled.div`
  padding: 2rem;
  text-align: center;
  font-weight: bold;
  color: ${darkPink}; // Un color más oscuro para que destaque
`;

export const CartFooter = styled.div`
  padding: 1rem 2rem;
  border-top: 1px solid #ccc;
  background-color: ${softPink};
  margin-top: auto; // Esta línea empujará el pie de página hacia abajo
`;
export const CheckoutButton = styled.button`
  display: block;
  width: 90%;
  margin: 20px auto;
  padding: 15px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: ${darkPink}; // Un color de fondo más oscuro
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #8a415d; // Un rojo más profundo al pasar el cursor
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
  }
`;
export const CartItemImage = styled.img`
  width: 50px;
  margin-right: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
