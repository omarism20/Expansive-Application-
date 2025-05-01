
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, CreditCard } from "lucide-react";
import { formatCurrency } from "@/utils/helpers";
import { Badge } from "@/components/ui/badge";

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

  // Calculate total income and expenses for the selected date
  const selectedTransactions = transactions || [];
  const totalIncome = selectedTransactions
    .filter(tx => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0);
  
  const totalExpenses = selectedTransactions
    .filter(tx => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <div className="p-4 max-w-md mx-auto pb-24 space-y-6">
      {goals.length > 0 && (
        <Card className="bg-darkcard border-gray-700 shadow-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-finance-purple/20 to-finance-blue/10 pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-finance-purple" />
              Saving Goal
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            {goals.map((goal, index) => (
              <div key={index} className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-lg">{goal.title}</h3>
                  <span className="text-finance-purple font-bold">{formatCurrency(goal.total)}</span>
                </div>
                
                <div className="w-full bg-gray-700 h-3 rounded-full">
                  <div 
                    className="bg-finance-purple h-3 rounded-full transition-all duration-500 ease-in-out"
                    style={{ width: `${Math.min(100, (goal.current / goal.target) * 100)}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-gray-300">Current: {formatCurrency(goal.current)}</span>
                  <span className="text-gray-300">Remaining: {formatCurrency(goal.target - goal.current)}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
      
      <Card className="mb-4 bg-darkcard border-gray-700 shadow-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-finance-purple/20 to-finance-blue/10 pb-2">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-finance-purple" />
            <CardTitle className="text-lg">Financial Calendar</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onSelectDate}
            className="rounded-md text-white"
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
              marked: { 
                color: 'white',
                backgroundColor: '#8B5CF6',
                borderRadius: '50%',
              }
            }}
          />
        </CardContent>
      </Card>
      
      {transactions.length > 0 && (
        <Card className="bg-darkcard border-gray-700 shadow-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-finance-purple/20 to-finance-blue/10">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{formattedDate}</CardTitle>
              <div className="flex gap-2">
                {totalIncome > 0 && (
                  <Badge className="bg-green-500 hover:bg-green-600">
                    Income: {formatCurrency(totalIncome)}
                  </Badge>
                )}
                {totalExpenses > 0 && (
                  <Badge className="bg-red-500 hover:bg-red-600">
                    Expenses: {formatCurrency(totalExpenses)}
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="divide-y divide-gray-700">
            {transactions.map((tx, index) => (
              <div key={index} className="flex justify-between items-center py-3 first:pt-2">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${tx.type === 'expense' ? 'bg-red-400' : 'bg-green-400'}`}></div>
                  <span className="text-base">{tx.category}</span>
                </div>
                <span className={`font-medium text-base ${tx.type === 'expense' ? 'text-red-400' : 'text-green-400'}`}>
                  {tx.type === 'expense' ? '-' : '+'}{formatCurrency(tx.amount)}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
      
      {transactions.length === 0 && selectedDate && (
        <Card className="bg-darkcard border-gray-700 shadow-lg overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg">{formattedDate}</CardTitle>
          </CardHeader>
          <CardContent className="text-center py-8">
            <p className="text-gray-300 text-base">No transactions for this date</p>
            <p className="text-sm text-gray-400 mt-2">Select a date with transactions to view details</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
