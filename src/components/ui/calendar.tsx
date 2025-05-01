
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { formatCurrency } from "@/utils/helpers";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  dailyTransactions?: Map<string, { income: number; expense: number; net: number }>;
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  dailyTransactions,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 pointer-events-auto", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-base font-semibold text-white",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-8 w-8 bg-transparent p-0 opacity-70 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-10 font-medium text-[0.9rem]",
        row: "flex w-full mt-2",
        cell: "h-10 w-10 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-10 w-10 p-0 pb-6 font-normal text-[0.95rem] relative aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent/20 text-accent-foreground font-semibold",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        dropdown: "absolute mt-1 bg-darkcard border border-gray-600 rounded shadow-lg p-2 max-h-80 overflow-y-auto z-50 focus:outline-none text-white",
        dropdown_month: "flex justify-center py-2 text-base text-white",
        dropdown_year: "flex justify-center py-2 text-base text-white",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-5 w-5" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-5 w-5" />,
        Day: ({ ...dayProps }) => {
          const date = dayProps.date;
          const dateStr = date.toISOString().split('T')[0];
          const dayData = dailyTransactions?.get(dateStr);
          
          return (
            <div className="flex flex-col items-center">
              <button 
                {...dayProps} 
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "h-10 w-10 p-0 font-normal text-[0.95rem] aria-selected:opacity-100 mb-1"
                )}
              >
                {dayProps.children}
              </button>
              {dayData && (
                <span className={cn(
                  "text-[0.65rem] font-medium absolute bottom-1",
                  dayData.net > 0 ? "text-green-400" : dayData.net < 0 ? "text-red-400" : "text-gray-400"
                )}>
                  {formatCurrency(Math.abs(dayData.net))}
                </span>
              )}
            </div>
          );
        }
      }}
      captionLayout="dropdown-buttons"
      fromYear={2020}
      toYear={2030}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
