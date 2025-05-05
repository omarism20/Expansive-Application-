
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Transaction } from "@/types";
import { formatCurrency, formatDate } from "@/utils/helpers";
import { CalendarDays, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

  // Calculate totals for the selected date
  const totals = useMemo(() => {
    if (!selectedDate || !selectedDateTransactions.length) return { income: 0, expense: 0 };
    
    return selectedDateTransactions.reduce((acc, tx) => {
      if (tx.type === 'income') {
        acc.income += tx.amount;
      } else {
        acc.expense += tx.amount;
      }
      return acc;
    }, { income: 0, expense: 0 });
  }, [selectedDate, selectedDateTransactions]);

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
      <CardHeader className="bg-gradient-to-r from-finance-purple/20 to-finance-blue/10 rounded-t-lg">
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
          className="rounded-md border border-gray-700"
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
              fontWeight: 'bold'
            }
          }}
          dailyTransactions={dailyTransactionsMap}
        />

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-darkcard text-white border border-gray-700 shadow-xl max-w-md">
            <DialogHeader className="bg-gradient-to-r from-finance-purple/30 to-finance-blue/20 rounded-t-lg p-4 -m-4 mb-0">
              <DialogTitle className="text-lg font-bold text-white flex items-center gap-2">
                <CalendarDays className="h-5 w-5" />
                {selectedDate ? formatDate(selectedDate.toISOString()) : ''}
              </DialogTitle>
              <DialogDescription className="text-gray-200 flex gap-3 mt-2">
                {totals.income > 0 && (
                  <Badge variant="outline" className="bg-green-500/20 text-green-300 border-green-500 flex items-center">
                    <DollarSign className="h-3 w-3 mr-1" /> Income: {formatCurrency(totals.income)}
                  </Badge>
                )}
                {totals.expense > 0 && (
                  <Badge variant="outline" className="bg-red-500/20 text-red-300 border-red-500 flex items-center">
                    <DollarSign className="h-3 w-3 mr-1" /> Expenses: {formatCurrency(totals.expense)}
                  </Badge>
                )}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pt-2">
              {selectedDateTransactions.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No transactions for this date</p>
              ) : (
                <div className="space-y-2">
                  {selectedDateTransactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex justify-between items-center p-3 rounded-lg border border-gray-700 bg-darkbg hover:bg-darkbg/80 transition-colors"
                    >
                      <div>
                        <p className="font-medium">{tx.description || tx.category}</p>
                        <p className="text-sm text-muted-foreground">
                          {tx.category}
                        </p>
                      </div>
                      <p
                        className={`${tx.type === 'expense' ? 'text-red-400' : 'text-green-400'} font-semibold text-lg`}
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
