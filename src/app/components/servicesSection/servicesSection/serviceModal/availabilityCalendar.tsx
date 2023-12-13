import React, { useEffect } from "react";
import { Calendar, momentLocalizer, SlotInfo } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarWrapper } from "./styledModalService";

const localizer = momentLocalizer(moment);

type CalendarView = "month" | "week" | "day" | "agenda" | "work_week";

interface CalendarEvent {
  estado?: string;
  id?: number;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
}

interface AvailabilityCalendarProps {
  events: CalendarEvent[];
  isUserAssigned: boolean | null;
  onSelectSlot: (slotInfo: SlotInfo) => void;
  onSelectEvent: (event: CalendarEvent) => void;
  currentView: CalendarView;
  onCurrentViewChange: (view: CalendarView) => void;
  isOpen: boolean;
  onRequestClose: () => void;
}

const messages = {
  allDay: "Todo el día",
  previous: "Anterior",
  next: "Siguiente",
  today: "Hoy",
  month: "Mes",
  week: "Semana",
  day: "Día",
  agenda: "Agenda",
  // ... otros textos que desees personalizar
};

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({
  events,
  isUserAssigned,
  onSelectSlot,
  onSelectEvent,
  currentView,
  onCurrentViewChange,
}) => {
  
  useEffect(() => {
    // Encuentra todos los botones en la barra de herramientas del calendario
    const toolbarButtons = Array.from(
      document.querySelectorAll(".rbc-toolbar button")
    );

    // Filtra y oculta el botón 'Month'
    const monthButton = toolbarButtons.find(
      (button) => button.textContent === "Mes"
    ) as HTMLElement | null;
    if (monthButton) monthButton.style.display = "none";

    // Filtra y oculta el botón 'Agenda'
    const agendaButton = toolbarButtons.find(
      (button) => button.textContent === "Agenda"
    ) as HTMLElement | null;
    if (agendaButton) agendaButton.style.display = "none";
  }, []);

  const minTime = new Date();
  minTime.setHours(8, 0, 0);

  const maxTime = new Date();
  maxTime.setHours(23, 0, 0);

  return (
    <CalendarWrapper>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        view={currentView}
        onView={onCurrentViewChange}
        selectable={isUserAssigned || false}
        onSelectSlot={onSelectSlot}
        onSelectEvent={onSelectEvent}
        messages={messages}
        min={minTime}
        max={maxTime}
      />
    </CalendarWrapper>
  );
};

export default React.memo(AvailabilityCalendar);
