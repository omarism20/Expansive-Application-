
import { useState } from "react";
import Header from "@/components/layout/Header";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Transaction } from "@/types";
import { mockTransactions } from "@/utils/mockData";
import { formatCurrency, formatDate } from "@/utils/helpers";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);

  // Filter transactions for selected date
  const filteredTransactions = transactions.filter(transaction => {
    if (!selectedDate) return false;
    const dateStr = formatDate(selectedDate);
    return transaction.date.startsWith(dateStr.split('T')[0]);
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container py-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold">Transaction Calendar</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardContent className="pt-6">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="mx-auto"
              />
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4">
                {selectedDate ? formatDate(selectedDate) : "Select a date"}
              </h3>
              {filteredTransactions.length > 0 ? (
                <div className="space-y-4">
                  {filteredTransactions.map(transaction => (
                    <div 
                      key={transaction.id} 
                      className="flex justify-between items-center p-3 border rounded-md"
                    >
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">{transaction.category}</p>
                      </div>
                      <p className={`font-medium ${
                        transaction.type === "income" ? "text-green-600" : "text-orange-500"
                      }`}>
                        {transaction.type === "income" ? "+" : "-"}
                        {formatCurrency(transaction.amount)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No transactions on this date
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
