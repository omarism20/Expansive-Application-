
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { useMemo } from "react";
import { CalendarHeader } from "./CalendarHeader";
import { GoalsCard } from "./GoalsCard";
import { TransactionsCard } from "./TransactionsCard";
import { EmptyStateCard } from "./EmptyStateCard";
import { CalendarNav } from "./CalendarNav";

interface GoalProgress {
  title: string;
  total: number;
  current: number;
  target: number;
  deadline?: string;
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
  
  // Get the string representation of the selected date
  const selectedDateStr = selectedDate ? selectedDate.toISOString().split('T')[0] : '';

  // Filter transactions for the selected date
  const selectedTransactions = transactions.filter(tx => tx.date === selectedDateStr) || [];
  
  // Calculate total income and expenses for the selected date
  const totalIncome = selectedTransactions
    .filter(tx => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0);
  
  const totalExpenses = selectedTransactions
    .filter(tx => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0);

  // Filter goals for the selected date
  const goalsForSelectedDate = goals.filter(goal => goal.deadline === selectedDateStr);

  // Prepare daily transaction data to display on calendar date cells
  const dailyTransactionsMap = useMemo(() => {
    const map = new Map();
    
    transactions.forEach(tx => {
      if (!map.has(tx.date)) {
        map.set(tx.date, { income: 0, expense: 0, net: 0 });
      }
      
      const dayData = map.get(tx.date);
      if (tx.type === 'income') {
        dayData.income += tx.amount;
      } else {
        dayData.expense += tx.amount;
      }
      
      dayData.net = dayData.income - dayData.expense;
      map.set(tx.date, dayData);
    });
    
    return map;
  }, [transactions]);
  
  // Prepare daily goals data to display on calendar
  const dailyGoalsMap = useMemo(() => {
    const map = new Map();
    
    goals.forEach(goal => {
      if (goal.deadline) {
        if (!map.has(goal.deadline)) {
          map.set(goal.deadline, { count: 0 });
        }
        
        const dayData = map.get(goal.deadline);
        dayData.count += 1;
        map.set(goal.deadline, dayData);
      }
    });
    
    return map;
  }, [goals]);

  const hasDataForSelectedDate = selectedTransactions.length > 0 || goalsForSelectedDate.length > 0;

  return (
    <div className="pb-24 space-y-6">
      <CalendarHeader selectedDate={selectedDate} />
      
      <Card className="mb-4 bg-background shadow-md overflow-hidden">
        <CardContent className="pt-6">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onSelectDate}
            className="rounded-md border-none"
            showOutsideDays={true}
            captionLayout="dropdown-buttons"
            fromYear={2020}
            toYear={2030}
            modifiers={{
              marked: (date) => {
                const dateStr = date.toISOString().split('T')[0];
                const hasTransaction = transactions.some(tx => tx.date === dateStr);
                const hasGoal = goals.some(goal => goal.deadline === dateStr);
                return hasTransaction || hasGoal;
              }
            }}
            dailyTransactions={dailyTransactionsMap}
            dailyGoals={dailyGoalsMap}
          />
        </CardContent>
      </Card>
      
      {/* Display goals for selected date if any */}
      <GoalsCard 
        goals={goalsForSelectedDate}
        formattedDate={formattedDate}
      />
      
      {/* Display transactions for selected date */}
      <TransactionsCard 
        transactions={selectedTransactions}
        formattedDate={formattedDate}
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
      />
      
      {/* Show message if no transactions or goals for selected date */}
      {!hasDataForSelectedDate && selectedDate && (
        <EmptyStateCard formattedDate={formattedDate} />
      )}
      
      {/* Bottom navigation */}
      <CalendarNav />
    </div>
  );
}
