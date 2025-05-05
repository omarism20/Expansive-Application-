
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, CreditCard, Goal, DollarSign, BarChart, ChevronLeft } from "lucide-react";
import { formatCurrency } from "@/utils/helpers";
import { Badge } from "@/components/ui/badge";
import { useMemo } from "react";
import { Link } from "react-router-dom";

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

  return (
    <div className="pb-24 space-y-6">
      <div className="mb-4 p-4 flex items-center">
        <Link to="/" className="mr-auto">
          <ChevronLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold mx-auto">{selectedDate ? format(selectedDate, 'yyyy') : new Date().getFullYear()}</h1>
        <div className="ml-auto w-6"></div> {/* Empty div for alignment */}
      </div>
      
      <Card className="mb-4 bg-card shadow-md overflow-hidden">
        <CardContent className="pt-4 pb-0">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onSelectDate}
            className="rounded-md"
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
          />
        </CardContent>
      </Card>
      
      {/* Display transactions for selected date */}
      {selectedTransactions.length > 0 && (
        <Card className="bg-card shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart className="h-5 w-5" />
                <span>{formattedDate}</span>
              </CardTitle>
              <div className="flex gap-2">
                {totalIncome > 0 && (
                  <Badge className="bg-green-600 hover:bg-green-700">
                    <DollarSign className="h-3 w-3 mr-1" /> {formatCurrency(totalIncome)}
                  </Badge>
                )}
                {totalExpenses > 0 && (
                  <Badge className="bg-red-500 hover:bg-red-600">
                    <DollarSign className="h-3 w-3 mr-1" /> {formatCurrency(totalExpenses)}
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="divide-y">
            {selectedTransactions.map((tx, index) => (
              <div key={index} className="flex justify-between items-center py-3 hover:bg-secondary/10 px-2 rounded-md transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${tx.type === 'expense' ? 'bg-red-400' : 'bg-green-400'} shadow-lg`}></div>
                  <span className="text-base font-medium">{tx.category}</span>
                </div>
                <span className={`font-semibold text-base ${tx.type === 'expense' ? 'text-red-400' : 'text-green-400'}`}>
                  {tx.type === 'expense' ? '-' : '+'}{formatCurrency(tx.amount)}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
      
      {/* Display goals for selected date if any */}
      {goalsForSelectedDate.length > 0 && (
        <Card className="bg-card shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Goal className="h-5 w-5" />
              Goals Due on {formattedDate}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            {goalsForSelectedDate.map((goal, index) => (
              <div key={index} className="space-y-3 mb-4 bg-secondary/10 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-lg">{goal.title}</h3>
                  <span className="text-green-400 font-bold">{formatCurrency(goal.total)}</span>
                </div>
                
                <div className="w-full bg-secondary h-3 rounded-full">
                  <div 
                    className="bg-green-600 h-3 rounded-full transition-all duration-500 ease-in-out"
                    style={{ width: `${Math.min(100, (goal.current / goal.target) * 100)}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-muted-foreground">Current: {formatCurrency(goal.current)}</span>
                  <span className="text-muted-foreground">Remaining: {formatCurrency(goal.target - goal.current)}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
      
      {/* Show message if no transactions for selected date */}
      {selectedTransactions.length === 0 && selectedDate && goalsForSelectedDate.length === 0 && (
        <Card className="bg-card shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">{formattedDate}</CardTitle>
          </CardHeader>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground text-base">No transactions or goals for this date</p>
            <p className="text-sm text-muted-foreground/70 mt-2">Select a date with transactions or goals to view details</p>
          </CardContent>
        </Card>
      )}
      
      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t flex justify-around p-4">
        <button className="text-primary flex flex-col items-center">
          <span>Today</span>
        </button>
        <button className="text-primary flex flex-col items-center">
          <span>Calendars</span>
        </button>
        <button className="text-primary flex flex-col items-center">
          <span>Inbox</span>
        </button>
      </div>
    </div>
  );
}
