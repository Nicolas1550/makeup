import { useDispatch, useSelector } from "react-redux";
import { addItem, CartItem } from "../../../../redux/cartSlice/cartSlice";
import { toast } from "react-toastify";
import { ProductType } from "../../../../redux/ProductsFilterSlice/filterSlice";
import { RootState } from "../../../../redux/store/rootReducer";

export const useHandleAddToCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart);

  const handleAddToCart = (product: ProductType) => {
    if (!product) {
      return;
    }

    const existingItem = cartItems.find((item) => item.id === product.id);

    if (typeof product.stock === "undefined" || product.stock <= 0) {
      toast.error("Producto sin stock!");
      return;
    }

    if (existingItem && existingItem.cantidad >= product.stock) {
      toast.error("No se pueden agregar más unidades, producto sin stock!");
      return;
    }

    const itemToAdd: CartItem = {
      id: product.id,
      nombre: product.nombre,
      precio: product.precio,
      cantidad: 1,
      imagen_url: product.imagen_url || "ruta_por_defecto.jpg",
      stock: product.stock || 0,
    };

    dispatch(addItem(itemToAdd));

    const uniqueToastId = `${product.id}-${Date.now()}`;
    toast.success("Producto agregado al carrito!", { toastId: uniqueToastId });
  };

  return handleAddToCart; // Retornamos la función
};
