
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, DayProps } from "react-day-picker";
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
        caption_label: "text-lg font-semibold text-white",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-9 w-9 bg-darkcard hover:bg-darkbg p-0 opacity-90 hover:opacity-100 border-gray-600"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-10 font-medium text-[0.9rem] py-2",
        row: "flex w-full mt-2",
        cell: "h-14 w-14 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-12 w-12 p-0 pb-6 font-normal text-[1.1rem] relative aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent/30 text-accent-foreground font-bold",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        dropdown: "absolute mt-1 bg-darkcard border border-gray-600 rounded-lg shadow-lg p-3 max-h-80 overflow-y-auto z-50 focus:outline-none text-white",
        dropdown_month: "flex justify-center py-2 text-lg text-white hover:bg-darkbg/70 rounded-md cursor-pointer",
        dropdown_year: "flex justify-center py-2 text-lg text-white hover:bg-darkbg/70 rounded-md cursor-pointer",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-5 w-5" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-5 w-5" />,
        Day: ({ date, ...props }: DayProps & { children?: React.ReactNode }) => {
          const dateStr = date.toISOString().split('T')[0];
          const dayData = dailyTransactions?.get(dateStr);
          
          return (
            <div className="flex flex-col items-center">
              <button 
                {...props} 
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "h-11 w-11 p-0 font-semibold text-[1.15rem] aria-selected:opacity-100 mb-1.5 border-2 border-transparent hover:border-gray-400/50 bg-darkcard/70 shadow-md rounded-lg",
                  props["aria-selected"] && "border-2 border-finance-purple bg-finance-purple/20"
                )}
              >
                {props.children}
              </button>
              {dayData && (
                <div className={cn(
                  "px-2 py-1 rounded-md text-center min-w-[58px] absolute -bottom-1 shadow-lg transition-all duration-200 ease-in-out scale-100 hover:scale-105",
                  dayData.net > 0 
                    ? "bg-green-500/80 text-white border border-green-400" 
                    : dayData.net < 0 
                      ? "bg-red-500/80 text-white border border-red-400" 
                      : "bg-gray-500/80 text-white border border-gray-400"
                )}>
                  <span className="text-[0.95rem] font-extrabold block">
                    {formatCurrency(Math.abs(dayData.net))}
                  </span>
                </div>
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
