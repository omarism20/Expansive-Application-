
import { useState } from "react";
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
          <CalendarDays className="h-5 w-5" />
          <CardTitle>Transaction Calendar</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
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
            marked: { color: '#8B5CF6', fontWeight: 'bold' }
          }}
        />

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
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
                      className="flex justify-between items-center p-3 rounded-lg border"
                    >
                      <div>
                        <p className="font-medium">{tx.description}</p>
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
