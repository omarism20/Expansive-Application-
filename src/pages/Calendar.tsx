
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import { Transaction, SavingGoal } from "@/types";
import { getTransactions, getSavingGoals } from "@/utils/storage";
import { CalendarView } from "@/components/calendar/CalendarView";
import { Toaster } from "@/components/ui/toaster";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [calendarTransactions, setCalendarTransactions] = useState<any[]>([]);
  const [allTransactions, setAllTransactions] = useState<any[]>([]);
  
  useEffect(() => {
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
    updateCalendarTransactions(storedTransactions);
  }, []);
  
  // Update calendar transactions when selected date changes
  useEffect(() => {
    if (selectedDate) {
      updateCalendarTransactions(transactions, selectedDate);
    }
  }, [selectedDate, transactions]);
  
  const updateCalendarTransactions = (allTransactions: Transaction[], date: Date = new Date()) => {
    const selectedDateStr = date.toISOString().split('T')[0];
    
    const filtered = allTransactions.filter(tx => tx.date === selectedDateStr)
      .map(tx => ({
        date: tx.date,
        category: tx.category,
        amount: tx.amount,
        type: tx.type
      }));
    
    setCalendarTransactions(filtered);
  };
  
  // Load saving goals for calendar
  const [goals, setGoals] = useState([]);
  
  useEffect(() => {
    const storedGoals = getSavingGoals();
    const formattedGoals = storedGoals.map(goal => ({
      title: goal.name,
      total: goal.targetAmount,
      current: goal.currentAmount,
      target: goal.targetAmount,
      deadline: goal.deadline // Add deadline to display goals on calendar
    }));
    setGoals(formattedGoals);
  }, []);

  const handleDateSelect = (newDate: Date | undefined) => {
    setSelectedDate(newDate);
  };

  return (
    <div className="min-h-screen bg-darkbg text-white">
      <Header />
      
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
