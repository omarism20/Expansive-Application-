
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Transaction } from "@/types";
import { formatCurrency, formatDate } from "@/utils/helpers";
import { CalendarDays } from "lucide-react";

interface TransactionCalendarProps {
  transactions: Transaction[];
}

export function TransactionCalendar({ transactions }: TransactionCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedDateTransactions, setSelectedDateTransactions] = useState<Transaction[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const handleSelect = (date: Date | undefined) => {
    if (!date) return;
    
    const selectedDateStr = date.toISOString().split('T')[0];
    const filteredTransactions = transactions.filter(tx => tx.date === selectedDateStr);
    
    setSelectedDate(date);
    setSelectedDateTransactions(filteredTransactions);
    setIsDialogOpen(true);
  };

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <CalendarDays className="h-5 w-5 text-finance-purple" />
          <CardTitle>Transaction Calendar</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="bg-gradient-to-b from-darkcard/20 to-darkcard/10 p-4 rounded-b-lg">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          className="rounded-md border"
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
              color: '#fff',
              backgroundColor: '#8B5CF6',
              fontWeight: 'bold'
            }
          }}
          dailyTransactions={dailyTransactionsMap}
        />

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-darkcard text-white border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-lg text-white">
                Transactions for {selectedDate ? formatDate(selectedDate.toISOString()) : ''}
              </DialogTitle>
              <DialogDescription>
                View all transactions for this date
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {selectedDateTransactions.length === 0 ? (
                <p className="text-muted-foreground">No transactions for this date</p>
              ) : (
                <div className="space-y-3">
                  {selectedDateTransactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex justify-between items-center p-3 rounded-lg border border-gray-700 bg-darkbg"
                    >
                      <div>
                        <p className="font-medium">{tx.description || tx.category}</p>
                        <p className="text-sm text-muted-foreground">
                          {tx.category}
                        </p>
                      </div>
                      <p
                        className={tx.type === 'expense' ? 'text-red-500' : 'text-green-500'}
                      >
                        {tx.type === 'expense' ? '-' : '+'}
                        {formatCurrency(tx.amount)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
