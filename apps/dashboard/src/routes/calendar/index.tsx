import { TZDate } from "@date-fns/tz";
import { createFileRoute } from "@tanstack/react-router";
import { add, sub } from "date-fns";
import { useState } from "react";
import { CalendarMonthGrid } from "../../../components/calendar/calendar-month-grid";
import { useCalendarMonthDates } from "../../../hooks/use-calendar-month-dates";
import { useHotkeys } from "../../../hooks/use-hotkeys";

export const Route = createFileRoute("/calendar/")({
  component: RouteComponent,
});

function RouteComponent() {
  // Current date also determines what month we display, so it may not always be "todays" date
  const [currentDate, setCurrentDate] = useState<TZDate>(new TZDate());
  const [selectedDate, setSelectedDate] = useState<TZDate>(currentDate);
  // TODO: Implement range selection functionality with handle fns below
  const [selectedDateRange, setSelectedDateRange] = useState<[TZDate, TZDate]>([
    currentDate,
    currentDate,
  ]);
  const calendarDates = useCalendarMonthDates(currentDate, true);

  useHotkeys("ArrowLeft", () => {
    setCurrentDate((prevDate) => {
      const newDate = sub(prevDate, { months: 1 });
      setSelectedDate(newDate);
      return newDate;
    });
  });

  useHotkeys("ArrowRight", () => {
    setCurrentDate((prevDate) => {
      const newDate = add(prevDate, { months: 1 });
      setSelectedDate(newDate);
      return newDate;
    });
  });

  return (
    <CalendarMonthGrid
      currentDate={currentDate}
      selectedDate={selectedDate}
      handleMouseUp={() => {}}
      handleMouseDown={(mouseDownDate) => {
        setSelectedDate(mouseDownDate);
      }}
      handleMouseEnter={() => {}}
      {...calendarDates}
    />
  );
}
