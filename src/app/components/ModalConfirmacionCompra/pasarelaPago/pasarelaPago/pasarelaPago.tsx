import React, { useRef, useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { StyledPasarelaPago } from "../styledPasarelaPago/styledPasarelaPago";
import CargarComprobante from "../../uploadComprobant/uploadComprobant";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/store/appHooks";
import { clearCart } from "../../../../redux/cartSlice/cartSlice";
import { incrementNewOrdersCount } from "@/app/redux/orderSlice/orderSlice";
import Image from "next/image";

interface PasarelaPagoProps {
  setLoadedComprobante: (comprobante: File | null) => void;
  loadedComprobante: File | null;
  countdown: number;
  comprobanteMessage?: string | null;
  onPaymentSuccess: () => void;
  onPaymentFailure: () => void;
  total: number;
  datosUsuario: {
    nombre: string;
    email: string;
    telefono: string;
  };
  datosEnvio: {
    metodo_envio: string;
    direccion: string;
    ciudad: string;
    estado: string;
    codigo_postal: string;
    pais: string;
  };
  ordenId: string | null;
}

const PasarelaPago: React.FC<PasarelaPagoProps> = ({
  onPaymentFailure,
  total,
  datosUsuario,
  datosEnvio,
  ordenId,
  setLoadedComprobante,
  countdown,
  comprobanteMessage,
}) => {
  const cartItems = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const depositPaymentRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null); // Referencia para el contenedor de notificaciones

  const [showUploadOption, setShowUploadOption] = useState(false);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<
    string | null
  >(null);

  const closePaymentMethod = () => {
    setShowUploadOption(false);
  };

  const showPaymentMethod = () => {
    setShowUploadOption(true);

    // Asegúrate de que el elemento está en el DOM antes de intentar desplazarte
    setTimeout(() => {
      depositPaymentRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0); // El timeout puede ser necesario si el contenido se carga dinámicamente
  };

  const handleUploadSuccess = (data: { estado: string; comprobante: File }) => {
    console.log("Comprobante subido con éxito:", data);
    setUploadSuccessMessage("Comprobante cargado con éxito");
    setLoadedComprobante(data.comprobante);

    if (data.estado === "Aprobado") {
      dispatch(incrementNewOrdersCount());
    }

    // Llamada a la función callback proporcionada por ModalConfirmacionCompra
    setLoadedComprobante(data.comprobante); // Usar directamente aquí
    setUploadSuccessMessage("Comprobante cargado con éxito");
    notificationsRef.current?.scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {
      setUploadSuccessMessage(null);
      setShowUploadOption(false); // Puedes usar esta función para cerrar el método de pago
    }, 3000);
    dispatch(clearCart());
  };

  const handleUploadError = (error: Error) => {
    console.error("Error al cargar el comprobante:", error);
  };

  const handlePayment = async () => {
    console.log("Iniciando proceso de pago");

    const paymentData = {
      orden_id: ordenId,
      total,
      datosUsuario,
      datosEnvio,
      productos: cartItems,
    };

    const userToken = localStorage.getItem("jwt");

    try {
      const response = await axios.post(
        "http://localhost:3002/api/mercadopago/create_preference",
        paymentData,
        {
          headers: {
            "x-auth-token": userToken,
          },
        }
      );

      if (response.data && response.data.init_point) {
        window.location.href = response.data.init_point;
      } else {
        console.error("No se recibió la URL de MercadoPago.");
        onPaymentFailure();
      }
      dispatch(clearCart());
    } catch (error) {
      console.error("Error procesando el pago:", error);
      setErrorMessage(
        "Hubo un problema procesando tu pago. Por favor, inténtalo de nuevo."
      );

      if (typeof error === "object" && error !== null && "response" in error) {
        const typedError = error as {
          response?: { status: number; data: { error: string } };
        };
        if (typedError.response && typedError.response.status === 400) {
          alert(typedError.response.data.error);
        } else {
          onPaymentFailure();
        }
      } else {
        onPaymentFailure();
      }
    }
  };
  const renderShippingDetails = () => {
    if (datosEnvio.metodo_envio === "recoger") {
      // Mostrar "Buscar en tienda (direccion)" cuando el método de envío es "Recoger en Tienda"
      return (
        <p>
          <strong>
            Buscar en tienda: <br />Direccion: Thorne 1145 <br /> Horarios: De Luenes a Viernes
            14hs a 20hs
          </strong>
        </p>
      );
    } else {
      return (
        <>
          <p>
            <strong>Dirección:</strong> {datosEnvio.direccion}
          </p>
          <p>
            <strong>Ciudad:</strong> {datosEnvio.ciudad}
          </p>
          <p>
            <strong>Estado:</strong> {datosEnvio.estado}
          </p>
          <p>
            <strong>Código Postal:</strong> {datosEnvio.codigo_postal}
          </p>
          <p>
            <strong>País:</strong> {datosEnvio.pais}
          </p>
        </>
      );
    }
  };
  return (
    <StyledPasarelaPago>
      <h5 className="main-title">Pasarela de Pago</h5>

      <div className="section-card user-section">
        <h6>Datos del Usuario</h6>
        <div className="user-details">
          <p>
            <strong>Nombre:</strong> {datosUsuario.nombre}
          </p>
          <p>
            <strong>Email:</strong> {datosUsuario.email}
          </p>
          <p>
            <strong>Teléfono:</strong> {datosUsuario.telefono}
          </p>
        </div>
      </div>

      <div className="section-card products-section">
        <h6>Productos a comprar:</h6>
        <ul className="products-list">
          {cartItems.map((producto) => (
            <li key={producto.id}>
              <Image
                src={
                  producto?.imagen_url
                    ? producto.imagen_url.startsWith("http")
                      ? producto.imagen_url
                      : `http://localhost:3002${producto.imagen_url}`
                    : "/path/to/default/image.jpg"
                }
                alt={producto.nombre}
                width={100}
                height={100}
                className="product-image"
              />

              <span>
                <strong>{producto.nombre}</strong> - $
                {producto.precio.toFixed(2)} x {producto.cantidad}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="section-card shipping-section">
        <h6>Datos de envío:</h6>
        <div className="shipping-details">{renderShippingDetails()}</div>
      </div>

      <div className="section-card payment-section">
        <h6>Detalles del pago</h6>
        <p className="total">
          <strong>Total a pagar:</strong> ${total.toFixed(2)}
        </p>

        <div className="payment-actions">
          {!showUploadOption && (
            <Button
              variant="contained"
              color="secondary"
              onClick={showPaymentMethod}
            >
              Pagar con Deposito
            </Button>
          )}

          {showUploadOption && (
            <React.Fragment>
              <Button
                variant="contained"
                color="secondary"
                onClick={closePaymentMethod}
              >
                Cerrar Método de Pago
              </Button>
              <div ref={depositPaymentRef}>
                <CargarComprobante
                  orderId={ordenId}
                  total={total}
                  onUploadSuccess={handleUploadSuccess}
                  onUploadError={handleUploadError}
                />
              </div>
            </React.Fragment>
          )}

          <Button variant="contained" color="primary" onClick={handlePayment}>
            Pagar con MercadoPago
          </Button>
        </div>
      </div>

      <div className="notifications" ref={notificationsRef}>
        {uploadSuccessMessage && (
          <p className="success-message">{uploadSuccessMessage}</p>
        )}
        {comprobanteMessage && countdown > 0 && (
          <p className="success-message">
            {comprobanteMessage} Cerrando en {countdown} segundos...
          </p>
        )}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </StyledPasarelaPago>
  );
};

export default PasarelaPago;
