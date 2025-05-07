
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, DayProps } from "react-day-picker";
import { formatCurrency } from "@/utils/helpers";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  dailyTransactions?: Map<string, { income: number; expense: number; net: number }>;
  dailyGoals?: Map<string, { count: number }>;
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  dailyTransactions,
  dailyGoals,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4 w-full",
        caption: "flex justify-center pt-1 relative items-center px-10",
        caption_label: "text-base font-medium text-purple-700",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-8 w-8 bg-transparent p-0 opacity-80 hover:opacity-100 border-purple-200"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-10 font-medium text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "relative h-12 w-10 text-center text-sm p-0 [&:has([aria-selected])]:bg-accent/20 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-10 w-10 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-purple-500 text-white hover:bg-purple-600 hover:text-white focus:bg-purple-600 focus:text-white",
        day_today: "bg-accent/50 text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent/50 aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
        Day: ({ date, ...dayProps }: DayProps) => {
          const dateStr = date.toISOString().split('T')[0];
          const dayData = dailyTransactions?.get(dateStr);
          const goalData = dailyGoals?.get(dateStr);
          const hasGoal = goalData && goalData.count > 0;
          
          return (
            <div className="relative flex flex-col items-center">
              <button 
                {...dayProps} 
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "h-10 w-10 p-0 font-normal aria-selected:opacity-100",
                  dayProps["aria-selected"] ? "bg-purple-500 text-white hover:bg-purple-600 hover:text-white focus:bg-purple-600 focus:text-white" : "",
                  hasGoal ? "ring-2 ring-orange-300" : ""
                )}
              >
                <span className="text-md font-medium">
                  {date.getDate()}
                </span>
              </button>
              
              {dayData && (
                <span className={`text-xs mt-1 absolute -bottom-4 font-medium ${dayData.net >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {dayData.net >= 0 ? 
                    <span>+{Math.abs(Math.round(dayData.income/100))}</span> : 
                    <span>-{Math.abs(Math.round(dayData.expense/100))}</span>}
                </span>
              )}
              
              {hasGoal && (
                <div className="absolute top-0 right-0 w-2 h-2 bg-orange-400 rounded-full"></div>
              )}
            </div>
          );
        }
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
