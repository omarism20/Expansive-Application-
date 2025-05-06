
import { useState, useEffect } from "react";
import { getTransactions, getSavingGoals } from "@/utils/storage";
import { CalendarView } from "@/components/calendar/CalendarView";
import { Toaster } from "@/components/ui/toaster";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [transactions, setTransactions] = useState<any[]>([]);
  const [allTransactions, setAllTransactions] = useState<any[]>([]);
  const [goals, setGoals] = useState<any[]>([]);
  
  useEffect(() => {
    // Load transactions
    const storedTransactions = getTransactions();
    setTransactions(storedTransactions);
    
    // Transform all transactions for the calendar
    const formattedTransactions = storedTransactions.map(tx => ({
      date: tx.date,
      category: tx.category,
      amount: tx.amount,
      type: tx.type
    }));
    
    setAllTransactions(formattedTransactions);
    
    // Load saving goals
    const storedGoals = getSavingGoals();
    const formattedGoals = storedGoals.map(goal => ({
      title: goal.name,
      total: goal.targetAmount,
      current: goal.currentAmount,
      target: goal.targetAmount,
      deadline: goal.deadline
    }));
    setGoals(formattedGoals);
  }, []);

  const handleDateSelect = (newDate: Date | undefined) => {
    setSelectedDate(newDate);
  };

  return (
    <div className="min-h-screen">
      <main className="pb-24">
        <CalendarView
          goals={goals}
          selectedDate={selectedDate}
          onSelectDate={handleDateSelect}
          transactions={allTransactions}
        />
      </main>
      
      <Toaster />
    </div>
  );
}
