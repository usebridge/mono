import { createFileRoute } from "@tanstack/react-router";
import { CalendarGrid } from "../../../components/calendar/calendar";
import { TZDate } from "@date-fns/tz";
import { useCalendarDates } from "../../../hooks/use-calendar-dates";
import { useState } from "react";
import { useHotkeys } from "../../../hooks/use-hotkeys";
import { add, sub } from "date-fns";

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
  const calendarDates = useCalendarDates(currentDate, true);

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
    <CalendarGrid
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
