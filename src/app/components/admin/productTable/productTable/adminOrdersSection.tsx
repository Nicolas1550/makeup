import React, { useEffect, useState, useRef } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/store/appHooks";
import {
  fetchOrdersByStatus,
  resetOrders,
  // Otros actions que necesites
} from "../../../../redux/orderSlice/orderSlice";
import {
  SummaryContainer,
  Heading,
  Table,
  TableHead,
  TableBody,
  InputLabel,
  Button,
  ErrorText,
  SummaryDetails,
  SummaryHeading,
  SummaryParagraph,
  InputContainer,
  DateInputContainer,
  ButtonContainer,
} from "./stylesAdminReservation"; // Asegúrate de adaptar los estilos

import { format, isSameYear, parseISO } from "date-fns";
import { es } from "date-fns/locale";

import OrdersLineChart from "./ordersLineChart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
interface AdminOrdersSectionProps {
  onClose: () => void;
}
interface OrderChartData {
  date: string;
  income: number;
  totalOrders: number; // Ahora usando totalOrders en lugar de totalCompletadas
}
interface Order {
  id: number;
  fecha: string;
  total: number;
  nombre: string;
  email: string;
  telefono: string;
  // Agrega cualquier otra propiedad que necesites de la orden
}
const formatDate = (startDateString: string, endDateString: string) => {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);
  const sameYear = isSameYear(startDate, endDate);

  // Si es el mismo año, no repetimos el año en la fecha de inicio.
  const formatStringStart = sameYear ? "d 'de' MMMM" : "d 'de' MMMM 'del' yyyy";
  const formatStringEnd = "d 'de' MMMM 'del' yyyy";

  return {
    formattedStartDate: format(startDate, formatStringStart, { locale: es }),
    formattedEndDate: format(endDate, formatStringEnd, { locale: es }),
  };
};

const calculateChartData = (orders: Order[]): OrderChartData[] => {
  const dataMap = new Map<string, { total: number; count: number }>();

  orders.forEach((order) => {
    console.log("Procesando orden:", order); // Verifica los datos de cada orden
    const date = format(parseISO(order.fecha), "yyyy-MM-dd");
    console.log("Fecha formateada:", date); // Verifica la fecha formateada

    if (!dataMap.has(date)) {
      dataMap.set(date, { total: 0, count: 0 });
    }

    const dayData = dataMap.get(date)!;
    dayData.total += order.total;
    dayData.count += 1;
  });

  const result = Array.from(dataMap, ([date, { total, count }]) => ({
    date,
    income: total,
    totalOrders: count,
  }));

  console.log("Processed Chart Data:", result); // Verifica los datos procesados
  return result;
};
const AdminOrdersSection: React.FC<AdminOrdersSectionProps> = ({}) => {
  const dispatch = useAppDispatch();
  const { orders, error } = useAppSelector((state) => state.order);

  const componentRef = useRef<HTMLDivElement>(null);
  // Estados para las fechas
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [customError, setCustomError] = useState(""); // Nuevo estado para el error personalizado
  const [chartData, setChartData] = useState<OrderChartData[]>([]);
  const [totalIngresos, setTotalIngresos] = useState(0);
  const [totalOrdenesCompletadas, setTotalOrdenesCompletadas] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isDataFetched, setIsDataFetched] = useState(false);

  const handleFetchOrders = () => {
    if (fechaInicio && fechaFin) {
      dispatch(
        fetchOrdersByStatus({
          status: "completado",
          startDate: fechaInicio,
          endDate: fechaFin,
        })
      ).then(() => {
        setIsDataFetched(true); // Actualiza cuando se han obtenido los datos
      });
      setCustomError("");
    } else {
      setCustomError("Selecciona un rango de fechas válido.");
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetOrders());
    };
  }, [dispatch]);
  useEffect(() => {
    let timer: NodeJS.Timeout; // Especifica el tipo de timer
    if (customError) {
      timer = setTimeout(() => {
        setCustomError("");
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [customError]);

  useEffect(() => {
    if (selectedStatus && fechaInicio && fechaFin) {
      dispatch(
        fetchOrdersByStatus({
          status: selectedStatus,
          startDate: fechaInicio,
          endDate: fechaFin,
        })
      );
    }
  }, [selectedStatus, fechaInicio, fechaFin, dispatch]);

  useEffect(() => {
    if (orders && orders.length > 0) {
      const newChartData = calculateChartData(orders);
      console.log("New Chart Data:", newChartData);
      setChartData(newChartData);
    }
  }, [orders]);
  useEffect(() => {
    if (orders && orders.length > 0) {
      console.log("Órdenes actuales:", orders); // Para depurar
      const ordenesCompletadas = orders.filter(
        (order) => order.estado === "Completado"
      );
      console.log("Órdenes Completadas:", ordenesCompletadas); // Para depurar

      const ingresos = ordenesCompletadas.reduce(
        (acc, order) => acc + order.total,
        0
      );
      console.log("Ingresos Calculados:", ingresos); // Para depurar

      setTotalIngresos(ingresos);
      setTotalOrdenesCompletadas(ordenesCompletadas.length);
    }
  }, [orders]);

  useEffect(() => {
    console.log("ChartData updated:", chartData); // Esto mostrará el estado actualizado de chartData
  }, [chartData]);
  useEffect(() => {
    console.log("Orders from Redux after fetch:", orders);
  }, [orders]);

  // Funciones para exportar/imprimir (similar a como lo hiciste en ReservationsSummary)

  return (
    <SummaryContainer ref={componentRef}>
      <Heading>Gestión de Órdenes</Heading>
      <OrdersLineChart data={chartData} />
      <SummaryDetails>
        <SummaryHeading>
          <AttachMoneyIcon />
          Resumen de Órdenes Completadas
          {isDataFetched && fechaInicio && fechaFin && (
            <>
              : del {formatDate(fechaInicio, fechaFin).formattedStartDate} hasta
              el {formatDate(fechaInicio, fechaFin).formattedEndDate}
            </>
          )}
        </SummaryHeading>

        <SummaryParagraph>
          <CheckCircleIcon /> Ingresos Totales: ${totalIngresos}
        </SummaryParagraph>
        <SummaryParagraph>
          <CheckCircleIcon /> Total Órdenes Completadas:{" "}
          {totalOrdenesCompletadas}
        </SummaryParagraph>
      </SummaryDetails>
      <InputContainer>
        <DateInputContainer>
          <InputLabel>
            Fecha de inicio:
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
          </InputLabel>
          <InputLabel>
            Fecha de fin:
            <input
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
            />
          </InputLabel>
        </DateInputContainer>
        <ButtonContainer>
          <Button onClick={handleFetchOrders}>Obtener Órdenes</Button>
        </ButtonContainer>
      </InputContainer>
      {customError && <ErrorText>{customError}</ErrorText>}

      {error && <ErrorText>{error}</ErrorText>}

      <Table>
        <TableHead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Comprobante</th>
          </tr>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.nombre}</td>
              <td>
                {format(parseISO(order.fecha), "d 'de' MMMM 'de' yyyy", {
                  locale: es,
                })}
              </td>
              <td>{order.total}</td>
              <td>
                {order.comprobante_pago ? (
                  <a
                    href={order.comprobante_pago}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Ver Comprobante
                  </a>
                ) : (
                  "Pagado con Mercado Pago"
                )}
              </td>
              {/* Agrega cualquier otro detalle de la orden que desees mostrar */}
            </tr>
          ))}
        </TableBody>
      </Table>
    </SummaryContainer>
  );
};

export default AdminOrdersSection;
