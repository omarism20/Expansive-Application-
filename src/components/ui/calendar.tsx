
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
        caption_label: "text-2xl font-bold text-white uppercase my-4",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-9 w-9 bg-transparent hover:bg-gray-800 p-0 opacity-90 hover:opacity-100 border-gray-700 text-red-500"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex w-full justify-between",
        head_cell:
          "text-muted-foreground w-10 font-medium text-[0.9rem] py-2 rounded-md text-center text-gray-400",
        row: "flex w-full mt-2 py-2 border-t border-gray-800",
        cell: "h-14 w-14 text-center text-base p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-14 w-14 p-0 font-normal text-[1.4rem] rounded-full relative aria-selected:opacity-100 hover:bg-gray-800"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-red-500 text-white hover:bg-red-500 hover:text-white focus:bg-red-500 focus:text-white",
        day_today: "text-white font-bold border border-gray-700",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        dropdown: "absolute mt-1 bg-black border border-gray-700 rounded-lg shadow-lg p-3 max-h-80 overflow-y-auto z-50 focus:outline-none text-white",
        dropdown_month: "flex justify-center py-2 text-lg text-white hover:bg-gray-800 rounded-md cursor-pointer",
        dropdown_year: "flex justify-center py-2 text-lg text-white hover:bg-gray-800 rounded-md cursor-pointer",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-5 w-5 text-red-500" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-5 w-5 text-red-500" />,
        Day: ({ date, ...props }: DayProps & { children?: React.ReactNode }) => {
          const dateStr = date.toISOString().split('T')[0];
          const dayData = dailyTransactions?.get(dateStr);
          
          return (
            <div className="flex flex-col items-center">
              <div className="relative">
                <button 
                  {...props} 
                  className={cn(
                    "h-12 w-12 p-0 flex flex-col items-center justify-center text-[1.2rem] aria-selected:opacity-100 rounded-full",
                    props["aria-selected"] ? "bg-red-500 text-white" : "bg-transparent hover:bg-gray-800 text-white"
                  )}
                >
                  {/* Main day number - large and bold */}
                  <span className="text-[1.4rem] font-medium">
                    {props.children}
                  </span>
                  
                  {/* Small event count below main number */}
                  {dayData && (
                    <span className="text-[0.75rem] text-gray-400 absolute -bottom-5">
                      {dayData.net > 0 ? 
                        dayData.income > 0 ? Math.round(dayData.income/100) : "" : 
                        dayData.expense > 0 ? Math.round(dayData.expense/100) : ""}
                    </span>
                  )}
                </button>
              </div>
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
