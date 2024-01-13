import React, { useEffect, useRef } from "react";
import {
  incrementItem,
  decrementItem,
  removeItem,
  syncCartWithUpdatedStock,
} from "../../../../redux/cartSlice/cartSlice";
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
  CheckoutButton,
} from "../stylesCartComponent/stylesCart";
import { io } from "socket.io-client";
import {
  UpdatedProduct,
  fetchUpdatedProducts,
} from "../../../../redux/productSlice/productUpdateSlice/productUpdateSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/store/appHooks";
import Image from "next/image";

interface CartProps {
  onClose: () => void;
  onCheckout: () => void;
}

export const Cart: React.FC<CartProps> = ({ onClose, onCheckout }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart);
  const cartItemsToDisplay = cartItems.filter(
    (item) => item.stock > 0 && item.cantidad <= item.stock
  );
  const canCheckout = cartItems.every((item) => item.stock > 0);
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const socket = io("https://sofiaportafolio.online");

    socket.on("stock-updated", async () => {
      try {
        const action = await dispatch(fetchUpdatedProducts());

        if (fetchUpdatedProducts.fulfilled.match(action)) {
          const updatedProducts: UpdatedProduct[] = action.payload;

          updatedProducts.forEach((product: UpdatedProduct) => {
            dispatch(syncCartWithUpdatedStock(product));
          });
        }
      } catch (error) {
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  useEffect(() => {}, [cartItemsToDisplay]);

  const handleRemove = (id: number) => {
    dispatch(removeItem(id));
  };

  const handleIncrement = (id: number) => {
    const currentItem = cartItems.find((item) => item.id === id);
    if (currentItem && currentItem.cantidad < currentItem.stock) {
      dispatch(incrementItem(id));
    }
  };

  const handleDecrement = (id: number) => {
    const currentItem = cartItems.find((item) => item.id === id);
    if (currentItem && currentItem.cantidad > 1) {
      dispatch(decrementItem(id));
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <CartMainContainer ref={cartRef}>
      <CartHeaderContainer>
        <CartHeader>Tu Carrito</CartHeader>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </CartHeaderContainer>

      {cartItemsToDisplay.length === 0 ? (
        <CartEmptyMessage>Tu carrito está vacío.</CartEmptyMessage>
      ) : (
        <>
          <List>
            {cartItemsToDisplay.map((item) => (
              <React.Fragment key={item.id}>
                <ListItem>
                  <div
                    style={{
                      display: "inline-block",
                      width: "50px",
                      marginRight: "10px",
                    }}
                  >
                    <Image
                      src={
                        item.imagen_url
                          ? item.imagen_url.startsWith("http")
                            ? item.imagen_url
                            : `https://sofiaportafolio.online${item.imagen_url}`
                          : "/path_to_default_image.jpg"
                      }
                      alt={item.nombre}
                      width={50}
                      height={50}
                    />
                  </div>

                  <ListItemText
                    primary={item.nombre}
                    secondary={`$${item.precio.toFixed(2)} x ${item.cantidad} ${
                      item.stock === 0
                        ? "(Agotado)"
                        : item.stock < 3
                        ? "(Pocas unidades disponibles)"
                        : ""
                    }`}
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
              {cartItemsToDisplay
                .reduce((acc, item) => acc + item.precio * item.cantidad, 0)
                .toFixed(2)}
            </Typography>
            <CheckoutButton onClick={onCheckout} disabled={!canCheckout}>
              Finalizar Compra
            </CheckoutButton>
          </CartFooter>
        </>
      )}
    </CartMainContainer>
  );
};

export default Cart;
