
import { ChevronRight } from "lucide-react";
import { formatCurrency } from "@/utils/helpers";

interface GoalProgress {
  title: string;
  total: number;
  current: number;
  target: number;
}

interface CalendarDay {
  day: number;
  isCurrentMonth: boolean;
  hasTransaction: boolean;
}

interface ExpansiveCalendarProps {
  goals: GoalProgress[];
  currentMonth: string;
  currentYear: number;
  days: CalendarDay[][];
  transactions: { date: string; category: string; amount: number }[];
  onSelectDay: (day: number) => void;
}

export function ExpansiveCalendar({
  goals,
  currentMonth,
  currentYear,
  days,
  transactions,
  onSelectDay
}: ExpansiveCalendarProps) {
  return (
    <div className="p-4 max-w-md mx-auto pb-24">
      {goals.map((goal, index) => (
        <div key={index} className="card-dark mb-6">
          <h3 className="font-medium mb-2">{goal.title}</h3>
          <p className="text-gray-400">${goal.total}</p>
          
          <div className="w-full bg-gray-700 h-2 rounded-full mt-3">
            <div 
              className="bg-purple-500 h-2 rounded-full"
              style={{ width: `${(goal.current / goal.target) * 100}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between mt-2">
            <span className="text-sm text-gray-400">${goal.current}</span>
            <span className="text-sm text-gray-400">${goal.target - goal.current}</span>
          </div>
        </div>
      ))}
      
      <div className="card-dark mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">{currentMonth} {currentYear}</h3>
          <ChevronRight size={20} className="text-gray-500" />
        </div>
        
        <div className="grid grid-cols-7 text-center text-xs mb-2">
          <span>S</span>
          <span>M</span>
          <span>T</span>
          <span>W</span>
          <span>T</span>
          <span>F</span>
          <span>S</span>
        </div>
        
        {days.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 text-center mb-2">
            {week.map((day, dayIndex) => (
              <button 
                key={dayIndex}
                className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm ${
                  !day.isCurrentMonth ? "text-gray-600" : 
                  day.hasTransaction ? "bg-purple-600" : ""
                }`}
                onClick={() => onSelectDay(day.day)}
                disabled={!day.isCurrentMonth}
              >
                {day.day}
              </button>
            ))}
          </div>
        ))}
      </div>
      
      {transactions.length > 0 && (
        <div className="card-dark">
          <h3 className="font-medium mb-3">April 25, 2024</h3>
          {transactions.map((tx, index) => (
            <div key={index} className="flex justify-between items-center mb-2">
              <span>{tx.category}</span>
              <span>${tx.amount}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
