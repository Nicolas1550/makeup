import React from "react";
import { useCart } from "./contextCart/contextCart";

import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import {
  CartMainContainer,
  CartHeaderContainer,
  CartEmptyMessage,
  CartFooter,
  CartHeader,
  CloseButton,
  CheckoutButton,
} from "./stylesCart";

interface CartProps {
  onClose: () => void;
  onCheckout: () => void;
}

export const Cart: React.FC<CartProps> = ({ onClose, onCheckout }) => {
  const [cartItems, dispatch] = useCart();

  const handleRemove = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", id });
  };

  const handleIncrement = (id: number) => {
    dispatch({ type: "INCREMENT_ITEM", id });
  };

  const handleDecrement = (id: number) => {
    dispatch({ type: "DECREMENT_ITEM", id });
  };

  return (
    <CartMainContainer>
      <CartHeaderContainer>
        <CartHeader>Tu Carrito</CartHeader>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </CartHeaderContainer>

      {cartItems.length === 0 ? (
        <CartEmptyMessage>Tu carrito está vacío.</CartEmptyMessage>
      ) : (
        <>
          <List>
            {cartItems.map((item) => (
              <React.Fragment key={item.id}>
                <ListItem>
                  <img
                    src={item.imagen_url}
                    alt={item.nombre}
                    style={{ width: "50px", marginRight: "10px" }}
                  />
                  <ListItemText
                    primary={item.nombre}
                    secondary={`$${item.precio.toFixed(2)} x ${item.cantidad}`}
                  />
                  <IconButton onClick={() => handleIncrement(item.id)}>
                    <AddIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDecrement(item.id)}>
                    <RemoveIcon />
                  </IconButton>
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleRemove(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
          <CartFooter>
            <Typography variant="h6">
              Total: $
              {cartItems
                .reduce((acc, item) => acc + item.precio * item.cantidad, 0)
                .toFixed(2)}
            </Typography>
            <CheckoutButton onClick={onCheckout}>
              Finalizar Compra
            </CheckoutButton>
          </CartFooter>
        </>
      )}
    </CartMainContainer>
  );
};

export default Cart;
