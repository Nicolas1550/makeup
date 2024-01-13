// ReservationsSummary.jsx
import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store/appHooks";
import {
  clearError,
  fetchReservationsSummary,
  resetReservationsSummary,
} from "../../../redux/serviceSlice/servicesSlice";
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
  CloseButton,
  InputContainer,
  DateInputContainer,
  ButtonContainer,
} from "./stylesAdminReservation";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import { format, isSameYear, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import PrintIcon from "@mui/icons-material/Print";
import GetAppIcon from "@mui/icons-material/GetApp";
import LineChart from "../productTable/productTable/grafico";
interface ReservationsSummaryProps {
  onClose: () => void;
}
interface Reservation {
  fecha_reserva: string;
  precio: number;
  estado: string;
  id: number;
  servicio_nombre: string;
}
interface LineChartData {
  date: string;
  income: number;
  totalCompletadas: number;
  totalPendientes: number;
}

const ReservationsSummary: React.FC<ReservationsSummaryProps> = ({
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const summaryRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(null);
  const pendingRef = useRef(null);
  const componentRef = useRef<HTMLDivElement>(null);
  const { reservationsSummary, loading, error } = useAppSelector(
    (state) => state.services
  );
  const totalIngresosPC =
    (reservationsSummary?.totalIngresos || 0) +
    (reservationsSummary?.totalIngresosPendientes || 0);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [isSummaryFetched, setIsSummaryFetched] = useState(false);
  const [showError, setShowError] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const servicesList = useAppSelector((state) => state.services.services);
  const [filteredData, setFilteredData] = useState<LineChartData[]>([]);
  const completedReservations = useMemo(
    () => reservationsSummary?.detallesCompletadas ?? [],
    [reservationsSummary]
  );
  const pendingReservations = useMemo(
    () => reservationsSummary?.detallesPendientes ?? [],
    [reservationsSummary]
  );

  const resetState = useCallback(() => {
    setFechaInicio("");
    setFechaFin("");
    setIsSummaryFetched(false);
    dispatch(resetReservationsSummary());
  }, [dispatch]);
  // Funciones de exportación a PDF para cada sección
  const exportCompletedPDF = () => exportPDF(completedRef);
  const exportPendingPDF = () => exportPDF(pendingRef);
  // Función de impresión para una referencia dada
  const handlePrint = useReactToPrint({
    content: () => summaryRef.current,
  });
  // Función para imprimir todo el contenido
  const printAll = useReactToPrint({
    content: () => componentRef.current,
  });
  const printCompleted = useReactToPrint({
    content: () => completedRef.current,
  });
  const printPending = useReactToPrint({
    content: () => pendingRef.current,
  });
  // Función para exportar una sección como PDF
  const exportPDF = async (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const canvas = await html2canvas(ref.current, {
        scale: 2,
        useCORS: true,
        scrollY: -window.scrollY,
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
  const handleClose = () => {
    resetState();
    onClose();
  };
  const handleFetchReservations = async () => {
    const actionResult = await dispatch(
      fetchReservationsSummary({ fechaInicio, fechaFin })
    );
    if (fetchReservationsSummary.fulfilled.match(actionResult)) {
      setIsSummaryFetched(true);
    }
  };
  const formatDate = (startDateString: string, endDateString: string) => {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);
    const sameYear = isSameYear(startDate, endDate);
    // Si es el mismo año, no repetimos el año en la fecha de inicio.
    const formatStringStart = sameYear
      ? "d 'de' MMMM"
      : "d 'de' MMMM 'del' yyyy";
    const formatStringEnd = "d 'de' MMMM 'del' yyyy";
    return {
      formattedStartDate: format(startDate, formatStringStart, { locale: es }),
      formattedEndDate: format(endDate, formatStringEnd, { locale: es }),
    };
  };
  const calculateDailyIncomes = useCallback(
    (reservations: Reservation[]): LineChartData[] => {
      const incomesByDate: Record<string, LineChartData> = {};

      reservations.forEach((reservation) => {});
      // Filtrar las reservas basándose en el servicio seleccionado
      const filteredReservations = reservations.filter((reservation) => {
        return (
          selectedService === "" ||
          reservation.servicio_nombre === selectedService
        );
      });
      filteredReservations.forEach((reservation) => {
        const date = reservation.fecha_reserva.split("T")[0];
        if (!incomesByDate[date]) {
          incomesByDate[date] = {
            date,
            income: 0,
            totalCompletadas: 0,
            totalPendientes: 0,
          };
        }
        incomesByDate[date].income += reservation.precio;
        if (reservation.estado === "completado") {
          incomesByDate[date].totalCompletadas += 1;
        } else if (reservation.estado === "pendiente") {
          incomesByDate[date].totalPendientes += 1;
        }
      });
      // Registrar los datos finales que se van a devolver
      return Object.values(incomesByDate);
    },
    [selectedService]
  );

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (error) {
      setShowError(true);
      timer = setTimeout(() => {
        setShowError(false);
        dispatch(clearError()); // Despacha la acción para restablecer el error después de ocultar el mensaje
      }, 3000);
    }
    // Función de limpieza que se ejecuta cuando el componente se desmonte o el error cambie
    return () => clearTimeout(timer);
  }, [error, dispatch]);
  React.useEffect(() => {
    return () => {
      resetState();
    };
  }, [resetState]);

  useEffect(() => {
    const newData = calculateDailyIncomes([
      ...completedReservations,
      ...pendingReservations,
    ]);
    setFilteredData(newData);
  }, [
    selectedService,
    completedReservations,
    pendingReservations,
    calculateDailyIncomes,
  ]);

  return (
    <SummaryContainer ref={componentRef}>
      <Heading>Gestion de reservas</Heading>
      <Button onClick={printAll}>
        <PrintIcon /> Imprimir Todo
      </Button>
      <Button onClick={() => exportPDF(componentRef)}>
        <GetAppIcon /> Exportar todo como PDF
      </Button>
      <select
        value={selectedService}
        onChange={(e) => {
          setSelectedService(e.target.value);
        }}
      >
        <option value="">Todos los servicios</option>
        {servicesList.map((service) => (
          <option key={service.id} value={service.title}>
            {service.title}
          </option>
        ))}
      </select>
      <LineChart data={filteredData} />

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
          <Button onClick={handleFetchReservations} disabled={loading}>
            {loading ? "Cargando..." : "Obtener Resumen de Reservas"}
          </Button>
        </ButtonContainer>
      </InputContainer>
      <CloseButton onClick={handleClose}>Cerrar</CloseButton>

      {showError && error && <ErrorText>{error}</ErrorText>}

      {reservationsSummary && (
        <>
          <SummaryDetails ref={summaryRef}>
            <SummaryHeading>
              <AttachMoneyIcon />
              Resumen
              {isSummaryFetched && fechaInicio && fechaFin ? (
                <>
                  : del {formatDate(fechaInicio, fechaFin).formattedStartDate}{" "}
                  hasta el {formatDate(fechaInicio, fechaFin).formattedEndDate}
                </>
              ) : (
                ""
              )}
            </SummaryHeading>
            <SummaryParagraph>
              <AttachMoneyIcon /> Total ingresos Reservas(Pen.. y Com..):{"$ "}
              {totalIngresosPC}
            </SummaryParagraph>
            <SummaryParagraph>
              <CheckCircleIcon /> Ingresos de reservas completadas:{"$ "}
              {reservationsSummary?.totalIngresos}
            </SummaryParagraph>
            <SummaryParagraph>
              <CheckCircleIcon /> Total reservas completadas:{"$ "}
              {reservationsSummary?.totalReservasCompletadas}
            </SummaryParagraph>
            <SummaryParagraph>
              <PendingActionsIcon /> Total ingresos pendientes:{"$ "}
              {reservationsSummary?.totalIngresosPendientes}
            </SummaryParagraph>
            <SummaryParagraph>
              <EventBusyIcon /> Total reservas pendientes:{"$ "}
              {reservationsSummary?.totalReservasPendientes}
            </SummaryParagraph>
            <Button onClick={handlePrint}>
              <PrintIcon /> Imprimir Resumen
            </Button>
            <Button onClick={() => exportPDF(summaryRef)}>
              <GetAppIcon /> Exportar Resumen como PDF
            </Button>
          </SummaryDetails>
          <div ref={completedRef}>
            <SummaryHeading>Detalles de Reservas Completadas</SummaryHeading>
            <Table>
              <TableHead>
                <tr>
                  <th>ID</th>
                  <th>Usuario</th>
                  <th>Fecha Reserva</th>
                  <th>Precio</th>
                  <th>Servicio</th>
                  <th>Comprobante</th>
                </tr>
              </TableHead>
              <TableBody>
                {completedReservations.map((reserva) => (
                  <tr key={reserva.id}>
                    <td>{reserva.id}</td>
                    <td>{reserva.usuario_nombre}</td>
                    <td>
                      {format(
                        parseISO(reserva.fecha_reserva),
                        "d 'de' MMMM 'de' yyyy",
                        { locale: es }
                      )}
                    </td>
                    <td>{`$${reserva.precio}`}</td>
                    <td>{reserva.servicio_nombre}</td>
                    <td>
                      {reserva.comprobante_path ? (
                        <a
                          href={reserva.comprobante_path}
                          target="_blank"
                          rel="noopener noreferrer"
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
            <Button onClick={printCompleted}>
              <PrintIcon /> Imprimir Reservas Completadas
            </Button>
            <Button onClick={exportCompletedPDF}>
              <GetAppIcon /> Exportar Reservas Completadas como PDF
            </Button>
          </div>
          <div ref={pendingRef}>
            <SummaryHeading>Detalles de Reservas Pendientes</SummaryHeading>

            <Table>
              <TableHead>
                <tr>
                  <th>ID</th>
                  <th>Usuario</th>
                  <th>Fecha Reserva</th>
                  <th>Precio</th>
                  <th>Servicio</th>
                  <th>Comprobante</th>
                </tr>
              </TableHead>
              <TableBody>
                {pendingReservations.map((reserva) => (
                  <tr key={reserva.id}>
                    <td>{reserva.id}</td>
                    <td>{reserva.usuario_nombre}</td>
                    <td>
                      {format(
                        parseISO(reserva.fecha_reserva),
                        "d 'de' MMMM 'de' yyyy",
                        { locale: es }
                      )}
                    </td>{" "}
                    <td>{reserva.precio}</td>
                    <td>{reserva.servicio_nombre}</td>
                    <td>
                      {reserva.comprobante_path ? (
                        <a
                          href={reserva.comprobante_path}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Ver Comprobante
                        </a>
                      ) : (
                        "No disponible"
                      )}
                    </td>
                  </tr>
                ))}
              </TableBody>
            </Table>
            <Button onClick={printPending}>
              <PrintIcon /> Imprimir Reservas Pendientes
            </Button>
            <Button onClick={exportPendingPDF}>
              <GetAppIcon /> Exportar Reservas Pendientes como PDF
            </Button>
          </div>
        </>
      )}
    </SummaryContainer>
  );
};

export default ReservationsSummary;
