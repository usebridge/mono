import { cn } from "@ho/utils";
import { format, formatISO, isToday } from "date-fns";
import type { TZDate } from "@date-fns/tz";

type CalendarGridProps = {
  firstWeek: TZDate[];
  calendarDays: TZDate[];
  currentDate: TZDate;
  selectedDate: TZDate;
  // biome-ignore lint/suspicious/noExplicitAny: false
  // data: Record<string, any>;
  // range: TZDate[];
  // localRange: TZDate[];
  // isDragging: boolean;
  handleMouseDown: (date: TZDate) => void;
  handleMouseEnter: (date: TZDate) => void;
  handleMouseUp: () => void;
};

export function CalendarMonthGrid({
  firstWeek,
  calendarDays,
  currentDate,
  selectedDate,
  // data,
  // range,
  // localRange,
  // isDragging,
  handleMouseDown,
  handleMouseEnter,
  handleMouseUp,
}: CalendarGridProps) {
  return (
    <div className="grid grid-cols-7 gap-px border border-border bg-border">
      {firstWeek.map((day) => (
        <div
          key={day.toString()}
          className="py-4 px-3 bg-background text-xs font-medium text-[#878787] font-mono"
        >
          {format(day, "EEE").toUpperCase()}
        </div>
      ))}
      {calendarDays.map((date, index) => (
        <CalendarDay
          key={index.toString()}
          date={date}
          currentDate={currentDate}
          selectedDate={selectedDate}
          // data={data}
          // range={range}
          // localRange={localRange}
          // isDragging={isDragging}
          handleMouseDown={handleMouseDown}
          handleMouseEnter={handleMouseEnter}
          handleMouseUp={handleMouseUp}
        />
      ))}
    </div>
  );
}

type CalendarDayProps = {
  date: TZDate;
  currentDate: TZDate;
  selectedDate: TZDate;
  // biome-ignore lint/suspicious/noExplicitAny: false
  // data: Record<string, any>;
  // range: TZDate[];
  // localRange: TZDate[];
  // isDragging: boolean;
  handleMouseDown: (date: TZDate) => void;
  handleMouseEnter: (date: TZDate) => void;
  handleMouseUp: () => void;
};

function CalendarDay({
  date,
  currentDate,
  selectedDate,
  // data,
  // range,
  // localRange,
  // isDragging,
  handleMouseDown,
  handleMouseEnter,
  handleMouseUp,
}: CalendarDayProps) {
  const isCurrentMonth = date.getMonth() === currentDate.getMonth();
  const formattedDate = formatISO(date, { representation: "date" });
  const formattedSelectedDate = formatISO(selectedDate, {
    representation: "date",
  });

  return (
    <div
      onMouseDown={() => handleMouseDown(date)}
      onMouseEnter={() => handleMouseEnter(date)}
      onMouseUp={handleMouseUp}
      className={cn(
        "aspect-square md:aspect-[4/2] pt-2 pb-10 px-3 font-mono text-lg relative transition-all duration-100 text-left flex space-x-2 select-none",
        isCurrentMonth && isToday(date)
          ? "bg-[#f0f0f0] dark:bg-[#202020]"
          : "bg-background",
        !isCurrentMonth &&
          "bg-[repeating-linear-gradient(-60deg,#DBDBDB,#DBDBDB_1px,transparent_1px,transparent_5px)] dark:bg-[repeating-linear-gradient(-60deg,#2C2C2C,#2C2C2C_1px,transparent_1px,transparent_5px)]",
        formattedSelectedDate === formattedDate && "ring-1 ring-primary",
        // isInRange(date) && "ring-1 ring-primary bg-opacity-50",
        // isFirstSelectedDate(date) && "ring-1 ring-primary bg-opacity-50",
        // isLastSelectedDate(date) && "ring-1 ring-primary bg-opacity-50",
      )}
    >
      <div>{format(date, "d")}</div>
    </div>
  );
}
