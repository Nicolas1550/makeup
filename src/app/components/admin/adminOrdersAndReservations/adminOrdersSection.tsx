import React, { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store/appHooks";
import {
  fetchOrdersByStatus,
  resetOrders,
} from "../../../redux/orderSlice/orderSlice";
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
} from "./stylesAdminReservation";
import PrintIcon from "@mui/icons-material/Print";

import { format, isSameYear, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import GetAppIcon from "@mui/icons-material/GetApp";

import OrdersLineChart from "./ordersLineChart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
interface AdminOrdersSectionProps {
  onClose: () => void;
}
interface OrderChartData {
  date: string;
  income: number;
  totalOrders: number;
}
interface Order {
  id: number;
  fecha: string;
  total: number;
  nombre: string;
  email: string;
  telefono: string;
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
    const date = format(parseISO(order.fecha), "yyyy-MM-dd");

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
  const summaryRef = useRef<HTMLDivElement>(null); // Referencia para el resumen de órdenes
  const chartRef = useRef<HTMLDivElement>(null); // Referencia para el gráfico
  const ordersTableRef = useRef<HTMLDivElement>(null);

  const handlePrintSummary = useReactToPrint({
    content: () => summaryRef.current,
  });
  const handlePrintOrdersTable = useReactToPrint({
    content: () => ordersTableRef.current,
  });
  const handlePrintFullReport = useReactToPrint({
    content: () => componentRef.current,
  });
  const exportPDF = async (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const canvas = await html2canvas(ref.current, {
        scale: 2, // Aumenta la resolución de la imagen
        useCORS: true, // Intenta cargar imágenes externas si las hay
        scrollY: -window.scrollY, // capturar desde el principio del contenido
      });
      const data = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasAspectRatio = canvas.width / canvas.height;
      const pdfAspectRatio = pdfWidth / pdfHeight;
      let canvasWidth = pdfWidth;
      let canvasHeight = pdfHeight;
      // Si la relación de aspecto del canvas es mayor que la del PDF, ajusta la altura del canvas
      if (canvasAspectRatio > pdfAspectRatio) {
        canvasHeight = pdfWidth / canvasAspectRatio;
      } else {
        // Si la relación de aspecto del PDF es mayor, ajusta la anchura del canvas
        canvasWidth = canvasHeight * canvasAspectRatio;
      }
      // Coloca la imagen centrada en el PDF
      const x = (pdfWidth - canvasWidth) / 2;
      const y = (pdfHeight - canvasHeight) / 2;
      pdf.addImage(data, "PNG", x, y, canvasWidth, canvasHeight);
      pdf.save("reservations-summary.pdf");
    }
  };
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
      setChartData(newChartData);
    }
  }, [orders]);
  useEffect(() => {
    if (orders && orders.length > 0) {
      const ordenesCompletadas = orders.filter(
        (order) => order.estado === "Completado"
      );

      const ingresos = ordenesCompletadas.reduce(
        (acc, order) => acc + order.total,
        0
      );

      setTotalIngresos(ingresos);
      setTotalOrdenesCompletadas(ordenesCompletadas.length);
    }
  }, [orders]);

  useEffect(() => {}, [chartData]);
  useEffect(() => {}, [orders]);

  return (
    <SummaryContainer ref={componentRef}>
      <Heading>Gestión de Órdenes</Heading>
      <Button onClick={handlePrintFullReport}>
        <PrintIcon /> Imprimir Todo el Informe
      </Button>
      <Button onClick={() => exportPDF(componentRef)}>
        <GetAppIcon /> Exportar Informe Completo como PDF
      </Button>
      <div ref={chartRef}>
        <OrdersLineChart data={chartData} />
      </div>
      <div ref={summaryRef}>
        <SummaryDetails>
          <SummaryHeading>
            <AttachMoneyIcon />
            Resumen de Órdenes Completadas
            {isDataFetched && fechaInicio && fechaFin && (
              <>
                : del {formatDate(fechaInicio, fechaFin).formattedStartDate}{" "}
                hasta el {formatDate(fechaInicio, fechaFin).formattedEndDate}
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
        <Button onClick={handlePrintSummary}>Imprimir Resumen</Button>
        <Button onClick={() => exportPDF(summaryRef)}>
          <GetAppIcon /> Exportar Resumen como PDF
        </Button>
      </div>

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
      <div ref={ordersTableRef}>
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
              </tr>
            ))}
          </TableBody>
        </Table>
        <Button onClick={handlePrintOrdersTable}>
          Imprimir Tabla de Órdenes
        </Button>
        <Button onClick={() => exportPDF(ordersTableRef)}>
          <GetAppIcon /> Exportar Tabla como PDF
        </Button>
      </div>
    </SummaryContainer>
  );
};

export default AdminOrdersSection;
