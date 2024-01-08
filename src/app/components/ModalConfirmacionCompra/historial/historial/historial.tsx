import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type {
  AppDispatch,
  RootState,
} from "../../../../redux/store/rootReducer";
import {
  fetchUserOrders,
  Order as OrderType,
  OrderDetail,
  fetchOrdersByStatus,
  deleteOrderById,
  changeOrderStatus,
} from "../../../../redux/orderSlice/orderSlice";
import Image from "next/image";
import { MenuItem, Select, TextField } from "@mui/material";
import CargarComprobante from "../../uploadComprobant/uploadComprobant";
import { updateStockFromOrder } from "../../../../redux/cartSlice/cartSlice";
import { motion, AnimatePresence } from "framer-motion";
import {
  StyledOrderContainer,
  OrderHeader,
  OrderDetailsContainer,
  OrderSection,
  SectionTitle,
  ListItem,
  successMessageStyle,
  StyledButton,
} from "../styledHistorial/styledHistorial";
import axios from "axios";
import { FaUser, FaBox, FaShippingFast, FaCreditCard } from "react-icons/fa";

const Historial: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders: OrderType[] = useSelector(
    (state: RootState) => state.order.orders
  );
  const orderError: string | null = useSelector(
    (state: RootState) => state.order.error
  );
  const userRoles: string[] = useSelector(
    (state: RootState) => state.auth.userRoles
  );

  const [orderSorting, setOrderSorting] = useState<"asc" | "desc">("desc");
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
  const [showUploadForOrder, setShowUploadForOrder] = useState<number | null>(
    null
  );
  const [uploadMessage, setUploadMessage] = useState<{
    [orderId: number]: string;
  }>({});
  const [selectedStatus, setSelectedStatus] = useState<string>("activo");

  const isAdmin = userRoles.includes("admin");

  const getExtensionFromUrl = (url: string): string | undefined => {
    const match = url.match(/\.([0-9a-z]+)(?=[?#])|(\.)(?:[\w]+)$/gm);
    return (match && match[0]) || undefined;
  };

  const handleDownload = async (url: string) => {
    try {
      const response = await axios.get(url, { responseType: "blob" });
      const extension = getExtensionFromUrl(url);
      const fileName = extension ? `comprobante${extension}` : "comprobante";

      const link = document.createElement("a");
      link.href = URL.createObjectURL(new Blob([response.data]));
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error descargando el archivo:", error);
    }
  };

  useEffect(() => {
    const fetchParams: {
      status: string;
      sortByDate: "asc" | "desc";
      startDate?: string | undefined;
      endDate?: string | undefined;
    } = {
      status: selectedStatus,
      sortByDate: orderSorting,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    };

    if (isAdmin) {
      dispatch(fetchOrdersByStatus(fetchParams));
    } else {
      dispatch(fetchUserOrders());
    }
  }, [dispatch, isAdmin, selectedStatus, orderSorting, startDate, endDate]);

  const handleReplaceComprobante = (orderId: number) => {
    setShowUploadForOrder((prevOrderId) =>
      prevOrderId === orderId ? null : orderId
    );
  };

  const getOrderDetails = (order: OrderType): OrderDetail[] | undefined => {
    return order.details || order.detalles;
  };

  const handleOrderClick = (orderId: number) => {
    setExpandedOrderId((prevOrderId) =>
      prevOrderId === orderId ? null : orderId
    );
  };

  const handleCompleteOrder = (orderId: number) => {
    dispatch(changeOrderStatus({ orderId, newState: "Completado" }))
      .unwrap()
      .then(() => {
        if (isAdmin) {
          dispatch(
            fetchOrdersByStatus({
              status: selectedStatus,
              sortByDate: orderSorting,
              startDate: startDate || undefined,
              endDate: endDate || undefined,
            })
          );
        } else {
          dispatch(fetchUserOrders());
        }
      })
      .catch((error) => {
        console.error("Error al actualizar la orden:", error);
      });
  };

  if (orderError) {
    return <div>Error al obtener las órdenes: {orderError}</div>;
  }
  return (
    <div>
      {/*       <h1>Historial de Órdenes</h1>
       */}{" "}
      {isAdmin && (
        <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
          <div style={{ display: "flex", gap: "10px" }}>
            <Select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <MenuItem value="aprobado">Aprobado</MenuItem>
              <MenuItem value="completado">Completado</MenuItem>
              <MenuItem value="activo">Activo</MenuItem>
              <MenuItem value="pendiente">Pendiente</MenuItem>
            </Select>
            <Select
              value={orderSorting}
              onChange={(e) =>
                setOrderSorting(e.target.value as "asc" | "desc")
              }
            >
              <MenuItem value="desc">Recientes</MenuItem>
              <MenuItem value="asc">Antiguos</MenuItem>
            </Select>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <TextField
              label="Fecha inicio"
              type="date"
              value={startDate || ""}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Fecha fin"
              type="date"
              value={endDate || ""}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </div>
      )}
      <AnimatePresence>
        {orders.map((order: OrderType, index: number) => (
          <StyledOrderContainer
            as={motion.div}
            key={order.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <OrderHeader onClick={() => handleOrderClick(order.id)}>
              Orden #{index + 1} - {new Date(order.fecha).toLocaleDateString()}{" "}
              -<span> Haga clic para ver detalles</span>
            </OrderHeader>

            {isAdmin && (
              <StyledButton
                variant="contained"
                color="secondary"
                onClick={() => {
                  if (
                    window.confirm(
                      "¿Estás seguro de que deseas eliminar esta orden?"
                    )
                  ) {
                    dispatch(deleteOrderById(order.id))
                      .unwrap()
                      .then((result) => {
                        if ("orderId" in result) {
                          const orderToDelete = orders.find(
                            (o) => o.id === result.orderId
                          );
                          if (orderToDelete && orderToDelete.details) {
                            dispatch(
                              updateStockFromOrder(orderToDelete.details)
                            );
                          }
                        }
                      })
                      .catch((error) => {
                        console.error("Error al eliminar la orden:", error);
                      });
                  }
                }}
              >
                Eliminar Orden
              </StyledButton>
            )}
            {order.estado === "Aprobado" && isAdmin && (
              <StyledButton
                variant="contained"
                color="primary"
                onClick={() => handleCompleteOrder(order.id)}
              >
                Marcar como Completado
              </StyledButton>
            )}

            {expandedOrderId === order.id && (
              <OrderDetailsContainer
                as={motion.div}
                key={`details-${order.id}`}
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                exit={{ opacity: 0, scaleY: 0 }}
                transition={{ duration: 0.3 }}
                style={{ originY: 0, overflow: "hidden" }} // Asegúrate de que se origine desde arriba y de ocultar el overflow
              >
                <OrderSection>
                  <SectionTitle>
                    <FaUser /> Datos del Usuario
                  </SectionTitle>
                  <div>Nombre: {order.nombre}</div>
                  <div>Email: {order.email}</div>
                  <div>Teléfono: {order.telefono}</div>
                </OrderSection>
                <OrderSection>
                  <SectionTitle>
                    <FaBox /> Productos
                  </SectionTitle>
                  <ul>
                    {getOrderDetails(order)?.map((detail: OrderDetail) => (
                      <ListItem key={detail.producto_id}>
                        {detail?.imagen_url ? (
                          <Image
                            src={
                              detail?.imagen_url
                                ? detail.imagen_url.startsWith("http")
                                  ? detail.imagen_url
                                  : `${process.env.REACT_APP_API_URL}${detail.imagen_url}`
                                : "/path_to_default_image.jpg"
                            }
                            alt={`Producto ${detail.nombre}`}
                            width={50}
                            height={50}
                          />
                        ) : (
                          <div>Imagen no disponible</div>
                        )}
                        <div>Producto: {detail.nombre}</div>
                        <div>Cantidad: {detail.cantidad}</div>
                        <div>Precio: {detail.precio}</div>
                      </ListItem>
                    ))}
                  </ul>
                </OrderSection>
                {order.direccion ? (
                  <OrderSection>
                    <SectionTitle>
                      <FaShippingFast /> Información de Envío
                    </SectionTitle>
                    <div>Dirección: {order.direccion}</div>
                    <div>Ciudad: {order.ciudad}</div>
                    <div>Estado: {order.estado}</div>
                    <div>Código Postal: {order.codigo_postal}</div>
                    <div>País: {order.pais}</div>
                  </OrderSection>
                ) : (
                  <OrderSection>
                    <SectionTitle>
                      <FaShippingFast /> Información de Envío
                    </SectionTitle>
                    <div>
                      Buscar en Tienda (Thorne 1145 | Horario De Luenes a
                      Viernes 14hs a 20hs)
                    </div>
                  </OrderSection>
                )}
                {order.comprobante_pago ? (
                  <OrderSection>
                    <SectionTitle>
                      <FaCreditCard /> Comprobante de Pago
                    </SectionTitle>

                    <StyledButton
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        if (order.comprobante_pago) {
                          handleDownload(order.comprobante_pago);
                        }
                      }}
                    >
                      Descargar Comprobante
                    </StyledButton>

                    <StyledButton
                      variant="contained"
                      color="primary"
                      onClick={() => handleReplaceComprobante(order.id)}
                    >
                      Reemplazar Comprobante
                    </StyledButton>

                    {showUploadForOrder === order.id && (
                      <CargarComprobante
                        orderId={order.id.toString()}
                        onUploadSuccess={() => {
                          setUploadMessage((prevMessages) => ({
                            ...prevMessages,
                            [order.id]: "Comprobante cargado con éxito!",
                          }));

                          setTimeout(() => {
                            setUploadMessage((prevMessages) => ({
                              ...prevMessages,
                              [order.id]: "",
                            }));
                          }, 3000);

                          dispatch(fetchUserOrders());
                        }}
                        onUploadError={() => {
                          setUploadMessage((prevMessages) => ({
                            ...prevMessages,
                            [order.id]:
                              "Hubo un error al cargar el comprobante. Por favor, intenta de nuevo (Maximo 10MB).",
                          }));
                        }}
                      />
                    )}
                    {uploadMessage[order.id] && (
                      <div style={successMessageStyle}>
                        {uploadMessage[order.id]}
                      </div>
                    )}
                  </OrderSection>
                ) : order.estado === "Aprobado" ? (
                  <OrderSection>
                    <SectionTitle>
                      <FaCreditCard /> Pago con MercadoPago
                    </SectionTitle>
                    <div>Pago realizado exitosamente con MercadoPago</div>
                  </OrderSection>
                ) : null}
              </OrderDetailsContainer>
            )}
          </StyledOrderContainer>
        ))}
      </AnimatePresence>{" "}
    </div>
  );
};

export default Historial;
