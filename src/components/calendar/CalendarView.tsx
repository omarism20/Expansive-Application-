
import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";
import { formatCurrency } from "@/utils/helpers";

interface GoalProgress {
  title: string;
  total: number;
  current: number;
  target: number;
}

interface CalendarViewProps {
  goals: GoalProgress[];
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
  transactions: { date: string; category: string; amount: number; type?: string }[];
}

export function CalendarView({
  goals,
  selectedDate,
  onSelectDate,
  transactions
}: CalendarViewProps) {
  const formattedDate = selectedDate ? format(selectedDate, 'MMMM d, yyyy') : '';

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
      
      <Card className="mb-6 bg-darkcard border-gray-700 text-white">
        <CardHeader className="pb-2">
          <div className="flex items-center space-x-2">
            <CalendarDays className="h-5 w-5" />
            <CardTitle>Calendar</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onSelectDate}
            className="rounded-md border-gray-700 text-white"
            showOutsideDays={true}
            captionLayout="dropdown-buttons"
            fromYear={2020}
            toYear={2030}
            modifiers={{
              marked: (date) => {
                const dateStr = date.toISOString().split('T')[0];
                return transactions.some(tx => tx.date === dateStr);
              }
            }}
            modifiersStyles={{
              marked: { color: '#8B5CF6', fontWeight: 'bold' }
            }}
          />
        </CardContent>
      </Card>
      
      {transactions.length > 0 && (
        <div className="card-dark">
          <h3 className="font-medium mb-3">{formattedDate}</h3>
          {transactions.map((tx, index) => (
            <div key={index} className="flex justify-between items-center mb-2">
              <span>{tx.category}</span>
              <span className={tx.type === 'expense' ? 'text-red-400' : 'text-green-400'}>
                {tx.type === 'expense' ? '-' : '+'}{formatCurrency(tx.amount)}
              </span>
            </div>
          ))}
        </div>
      )}
      
      {transactions.length === 0 && selectedDate && (
        <div className="card-dark text-center py-4">
          <p className="text-gray-400">No transactions for {formattedDate}</p>
        </div>
      )}
    </div>
  );
}
